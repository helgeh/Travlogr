'use strict';


/*globals GoogleMapsLoader */


angular.module('travlogrApp', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ngRoute',
  'ui.bootstrap',
  'angular.panels',
  'uiGmapgoogle-maps'
])
  .config(function ($routeProvider, $locationProvider, panelsProvider) {
    $routeProvider
      .otherwise({
        redirectTo: '/'
      });

    $locationProvider.html5Mode(true);
  })

  .config(function(uiGmapGoogleMapApiProvider) {
    uiGmapGoogleMapApiProvider.configure({
        //    key: 'your api key',
        v: '3.20', //defaults to latest 3.X anyhow
        libraries: 'weather,geometry,visualization'
    });
  })

  .constant('CONFIG', {
    'defaultMapId': 'map_canvas'
  });
