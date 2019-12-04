const mongoose = require('mongoose');

const MetaDataConstantsSchema = new mongoose.Schema({
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
	group: {
		type: String,
		default: null,
	},
	description: {
		type: String,
		default: null,
	},
	url: {
		type: String,
		default: null,
	}
});

module.exports = MetaDataConstants = mongoose.model('meta-data-constant', MetaDataConstantsSchema);