var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

var BeerSchema = new Schema({
	name: {
		type: String,
		unique: true,
		required: true
	},
	description: {
		type: String,
	},
    brewery: {
        type: Schema.ObjectId,
        ref: 'Brewery'
    },
    user: {
        type: Schema.ObjectId,
        ref: 'User'
    }
});

module.exports = mongoose.model('Beer', BeerSchema);
