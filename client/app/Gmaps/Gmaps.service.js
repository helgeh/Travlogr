'use strict';

angular.module('travlogrApp')
  .factory('Gmaps', function ($rootScope, $window, $q, CONFIG) {

    var google, maps = {}, deferred, promise;

    deferred = $q.defer();
    promise = deferred.promise;

    GoogleMapsLoader.load(function(ggl) {
        google = ggl;
        setupIcons();
        var id = addMap();
        deferred.resolve(maps[id].map);
    });

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


      var input = document.getElementById('pac-input');
      var searchBox = new google.maps.places.SearchBox(input);
      // map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

      // Bias the SearchBox results towards current map's viewport.
      map.addListener('bounds_changed', function() {
        searchBox.setBounds(map.getBounds());
      });

      searchBox.addListener('places_changed', function(e) {
        console.log(e);
        var places = searchBox.getPlaces();
        if (places.length === 0) 
          return;
        $rootScope.$emit('search:places', places);
        return;

        console.log(places);
        // For each place, get the icon, name and location.
        var bounds = new google.maps.LatLngBounds();
        places.forEach(function(place) {
          var icon = {
            url: place.icon,
            size: new google.maps.Size(71, 71),
            origin: new google.maps.Point(0, 0),
            anchor: new google.maps.Point(17, 34),
            scaledSize: new google.maps.Size(25, 25)
          };
          // Create a marker for each place.
          if (!getMarkerFromPoint(place.geometry.location))
            addMarker(place.geometry.location);
          if (place.geometry.viewport) {
            // Only geocodes have viewport.
            bounds.union(place.geometry.viewport);
            map.fitBounds(bounds);
          } 
    //       else {
    //         bounds.extend(place.geometry.location);
    //       }
    //       map.fitBounds(bounds);
        });
      });
      
      // google.maps.event.addListener(map, 'click', function(e) {
      //   console.log(e.latLng.lat());
      //   addPoint(e.latLng);
      // });
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

    function listenFor(event, callback) {
      promise.then(function (map) {
        google.maps.event.addListener(map, event, callback);
      });
    }

    function onSearch(scope, callback) {
      var handler = $rootScope.$on('search:places', callback);
      scope.$on('$destroy', handler);
    }


    /////    MARKERS

    var markers = [];
    var icons = {};

    function addPoint(latLng, options) {
      options = options || {};
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
      if (typeof latLng.lat === 'function')
        return latLng.lat() + "_" + latLng.lng();
      return latLng.lat + "_" + latLng.lng;
    }


    /////    POLYLINES

    function draw(path, options) {
      var config = {
        path: path,
        geodesic: true,
        strokeColor: '#FF0000',
        strokeOpacity: 1.0,
        strokeWeight: 2
      };
      options = options || {};
      _.merge(config, options);
      promise.then(function (map) {
        var flightPath = new google.maps.Polyline(config);
        flightPath.setMap(map);
      });
    }


    return {
      // addMap: addMap,
      getMap: getMap,
      listenFor: listenFor,
      onSearch: onSearch,
      addPoint: addPoint,
      draw: draw
    };

  });
