const mongoose = require('mongoose');

const FeatureFlagSchema = new mongoose.Schema({
	app: {
		type: String,
		require: true,
	},
	environment: {
		type: String,
		require: true,
	},
	value: {
		type: Boolean,
		require: true,
	},
	name: {
		type: String,
		require: true,
	}
});

module.exports = FeatureFlag = mongoose.model('feature-flag', FeatureFlagSchema);