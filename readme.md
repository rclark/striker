# striker

Given a GeoJSON line, calculate the strike and dip of a best-fit plane for that line.

## How it works

The script finds elevation values for each point along the line using the [Mapbox Surface API](https://www.mapbox.com/developers/api/surface/). Then, it generates a list of *all* the planes that could be defined by any group of three points in the line. Using each potential plane, [turf-planepoint](https://github.com/turfjs/turf-planepoint) compares the true elevation of each point in the line to a projected value on that plane. The plane with the closest match to real elevation values is used and a strike and dip are calculated.

## Configuration

In order to use the [Mapbox Surface API](https://www.mapbox.com/developers/api/surface/) you must have a [Mapbox access token](https://www.mapbox.com/developers/api/#access-tokens) with sufficient permissions to access [Mapbox elevation data](https://www.mapbox.com/data-platform/#mapbox-terrain). You can set your token using an environment variable (`MapboxAccessToken`) or with a flag when calling the command directly.

## Installation and usage

Provides a shell script you can use. Pipe a `LineString` or `MultiLineString` into `stdin` or as a parameter
```sh
$ npm install -g striker

$ cat my-line.geojson | striker

$ cat my-line.geojson | striker --token pk.xxx

$ striker '{"type":"Feature","geometry":{"type":"LineString","coordinates":[[-112.32005596160889,36.17280264906953],[-112.31984
13848877,36.17675185235112],[-112.32409000396729,36.176717211082384]]}}'
```

Or, use it in JavaScript
```javascript
var striker = require('striker')({
  token: mapboxAccessToken
});

var geojson = {
  type: 'Feature',
  geometry: {
    type: 'LineString',
    coordinates: [
      [-112.32005596160889,36.17280264906953],
      [-112.3198413848877,36.17675185235112],
      [-112.32409000396729,36.176717211082384]
    ]
  }
};

striker(geojson, function(err, plane) {
  console.log('Strike: %s', plane.strike);
  console.log('Dip: %s', plane.dip);
});
```
