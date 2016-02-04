'use strict';

var usersPolicy = require('../policies/users.policy');

module.exports = function(api) {
	var users = require('../controllers/users.controller');

	api.route('/users')
		.all(usersPolicy.isAllowed)
		.get(users.findAll)
		.post(users.create);

	api.route('/users/:userId')
		.all(usersPolicy.isAllowed)
		.get(users.find)
		.put(users.update)
		.delete(users.delete);

	api.param('userId', users.userByID);
};
