'use strict';

describe('Service: Gmaps', function () {

  // load the service's module
  beforeEach(module('travlogrApp'));

  // instantiate service
  var Gmaps;
  beforeEach(inject(function (_Gmaps_) {
    Gmaps = _Gmaps_;
  }));

  it('should do something', function () {
    expect(!!Gmaps).toBe(true);
  });

});
