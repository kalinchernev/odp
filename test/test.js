var should = require('chai').should();
var odpClient = require("../lib/odp");

describe('ODP module', function () {
  describe('the client', function () {
    it('has a method getDatasets', function (done) {
      odpClient.should.have.property('getDatasets');
      done();
    });
    
    
  });
});

