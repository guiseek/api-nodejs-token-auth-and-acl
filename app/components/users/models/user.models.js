var mongoose = require('mongoose');
var Schema = mongoose.Schema;

module.exports = mongoose.model('User', new Schema({
	name: String,
	username: String,
	password: String,
	email: String,
	roles: {
		type: Array,
		default: ['user']
	}
}));
