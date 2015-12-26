'use strict';

var usersPolicy = require('../policies/users.policy');

module.exports = function(api) {
	var users = require('../controllers/users.controller');

	api.route('/users')
		.all(usersPolicy.isAllowed)
		.get(users.findAll)
		.post(users.create);

	api.route('/users/:id')
		.all(usersPolicy.isAllowed)
		.get(users.find)
		.put(users.update)
		.delete(users.delete);

	api.route('/setup').get(users.setup);
	
	api.param('id', users.userByID);
};
