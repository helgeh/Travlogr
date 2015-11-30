'use strict';

angular.module('travlogrApp')
  .factory('Travels', function () {

    var allTravels = [
      {
        title: 'Test-trip',
        home: {
          title: 'Oslo',
          point: {id: 0, latitude: 59.914084875370634, longitude: 10.763668600320795}
        },
        points: [
          {id: 1, latitude: 52.370, longitude: 4.895}, 
          {id: 2, latitude: 46.441, longitude: 8.391}, 
          {id: 3, latitude: 36.533, longitude: -6.299}
        ],
        roundtrip: true
      },
      {
        title: 'Test-trip 2',
        home: {
          title: 'Oslo',
          point: {id: 4, latitude: 59.914084875370634, longitude: 10.763668600320795}
        },
        points: [
          {id: 5, latitude: 20.123, longitude: -9.921},
          {id: 6, latitude: 28.663, longitude: -10.245}
        ],
        roundtrip: false
      },
      {
        title: 'Test-trip 3 (single destination)',
        home: {
          title: 'Oslo',
          point: {id: 7, latitude: 59.914084875370634, longitude: 10.763668600320795}
        },
        points: [
          {id: 8, latitude: 3.444, longitude: -56.228}
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
