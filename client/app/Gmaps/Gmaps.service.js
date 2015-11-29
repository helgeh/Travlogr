'use strict';

angular.module('travlogrApp')
  .factory('Gmaps', function ($window, $q, CONFIG) {

    var google, maps = {}, deferred, promise;

    deferred = $q.defer();
    promise = deferred.promise;

    // GoogleMapsLoader.load(function(ggl) {
    //     google = ggl;
    //     setupIcons();
    //     var id = addMap();
    //     deferred.resolve(maps[id].map);
    // });

    function setupIcons() {
      icons = {
        home: {
            path: google.maps.SymbolPath.CIRCLE, 
            scale: 10
          }
      };
    }

    function addMap(options) {
      var config = {
        mapId       :   CONFIG.defaultMapId,
        zoom        :   3,
        center      :   new google.maps.LatLng(38.267, 13.406),
        mapTypeId   :   google.maps.MapTypeId.ROADMAP
      };
      _.extend(config, options);
      var map = new google.maps.Map(document.getElementById(config.mapId), config);
      window.map = map;
      maps[config.mapId] = {map: map};
      return config.mapId;
    }

    function getMap(mapId, options) {
      options = options || {};
      var deferred = $q.defer();
      var id = mapId || CONFIG.defaultMapId;
      var timeout = options.timeout || 2000;

      function waitForMap(timeElapsed) {
        if (maps[id]) {
          deferred.resolve(maps[id].map);
        } 
        else if (timeElapsed > timeout) {
          deferred.reject('could not find map');
        } 
        else {
          $window.setTimeout( function(){
            waitForMap(timeElapsed+100);
          }, 100);
        }
      }
      waitForMap(0);

      return deferred.promise;
    }


    /////    MARKERS

    var markers = [];
    var icons = {};

    function addPoint(latLng, options) {
      var markerId = createMarkerId(latLng); // an that will be used to cache this marker in markers object.
      if (markers[markerId])
        return markerId;
      promise.then(function (map) {
        var config = {
          position: latLng,
          map: map,
          id: 'marker_' + markerId
        };
        if (options.icon) {
          options.icon = icons[options.icon];
        }
        _.merge(config, options);
        var marker = new google.maps.Marker(config);
        // loadPlaceDetails(latLng, marker);
        markers[markerId] = { // cache marker in markers object
          marker: marker
        };
        // bindMarkerEvents(marker); // bind right click event to marker
        // store();
      });
      return markerId;
    }

    function createMarkerId (latLng) {
      return latLng.lat + "_" + latLng.lng;
    }


    /////    POLYLINES

    function draw(path) {
      promise.then(function (map) {
        var flightPath = new google.maps.Polyline({
          path: path,
          geodesic: true,
          strokeColor: '#FF0000',
          strokeOpacity: 1.0,
          strokeWeight: 2
        });

        flightPath.setMap(map);
      });
    }


    return {
      // addMap: addMap,
      getMap: getMap,
      addPoint: addPoint,
      draw: draw
    };

  });
