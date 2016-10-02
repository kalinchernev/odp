var should = require('chai').should()
var odpClient = require('../lib/odp')

describe('ODP module', function () {
  describe('the client', function () {
    it('has a method getDatasets', function (done) {
      odpClient.should.have.property('getDatasets')
      done()
    })

    it('has a method getTags', function (done) {
      odpClient.should.have.property('getTags')
      done()
    })

    it('has a method getDataset', function (done) {
      odpClient.should.have.property('getDataset')
      done()
    })

    it('has a method datasetSearch', function (done) {
      odpClient.should.have.property('datasetSearch')
      done()
    })
  })
})
