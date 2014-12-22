var tape = require('tape');
var fixtures = require('./fixtures');
var striker = require('..')();
var _ = require('underscore');

function test(name, callback) {
  tape(name, function(t) {
    t.approx = function(found, expected, message) {
      var precision = 6;
      found = Math.floor(found * Math.pow(10, precision)) / Math.pow(10, precision);
      expected = Math.floor(expected * Math.pow(10, precision)) / Math.pow(10, precision);
      t.equal(found, expected, message);
    };

    callback(t);
  });
}

test('encode', function(t) {
  t.deepEqual(
    striker.encode(fixtures.sloped),
    [ fixtures.sloped.properties.encoded ],
    'expected encoding'
  );
  t.deepEqual(
    striker.encode(fixtures.horizontal),
    [ fixtures.horizontal.properties.encoded ],
    'expected encoding'
  );
  t.deepEqual(
    striker.encode(fixtures.multi),
    [ fixtures.multi.properties.encoded ],
    'expected encoding'
  );

  var geojson = {
    type: 'Feature',
    geometry: {
      type: 'LineString',
      coordinates: _.range(725).map(function(i) {
        return [ (i % 360) - 180 , (i % 180) - 90 ];
      })
    }
  };

  t.deepEqual(
    striker.encode(geojson),
    [
      '~bidP~fsia@_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE~|oca@_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE',
      '_kbvD_ol{U_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE~|oca@~ddncA_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE~|oca@_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE',
      '~jbvD_wemJ_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE~|oca@~ddncA_ibE_ibE_ibE_ibE_ibE_ibE_ibE_ibE'
    ],
    'expected encoding'
  );
  t.end();
});

test('surface', function(t) {
  var sloped = fixtures.sloped.properties.encoded;
  striker.surface(sloped, function(err, res) {
    t.ifError(err, 'completed request');
    t.deepEqual(res, fixtures.sloped.properties.surface, 'expected surface');
    t.end();
  });
});

test('planes', function(t) {
  t.deepEqual(
    fixtures.simple.properties.planes,
    striker.planes(fixtures.simple.properties.surface),
    'expected planes'
  );
  t.deepEqual(
    fixtures.sloped.properties.planes,
    striker.planes(fixtures.sloped.properties.surface),
    'expected planes'
  );
  t.end();
});

test('planepoint', function(t) {
  var plane = fixtures.simple.properties.planes[0];
  var point = fixtures.simple.properties.surface[0];
  t.approx(striker.planepoint(plane, point), 0, 'expected elevation');
  t.end();
});

test('best', function(t) {
  var found = striker.best(fixtures.sloped.properties.surface);
  t.deepEqual(found, fixtures.sloped.properties.best, 'expected best surface');
  t.end();
});

test('define', function(t) {
  var found = striker.define(fixtures.simple.properties.planes[0]);
  t.approx(found.dip, fixtures.simple.properties.plane.dip, 'expected dip');
  t.approx(found.strike, fixtures.simple.properties.plane.strike, 'expected strike');
  t.end();
});

test('horizontal', function(t) {
  striker(fixtures.horizontal, function(err, plane) {
    t.approx(plane.dip, fixtures.horizontal.properties.plane.dip, 'expected dip');
    t.approx(plane.strike, fixtures.horizontal.properties.plane.strike, 'expected strike');
    t.end();
  });
});

test('sloped', function(t) {
  striker(fixtures.sloped, function(err, plane) {
    t.approx(plane.dip, fixtures.sloped.properties.plane.dip, 'expected dip');
    t.approx(plane.strike, fixtures.sloped.properties.plane.strike, 'expected strike');
    t.end();
  });
});
