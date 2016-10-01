'use strict';

// Module dependencies.
var request = require('request');
var querystring = require('querystring');
var userAgent = require('random-useragent');

// Root for all endpoints.
var _baseUrl = 'http://data.europa.eu/euodp/data/api/action';
// Infrastructure prevents requests from original user agent of requestee.
var headers = {
  'User-Agent': userAgent.getRandom(),
  'Accept': 'application/json'
};

/**
 * Calls the service and return the data in a promise.
 * @function
 * @name _fetchData
 * @private
 * @param {string} endpoint - Resource endpoint, without any slashes.
 * @param {object} options - The query parameters for the request.
 * @returns {Promise} The response in a promise.
 */
function _fetchData(endpoint, options) {
  return new Promise((resolve, reject) => {
    var query = querystring.stringify(options);
    request.get({
      url: _baseUrl + `/${endpoint}?${query}`,
      headers: headers,
    }, (error, response, body) => {
      resolve(body);
    });
  });  
}

/**
 * Get a list of the datasets in JSON.
 * @param {object} options - The query parameters for the request.
 * @param {number} options.limit - Limit the number of items returned.
 * @param {number} options.offset - Acts like pagination when limited results.
 */
module.exports.getDatasets = (options) => {
  return _fetchData('package_list', options);
};

/**
 * Return a list of the site's tags.
 * @param {object} options - The query parameters for the request.
 * @param {string} options.query -  A tag name query to search for.
 *  If given only tags whose names contain this string will be returned.
 * @param {string} options.vocabulary_id - The id or name of a vocabulary.
 *  If given only tags that belong to this vocabulary will be returned.
 * @param {boolean} options.all_fields - Whether or not to include all fields.
 */
module.exports.getTags = (options) => {
  return _fetchData('tag_list', options);
};


module.exports.getDataset = (options) => {
  return _fetchData('package_show', options);
};

module.exports.datasetSearch = (options) => {
  return _fetchData('package_search', options);
};
