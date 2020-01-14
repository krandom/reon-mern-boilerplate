const mongoose = require('mongoose');

const MetaDataSchema = new mongoose.Schema({
	route: {
		type: String,
		required: true,
		unique: true,
	},
	title: {
		type: String,
		default: null,
	},
	clientApp: {
		type: String,
		required: true,
	},
	tags: [
		{
			type: {
				type: String,
				required: true,
			},
			key: {
				type: String,
				required: true,
			},
			value: {
				type: String,
				required: true,
			},
			content: {
				type: String,
				default: null,
			},
		}
	],
});

module.exports = MetaData = mongoose.model('meta-data', MetaDataSchema);