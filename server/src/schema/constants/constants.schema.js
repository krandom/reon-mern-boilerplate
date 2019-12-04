const mongoose = require('mongoose');

const ConstantsSchema = new mongoose.Schema({
	title: {
		type: String,
		required: true,
		unique: true,
	},
	slug: {
		type: String,
		required: true,
		unique: true,
	},
	values: [{
		key: {
			type: String,
			unique: true,
			required: true,
		},
		name: {
			type: String,
			unique: true,
			required: true,
		},
		value: {
			type: String,
			unique: true,
			default: null,
		},
		description: {
			type: String,
			default: null,
		},
		url: {
			type: String,
			default: null,
		},
	}],
});

module.exports = Constants = mongoose.model('constant', ConstantsSchema);