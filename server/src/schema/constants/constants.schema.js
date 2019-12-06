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
			default: null,
		},
		name: {
			type: String,
			required: true,
		},
		value: {
			type: String,
			required: true,
		},
		description: {
			type: String,
			default: null,
		},
		clientApp: {
			type: String,
			default: null,
		}
	}],
});

module.exports = Constants = mongoose.model('constant', ConstantsSchema);