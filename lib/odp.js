'use strict'

// Module dependencies.
var request = require('request')
var querystring = require('querystring')
var userAgent = require('random-useragent')

// Root for all endpoints.
var _baseUrl = 'http://data.europa.eu/euodp/data/api/action'
// Infrastructure prevents requests from original user agent of requestee.
var headers = {
  'User-Agent': userAgent.getRandom(),
  'Accept': 'application/json',
  'Content-Type': 'application/x-www-form-urlencoded'
}

/**
 * Calls the service and return the data in a promise, but with POST.
 * @function
 * @private
 * @name _sendRequest
 * @param {object} options - The request set of options.
 * @param {string} options.endpoint - Resource endpoint, without any slashes.
 * @param {object} options.query - The query parameters for the request.
 * @param {object} options.body - The body if POST, PUT
 * @param {string} options.method - The method to be used.
 * @returns {Promise} The response in a promise.
 */
function _sendRequest (options) {
  return new Promise((resolve, reject) => {
    var query = querystring.stringify(options.query)
    var bodyData = JSON.stringify(options.body)

    request({
      url: _baseUrl + `/${options.endpoint}?${query}`,
      headers: headers,
      method: options.method,
      body: bodyData
    }, (error, response, body) => {
      if (error) {
        reject(error)
      }
      resolve(body)
    })
  })
}

/**
 * Get a list of the datasets in JSON.
 * @param {object} options - The request set of options.
 * @param {number} options.query.limit - Limit the number of items returned.
 * @param {number} options.query.offset - Acts like pagination when limited results.
 */
module.exports.getDatasets = (options) => {
  return _sendRequest({
    method: 'GET',
    endpoint: 'package_list',
    query: (options !== undefined ? options.query : '')
  })
}

/**
 * Return a list of the site's tags.
 * @param {object} options - The request set of options.
 * @param {object} options.query - The query parameters.
 * @param {string} options.query.vocabulary_id - The id or name of a vocabulary.
 *  If given only tags that belong to this vocabulary will be returned.
 * @param {boolean} options.query.all_fields - Whether to include all fields.
 */
module.exports.getTags = (options) => {
  return _sendRequest({
    method: 'GET',
    endpoint: 'tag_list',
    query: (options !== undefined ? options.query : '')
  })
}

/**
 * Return a list of the site's tags.
 * @param {object} options - The request set of options.
 * @param {object} options.query - The query parameters.
 * @param {string} options.body.id - The id of the data set.
 *  For example: {"id": "dgt-translation-memory"}
 */
module.exports.getDataset = (options) => {
  return _sendRequest({
    method: 'POST',
    endpoint: 'package_show',
    query: (options !== undefined ? options.query : ''),
    body: (options !== undefined ? options.body : {})
  })
}

/**
 * Searches for packages satisfying a given search criteria.
 * This action accepts solr search query parameters.
 * @see http://wiki.apache.org/solr/CommonQueryParameters
 * @param {object} options - The request set of options.
 * @param {object} options.query -  The query parameters.
 * @param {object} options.body - The body parameter.
 *  This accepts the solr tags to filter results.
 */
module.exports.datasetSearch = (options) => {
  return _sendRequest({
    method: 'POST',
    endpoint: 'package_search',
    query: (options !== undefined ? options.query : ''),
    body: (options !== undefined ? options.body : {})
  })
}
