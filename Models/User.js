const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
		min: 6,
		max: 255
	},
	email: {
		type: String,
		required: true,
		min: 6,
		max: 255
	},
	password: {
		type: String,
		required: true,
		min: 8,
		max: 5000
	},
	date: {
		type: Date,
		default: Date.now
	}
});

const userModel = mongoose.model('User', userSchema);
module.exports = userModel;
