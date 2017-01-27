# Introduction

[![npm Version](https://img.shields.io/github/issues/kalinchernev/odp.svg)](https://www.npmjs.com/package/odp)
[![Build Status](https://travis-ci.org/kalinchernev/odp.svg?branch=master)](https://travis-ci.org/kalinchernev/odp)
[![Dependency Status](https://img.shields.io/gemnasium/kalinchernev/odp.svg)](https://gemnasium.com/github.com/kalinchernev/odp)
[![Documentation Status](http://inch-ci.org/github/kalinchernev/odp.svg?branch=master&style=flat)](http://inch-ci.org/github/kalinchernev/odp)

This project is a simple node.js wrapper for the [European Union Open Data Portal](http://data.europa.eu/euodp/en/data) REST API.
The wrapper does not aim to replace any of the existing services and websites, but rather encourage more integrations.
The module is a helper in building web apps requesting data from the portal.

## Installation

Install via npm.

```bash
$ npm install odp
```

or

Install via git clone

```bash
$ git clone https://github.com/kalinchernev/odp.git
$ cd odp
$ npm install
```

## Documentation

REST API service: [EU OPD developers' corner](http://data.europa.eu/euodp/en/developerscorner)

Learn more about [EU Open Data Portal](http://data.europa.eu/euodp/en/data)

## Examples

```javascript
var odp = require('odp');

// Get list of all datasets.
odp.getDatasets()
  .then(data => console.log(data))

// Get a range of the list of datasets:
odp.getDatasets({query: {limit: 100, offset: 1}})
  .then(data => console.log(data))

// Get all tags:
odp.getTags()
  .then(data => console.log(data))

// Search through tags:
odp.getTags({
  query: {
    vocabulary_id: 'some_id',
    all_fields: true
    }
  })
  .then(data => console.log(data))

// Get details about a dataset:
odp.getDataset({body: {id: 'dgt-translation-memory'}})
  .then(data => console.log(data))

// Search for a dataset:
odp.datasetSearch({body: {q: 'forest'}})
  .then(data => console.log(data))

```

## Tests

Run all tests

```bash
$ npm test
```

## Linter

Check whether modifications are acceptable:

```bash
$ npm run lint
```

## LICENSE

MIT license. See the LICENSE file for details.