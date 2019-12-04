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
	tags: [
		{
			name: {
				type: String,
				default: null,
			},
			itemprop: {
				type: String,
				default: null,
			},
			property: {
				type: String,
				default: null,
			},
			content: {
				type: String,
				default: null,
			}
		}
	],
});

module.exports = MetaData = mongoose.model('meta-data', MetaDataSchema);