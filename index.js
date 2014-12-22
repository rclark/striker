var url = require('url');
var util = require('util');

var request = require('request');
var polyline = require('polyline');
var spherical = require('spherical');
var _ = require('underscore');
var turfpoint = require('turf-point');
var turfpoly = require('turf-polygon');
var planepoint = require('turf-planepoint');
var queue = require('queue-async');

module.exports = function(config) {
  config = config || {};

  var field = config.field || 'ele';

  var uri = {
    protocol: 'https:',
    hostname: config.api || 'api.tiles.mapbox.com',
    pathname: config.surface || '/v4/surface/' + ( config.tilejson || 'mapbox.mapbox-terrain-v1.json' ),
    query: {
      access_token: config.token || process.env.MapboxAccessToken,
      layer: config.layer || 'contour',
      fields: field
    }
  };

  function Striker(geojson, callback) {
    var q = queue();
    Striker.encode(geojson).forEach(function(line) {
      q.defer(Striker.surface, line);
    });
    q.awaitAll(function(err, surfaces) {
      if (err) return callback(err);
      var surface = _(surfaces).flatten(true);
      var data = Striker.define(Striker.best(surface));
      callback(null, data);
    });
  }

  Striker.encode = function(geojson) {
    var coords = geojson.geometry.type === 'MultiLineString' ?
      _(geojson.geometry.coordinates).flatten(true) :
      geojson.geometry.coordinates;

    var points = coords.map(function(point) { return [ point[1], point[0] ]; });

    var results = [];
    while (points.length) {
      results.push(polyline.encode(points.slice(0,300)));
      points = points.slice(300);
    }
    return results;
  };

  Striker.surface = function(polyline, callback) {
    uri.query.encoded_polyline = polyline;

    request({ url: url.format(uri), json: true }, function(err, res, json) {
      if (err) return callback(err);
      if (res.statusCode !== 200) {
        err = new Error(JSON.stringify(res.body));
        err.statusCode = res.statusCode;
        return callback(err);
      }

      var result = json.results.map(function(data) {
        return [ data.latlng.lng, data.latlng.lat, data[field] ];
      });
      callback(null, result);
    });
  };

  Striker.planes = function(surface) {
    var planes = [];
    surface.forEach(function(a, i) {
      surface.slice(i + 1).forEach(function(b, j, surface) {
        surface.slice(j + 1).forEach(function(c, k, surface) {
          planes.push([ a, b, c ]);
        });
      });
    });
    return planes;
  };

  Striker.planepoint = function(plane, point) {
    plane = turfpoly(
      [ plane ],
      { a: plane[0][2], b: plane[1][2], c: plane[2][2] }
    );

    var found = planepoint(turfpoint(point), plane);
    return Math.abs(found - point[2]);
  };

  Striker.best = function(surface) {
    var planes = Striker.planes(surface);

    var d = Infinity;
    var start = Date.now();
    var memo;

    if (config.verbose) {
      console.log(
        'Finding the best of %s planes for %s points',
        planes.length,
        surface.length
      );
    }

    for (var count = 0; count < planes.length; count++) {
      var plane = planes[count];
      var delta = 0;

      if (config.verbose) {
        util.print(util.format(
          '\r\033[KExamining planes... %s @ %s planes/s - Avg err: %sm',
          count + 1,
          Math.floor(count / (Date.now() - start) * 1000),
          Math.ceil(d / surface.length)
        ));
      }

      for (var i = 0; i < surface.length; i++) {
        delta += Striker.planepoint(plane, surface[i]);
        if (delta > d) break;
      }

      if (delta > d) continue;
      d = delta;
      memo = plane;

      // if (!config.complete && Math.ceil(d / surface.length) < 12) break;
    }

    return memo;
  };

  Striker.define = function(plane) {
    var a = plane[0];

    dist_ab = spherical.distance(a, plane[1]);
    bear_ab = spherical.heading(a, plane[1]);

    var b = [
      dist_ab * Math.cos(bear_ab * Math.PI / 180),
      dist_ab * Math.sin(bear_ab * Math.PI / 180),
      plane[1][2] - a[2]
    ];

    dist_ac = spherical.distance(plane[0], plane[2]);
    bear_ac = spherical.heading(plane[0], plane[2]);
    var c = [
      dist_ac * Math.cos(bear_ac * Math.PI / 180),
      dist_ac * Math.sin(bear_ac * Math.PI / 180),
      plane[2][2] - a[2]
    ];

    var pole = [
      ( b[1] * c[2] ) - ( b[2] * c[1] ),
      ( b[2] * c[0] ) - ( b[0] * c[2] ),
      ( b[0] * c[1] ) - ( b[1] * c[0] )
    ];

    var dip = Math.asin(
      Math.sqrt(Math.pow(pole[0], 2) + Math.pow(pole[1], 2)) /
      Math.sqrt(Math.pow(pole[0], 2) + Math.pow(pole[1], 2) + Math.pow(pole[2], 2))
    );

    var x = pole[2] < 0 ? pole[1] : -pole[1];
    var y = pole[2] > 0 ? pole[0] : -pole[0];

    var strike = Math.acos(y / (Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2))));
    if (x >= 0) strike = 2 * Math.PI - strike;

    return {
      dip: dip * 180 / Math.PI,
      strike: strike * 180 / Math.PI
    };
  };

  return Striker;
};
