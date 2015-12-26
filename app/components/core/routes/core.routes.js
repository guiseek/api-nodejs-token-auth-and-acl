'use strict';

module.exports = function(app) {
	// Root routing
	var core = require('../controllers/core.controller');
	app.route('/').get(core.index);
};
