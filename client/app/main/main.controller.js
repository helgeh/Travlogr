'use strict';

angular.module('travlogrApp')
  .controller('MainCtrl', function ($scope, $http, CONFIG, Gmaps, Travels, panels, $q) {
    
  	// var map; we don't really need a reference to the map here, let Gmaps do the work

    $scope.map = { center: { latitude: 38.267, longitude: 13.406 }, zoom: 3 };

  	Gmaps.getMap().then(function (map) {
  		// map = map;
  		// initTravelDestinations();

      //open testmenu panel
      // panels.open("right_panel");
  	});

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

