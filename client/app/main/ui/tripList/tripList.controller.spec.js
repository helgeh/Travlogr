'use strict';

describe('Controller: TripListCtrl', function () {

  // load the controller's module
  beforeEach(module('travlogrApp'));

  var TripListCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    TripListCtrl = $controller('TripListCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
