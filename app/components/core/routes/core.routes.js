'use strict';

module.exports = function(app) {
	var core = require('../controllers/core.controller');
	app.route('/').get(core.index);
};
