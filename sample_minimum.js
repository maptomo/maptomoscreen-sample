/**
 * @function MaptomoScreen
 * @author Copyright (c) Maptomo
 * @license MIT License
 * @since 2019
*/

console.log('MaptomoScreen minimum sample');

// Authentication information
var key = {
  'maptomo': '', // MaptomoAPI key
  'gmap': '' // Google Cloud Platform API Key
};

// Constructor and draw map
var mtScreen = new MaptomoScreen(key);
mtScreen.draw();
