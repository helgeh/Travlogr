'use strict';

angular.module('travlogrApp')
  .controller('MainCtrl', function ($scope, $http, CONFIG, Gmaps, Travels, panels, $q) {
    
    $scope.map = {
      center: {
        latitude: 38.267, 
        longitude: 13.406
      }, 
      zoom: 3, 
      bounds: {}
    };
    $scope.options = {
      scrollwheel: false
    };
    $scope.someMarkers = [];

    // var createRandomMarker = function(i, bounds, idKey) {
    //   var lat_min = bounds.southwest.latitude,
    //     lat_range = bounds.northeast.latitude - lat_min,
    //     lng_min = bounds.southwest.longitude,
    //     lng_range = bounds.northeast.longitude - lng_min;

    //   if (idKey == null) {
    //     idKey = "id";
    //   }

    //   var latitude = lat_min + (Math.random() * lat_range);
    //   var longitude = lng_min + (Math.random() * lng_range);
    //   var ret = {
    //     latitude: latitude,
    //     longitude: longitude,
    //     title: 'm' + i
    //   };
    //   ret[idKey] = i;
    //   return ret;
    // };

    $scope.$watch("map.bounds", function(nv, ov) {
      // Only need to regenerate once
      // if (!ov.southwest && nv.southwest) {
        // var markers = [];
        // for (var i = 0; i < 50; i++) {
        //   markers.push(createRandomMarker(i, $scope.map.bounds))
        // }
        // $scope.someMarkers = markers;
        // var marker = {
        //   latitude: 20.123,
        //   longitude: -9.921,
        //   title: 'm1',
        //   id: 0
        // };
        // var markers = [marker];
        // $scope.someMarkers = markers;
        // var markers = [], i = 0;
        // _.each(Travels.getTravels(), function (travel) {
        //   _.each(travel.points, function (point) {
        //     point.id = i++;
        //     markers.push(point);
        //   });
        // });
        // $scope.someMarkers = markers;
        var i = 0, curPoint, prevPoint;
        var travels = _.map(Travels.getTravels(), function (travel) {
          curPoint = travel.points[0];
          travel.lines = _.map(travel.points.slice(1), function (p) {
            prevPoint = curPoint;
            curPoint = p;
            return {
              id: i++,
              path: [prevPoint, curPoint],
              stroke: {
                color: '#6060FB',
                weight: 3
              }
            }
          });
          return travel;
        });
        $scope.travels = travels;
      // }
    }, true);

  	// Gmaps.getMap().then(function (map) {
  	// 	// map = map;
  	// 	initTravelDestinations();

   //    //open testmenu panel
   //    // panels.open("right_panel");
  	// });

  	function initTravelDestinations() {
      var travels = Travels.getTravels();
      _.each(travels, function (travel) {
        addTravel(travel);
      });
  	}

    function addTravel(travel) {
      var home, curP, prevP;
      home = travel.home;
      curP = home.point;
      addPoint({point: curP, title: home.title});
      _.each(travel.points, function (p) {
        prevP = curP;
        curP = p;
        addPoint({point: curP, prevPoint: prevP, title: travel.title});
      });
      // don't draw finishing line if there's only one destination
      if (travel.roundtrip && travel.points.length > 1) 
        Gmaps.draw([curP, home.point], travel.title);
    }

    function addPoint(opt) { // options: point, prevPoint, title
      if (!opt.prevPoint)
        Gmaps.addPoint(opt.point, {icon: 'home', title: opt.title});
      else {
        Gmaps.draw([opt.prevPoint, opt.point], opt.title);
        Gmaps.addPoint(opt.point, {title: opt.title});
      }
    }

  });

