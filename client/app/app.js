'use strict';


/*globals GoogleMapsLoader */


angular.module('travlogrApp', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ngRoute',
  'ui.bootstrap',
  'angular.panels'
])
  .config(function ($routeProvider, $locationProvider, panelsProvider) {
    $routeProvider
      .otherwise({
        redirectTo: '/'
      });

    $locationProvider.html5Mode(true);
  })

  .constant('CONFIG', {
    'defaultMapId': 'map_canvas'
  });
