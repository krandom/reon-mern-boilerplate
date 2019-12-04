const mongoose = require('mongoose');

const FeatureFlagSchema = new mongoose.Schema({
	app: {
		type: String,
		required: true,
	},
	environment: {
		type: String,
		required: true,
	},
	value: {
		type: Boolean,
		required: true,
	},
	key: {
		type: String,
		required: true,
	}
});

module.exports = FeatureFlag = mongoose.model('feature-flag', FeatureFlagSchema);