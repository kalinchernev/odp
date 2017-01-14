'use strict'

// console.log is allowed in this file.
/* eslint no-console: 0 */

var odp = require('../lib/odp')

// Get list of all datasets.
odp.getDatasets().then((data) => console.log(data))

// Get a range of the list of datasets:
odp.getDatasets({query: {limit: 100, offset: 1}})
  .then((data) => console.log(data))

// Get all tags:
odp.getTags().then(data => console.log(data))

// Search through tags:
odp.getTags({
  query: {
    vocabulary_id: 'some_id',
    all_fields: true
    }
  })
  .then((data) => console.log(data))

// Get details about a dataset:
odp.getDataset({body: {id: 'dgt-translation-memory'}})
  .then((data) => console.log(data))

// Search for a dataset:
odp.datasetSearch({body: {q: 'forest'}})
  .then((data) => console.log(data))
