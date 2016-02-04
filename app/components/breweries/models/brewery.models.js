var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

var BrewerySchema = new Schema({
	name: {
		type: String,
		unique: true,
		required: true
	},
	description: {
		type: String,
	},
    user: {
        type: Schema.ObjectId,
        ref: 'User'
    }
});

module.exports = mongoose.model('Brewery', BrewerySchema);
