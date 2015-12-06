'use strict';

angular.module('travlogrApp')
  .controller('MainCtrl', function ($scope, $http, CONFIG, Gmaps, Travels, panels, Modal, $q) {
    
  	// var map; we don't really need a reference to the map here, let Gmaps do the work

    var home, colors;

    $scope.travel = {title: ''};

    $scope.addNewTrip = Modal.input.getName(addNewTrip);

    function addNewTrip(name) {
      $scope.travel.title = name;
    }

    // var askForTitle = Modal.input.title(function() {
    //   console.log(arguments);
    // });
    // askForTitle($scope.travel.title);;

  	Gmaps.getMap().then(function (map) {
  		// map = map;
  		initTravelDestinations();

      //open testmenu panel
      // panels.open("right_panel");
  	});

    Gmaps.listenFor('click', function (event) {
      if (home)
        addPoint({point: event.latLng, prevPoint: home.point});
    });

    Gmaps.onSearch($scope, function (event, places) {
      console.log(places[0]);
      addPoint({point: places[0].geometry.location});
    });

  	function initTravelDestinations() {
      var travels = Travels.getTravels();
      _.each(travels, function (travel) {
        addTravel(travel);
      });
  	}

    function addTravel(travel) {
      var curP, prevP;
      home = travel.home;
      curP = home.point;
      addPoint({point: curP, title: home.title, home: true});
      _.each(travel.points, function (p) {
        prevP = curP;
        curP = p;
        addPoint({point: curP, prevPoint: prevP, title: travel.title, color: getTravelColor(travel)});
      });
      // don't draw finishing line if there's only one destination
      if (travel.roundtrip && travel.points.length > 1) 
        Gmaps.draw([curP, home.point], travel.title);
    }

    function addPoint(opt) { // options: point, prevPoint, title
      if (opt.home)
        Gmaps.addPoint(opt.point, {icon: 'home', title: opt.title});
      else {
        Gmaps.draw([opt.prevPoint, opt.point], {strokeColor: opt.color});
        Gmaps.addPoint(opt.point, {title: opt.title});
      }
    }

    function getTravelColor(travel) {
      if (!colors)
        setupTravelColors();
      return colors[travel.startTime];
    }

    function setupTravelColors() {
      var num = 0;
      var startTimes = _.pluck(_.sortBy(Travels.getTravels(), 'startTime'), 'startTime');
      var first = startTimes[0], last = startTimes[startTimes.length - 1];
      colors = {};
      _.each(startTimes, function (time) {
        num = Math.floor((time-first) * 100 / (last-first));
        colors[time] = GreenYellowRed(num);
      });
    }

    function GreenYellowRed(number) {
      var r, g, b;
      number--; // working with 0-99 will be easier

      // if (number < 50) {
      //   // green to yellow
      //   r = Math.floor(255 * (number / 50));
      //   g = 255;

      // } else {
      //   // yellow to red
      //   r = 255;
      //   g = Math.floor(255 * ((50-number%50) / 50));
      // }
      // b = 0;

      r = 255;
      g = Math.floor(255 * number / 100);
      b = 0;

      return "rgb(" + r + "," + g + "," + b + ")";
    }

  });

