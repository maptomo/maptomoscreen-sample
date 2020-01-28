# MaptomoScreen SAMPLE

## Local minimum
Draw a map based on default config data.
- [index_local_minimum.html](index_local_minimum.html)
- [sample_minimum.js](sample_minimum.js)

## Local standard
Draw a map based on sample params, point, line, polygon.
- [index_local_standard.html](index_local_standard.html)
- [sample_standard.js](sample_standard.js)

## kintone JavaScript customize
Customize kintone using jQuery, MaptomoAPI (CDN).
- [kintone_custom_sample.js](kintone_custom_sample.js)

1. kintone app [field type](https://developer.kintone.io/hc/en-us/articles/212494818)

|Field Code|Field Type|Value/Options|
|---|---|---|
|Title|SINGLE_LINE_TEXT||
|Address|SINGLE_LINE_TEXT||
|Type|DROP_DOWN|['point','line','polygon']|
|LatLng|MULTI_LINE_TEXT||
|Class|SINGLE_LINE_TEXT||
|Color|SINGLE_LINE_TEXT||
|Selected|CHECK_BOX|['ON']|

2. Customize View

kintone Customize view HTML
*Get Customize viewId >>3.

~~~HTML
<title>MaptomoScreen Sample</title>
<button id="btn_selected">Show selected data</button> 
<button id="btn_default">Default location</button>
<button id="btn_export_geojson">Save Layers</button>
<div id="mt-map"></div>
~~~

3. kintone JavaScript customize
PC/Mobile

- jQuery 3.4.1
- CDN
- [kintone_custom_sample.js](kintone_custom_sample.js)

~~~JavaScript
    if (event.viewId === { Customize viewId }}) {
~~~

## Key
- MaptomoAPI Key
- Google Maps Platform

Default
~~~JavaScript
var certif = {
  'maptomo': '', // MaptomoAPI key
  'gmap': '' // Google Maps API key
};
~~~

## CDN
Set the specified CDN JavaScript file in the script tag of the HTML file.

Default
~~~HTML
<script src="https://{CDN}" crossorigin="anonymous"></script>
~~~

## Inquiry
MaptomoAPI Key and CDN can be obtained by purchasing MaptomoAPI Key.
[Maptomo](https://maptomo.com/)
