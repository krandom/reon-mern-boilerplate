const mongoose = require('mongoose');

const FeatureFlagSchema = new mongoose.Schema({
	clientApp: {
		type: String,
		required: true,
	},
	clientEnv: {
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