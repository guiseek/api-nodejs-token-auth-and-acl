'use strict';

var beersPolicy = require('../policies/beers.policy');

module.exports = function(api) {
	var beers = require('../controllers/beers.controller');

	api.route('/beers')
		.all(beersPolicy.isAllowed)
		.get(beers.findAll)
		.post(beers.create);

	api.route('/beers/:beerId')
		.all(beersPolicy.isAllowed)
		.get(beers.find)
		.put(beers.update)
		.delete(beers.delete);

	api.param('beerId', beers.beerByID);
};
