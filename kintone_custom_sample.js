/**
 * @function MaptomoScreen for kintone
 * @author Copyright (c) Maptomo
 * @license MIT License
 * @since 2019
*/

jQuery.noConflict();
(function ($) {
  'use strict';

  var _appId = kintone.app.getId();
  var _url = window.location.origin + '/k/';

  var ev = [
    'app.record.index.show',
    'mobile.app.record.index.show'
  ];
  kintone.events.on(ev, function (event) {
    if (event.viewType !== 'custom') {
      return event;
    }

    if (event.viewId === { Customize viewId }}) {

    setMatomotoFormatRecords(event, params);

    var mtScreen = new MaptomoScreen(certif, params);
    mtScreen.draw();

    var obj = document.getElementById('btn_selected');
    obj.addEventListener('click', function () {
      alert(JSON.stringify(mtScreen.getSelectShape()));
    }, false);

    var obj2 = document.getElementById('btn_default');
    obj2.addEventListener('click', function () {
      mtScreen.moveDefaultLocation();
    }, false);

    var obj3 = document.getElementById('btn_export_geojson');
    obj3.addEventListener('click', function () {
      var json = mtScreen.exportGeoJson();
      alert(JSON.stringify(json));
      alert(JSON.stringify(postdata(json)));

    }, false);
  }
});

function createJsonRecord(json) {
  var data = {
    'Type': { 'value': json.type },
    'Title': { 'value': json.title },
    'LatLng': { 'value': JSON.stringify(json.coordinate) },
    'Class': { 'value': json.class },
    'Color': { 'value': json.color }
  };

  data.Selected = {
    'value': json.selected ? ['ON'] : []
  };
  if (json.id > 0) {
    data = {
      'id': json.id,
      'record': data
    };
  }
  return data;
}

function createArrayRecords(arrJson, arrBulk) {

  var appendBulk = function (method, arrData) {
    if (arrData.length === 0) {
      return;
    }
    return {
      'method': method,
      'api': '/k/v1/records.json',
      'payload': {
        'app': _appId,
        'records': arrData
      }
    };
  };

  var iBulk = 0;
  var arrPost = [], arrPut = [];
  arrJson.forEach(function (rec, index) {

    if (rec[0].id < 0) {
      arrPost.push(createJsonRecord(rec[0]));
    }
    if (rec[0].id > 0) {
      arrPut.push(createJsonRecord(rec[0]));
    }

    if (arrPost.length > 100) {
      arrBulk.push(appendBulk('POST', arrPost));
      iBulk++;
      arrPost = [];
    }

    if (arrPut.length > 100) {
      arrBulk.push(appendBulk('PUT', arrPut));
      iBulk++;
      arrPut = [];
    }

    if (index === arrJson.length - 1) {
      if (arrPost.length !== 0) {
        arrBulk.push(appendBulk('POST', arrPost));
      }
      if (arrPut.length !== 0) {
        arrBulk.push(appendBulk('PUT', arrPut));
      }
    }
  });
}

function postdata(arrJson) {
  if (!arrJson) {
    return;
  }

  var arrRecords = [];
  createArrayRecords(arrJson, arrRecords);

  var limit = 20;
  var len = Math.ceil(arrRecords.length / limit);

  for (var i = 0; i < len; i++) {

    var first = i * 20;
    var last = (i > len) ? limit : (arrRecords.length);

    var body = {
      'requests': arrRecords.slice(first, last)
    };
  }

  return new kintone.Promise(function (resolve, reject) {
    kintone.api(kintone.api.url('/k/v1/bulkRequest', true), 'POST', body, function (resp) {
      //success
      console.log(resp);
      resolve(resp);
    }, function (error) {
      //error
      console.log(error);
      reject();
    });
  });
}

function setMatomotoFormatRecords(ev, params) {

  var records = [];
  if (ev.record) {
    records.push(ev.record);
  }
  if (ev.records) {
    records = ev.records;
  }

  params.features = [];
  records.forEach(function (record) {

    if (!record['LatLng'].value) {
      return;
    }

    var elLink = document.createElement('a');
    elLink.href = _url + '/show#record=' + _appId + record.$id.value;
    elLink.target = '_blank';
    var strTitle = document.createTextNode(record.Title.value);
    elLink.appendChild(strTitle);

    var geoData = {
      'id': record.$id.value,
      'type': record.Type.value,
      'title': record.Title.value,
      'url': elLink.outerHTML,
      'coordinate': JSON.parse(record.LatLng.value),
      'class': record.Class.value,
      'color': record.Color.value,
      'selected': (record.Selected.value.indexOf('ON') > -1) ? true : false,
      'custom': {
        id: record.$id.value,
        name: record.Title.value,
        address: record.Address.value
      }
    };

    Array.prototype.push.apply(params.features, [[geoData]]);

  });
}

// Authentication information
var certif = {
  'maptomo': '', // MaptomoAPI key
  'gmap': '' // Google Maps API key
};

// Information about map drawing
var params = {
  'container': {
    'id': 'mt-map',
    'height': '400px',
  },
  'center': [130.410464, 33.593007],
  //    'engine': 'gmap',
  'engine': 'gmap',
  'layer': 'osm_monochrome',
  'size': 14,
  'lang': 'ja',
  'map_option': {
    'mode': 'show',
    'sidebar': true,
    'zoom': true,
    'present': true,
    'draw': true,
    'layer': false,
    'scroll_wheel_zoom': false,
    'double_click_zoom': true,
    'dragging': true
  }
};

}) (jQuery);
