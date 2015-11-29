'use strict';

angular.module('travlogrApp')
  .factory('Travels', function () {

    var allTravels = [
      {
        title: 'Test-trip',
        home: {
          title: 'Oslo',
          point: {lat: 59.914084875370634, lng: 10.763668600320795}
        },
        points: [
          {lat: 52.370, lng: 4.895}, 
          {lat: 46.441, lng: 8.391}, 
          {lat: 36.533, lng: -6.299}
        ],
        roundtrip: true
      },
      {
        title: 'Test-trip 2',
        home: {
          title: 'Oslo',
          point: {lat: 59.914084875370634, lng: 10.763668600320795}
        },
        points: [
          {lat: 20.123, lng: -9.921},
          {lat: 28.663, lng: -10.245}
        ],
        roundtrip: false
      },
      {
        title: 'Test-trip 3 (single destination)',
        home: {
          title: 'Oslo',
          point: {lat: 59.914084875370634, lng: 10.763668600320795}
        },
        points: [
          {lat: 3.444, lng: -56.228}
        ]
      }
    ];

    return {
      getTravels: function () {
        console.log("getting travels...");
        return allTravels;
      }
    };
  });
