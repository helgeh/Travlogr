'use strict';

describe('Service: travels', function () {

  // load the service's module
  beforeEach(module('travlogrApp'));

  // instantiate service
  var travels;
  beforeEach(inject(function (_travels_) {
    travels = _travels_;
  }));

  it('should do something', function () {
    expect(!!travels).toBe(true);
  });

});
