'use strict';

module.exports = function(api) {
	var authenticate = require('../controllers/authenticate.controller');
	api.route('/setup').get(authenticate.setup);
	api.route('/signin').post(authenticate.signin);
};
