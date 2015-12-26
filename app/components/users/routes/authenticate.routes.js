'use strict';

module.exports = function(api) {
	var authenticate = require('../controllers/authenticate.controller');
	api.route('/signin').post(authenticate.signin);
};
