/**
 * @function MaptomoScreen
 * @author Copyright (c) Maptomo
 * @license MIT License
 * @since 2019
*/

console.log('MaptomoScreen standard sample');

// Information about map drawing
var params = {
  'center': [33.593007, 130.410464],
  'engine': 'leaflet',
  'layer': 'osm',
  'size': 14,
  'features': [
    [{
      'id': 1,
      'type': 'point',
      'coordinate': [130.446554, 33.590319],
      'title': 'Fukuoka Airport',
      'link': ['https://www.fukuoka-airport.jp/', '_blank'],
      'class': 'fas fa-plane',
      'color': '#d4366a',
      'selected': true,
      'custom': {
        'id': 1,
        'name': 'Fukuoka Airport'
      }
    }],
    [{
      'id': 2,
      'type': 'line',
      'coordinate': [[130.414518, 33.594096], [130.383227, 33.584847]],
      'title': 'Load',
      'class': '',
      'color': '#451b25',
      'custom': {}
    }],
    [{
      'id': 3,
      'type': 'polygon',
      'coordinate': [[[130.426241, 33.584560], [130.429964, 33.588046], [130.431794, 33.585874], [130.428629, 33.582854]]],
      'title': 'Hie-Cho',
      'color': '#008000',
      'selected': true,
      'custom': {
        'id': 3,
        'name': 'Hie-cho'
      }
    }]
  ]
};

// Authentication information
var certif = {
  'maptomo': '', // MaptomoAPI key
  'gmap': '' // Google Maps API key
};

// Constructor and draw map
var mtScreen = new MaptomoScreen(certif, params);
mtScreen.draw();

// Display selected element as JSON string
var obj = document.getElementById('btn_selected');
obj.addEventListener('click', function () {
  mtScreen.showSelectShape();
}, false);

// Move center to current location
var obj2 = document.getElementById('btn_default');
obj2.addEventListener('click', function () {
  mtScreen.moveDefaultLocation();
}, false);

// Output selected element as JSON string
var obj3 = document.getElementById('btn_export_geojson');
obj3.addEventListener('click', function () {
  var geojson = JSON.stringify(mtScreen.exportGeoJson());
  console.log(geojson);
  alert(geojson);
}, false);
