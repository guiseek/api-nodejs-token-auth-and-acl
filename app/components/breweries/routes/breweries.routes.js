'use strict';

var breweriesPolicy = require('../policies/breweries.policy');

module.exports = function(api) {
	var breweries = require('../controllers/breweries.controller');

	api.route('/breweries')
		.all(breweriesPolicy.isAllowed)
		.get(breweries.findAll)
		.post(breweries.create);

	api.route('/breweries/:breweryId')
		.all(breweriesPolicy.isAllowed)
		.get(breweries.find)
		.put(breweries.update)
		.delete(breweries.delete);

	api.param('breweryId', breweries.breweryByID);
};
