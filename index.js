var request = require('request');
var polyline = require('polyline');
var spherical = require('spherical');
var url = require('url');
var _ = require('underscore');

var turfpoint = require('turf-point');
var turfpoly = require('turf-polygon');
var planepoint = require('turf-planepoint');

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
    Striker.surface(Striker.encode(geojson), function(err, surface) {
      if (err) return callback(err);
      var data = Striker.define(Striker.best(surface));
      callback(null, data);
    });
  }

  Striker.encode = function(geojson) {
    var coords = geojson.geometry.type === 'MultiLineString' ?
      _(geojson.geometry.coordinates).flatten(true) :
      geojson.geometry.coordinates;

    var points = coords.map(function(point) { return [ point[1], point[0] ]; });
    return polyline.encode(points);
  };

  Striker.surface = function(polyline, callback) {
    uri.query.encoded_polyline = polyline;

    request({ url: url.format(uri), json: true }, function(err, res, json) {
      if (err) return callback(err);
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

  Striker.delta = function(plane, surface) {
    return surface.reduce(function(memo, point) {
      memo += Striker.planepoint(plane, point);
      return memo;
    }, 0) / surface.length;
  };

  Striker.best = function(surface) {
    var d = Infinity;
    return Striker.planes(surface).reduce(function(memo, plane) {
      var delta = Striker.delta(plane, surface);
      if (delta < d) {
        d = delta;
        memo = plane;
      }
      return memo;
    });
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
