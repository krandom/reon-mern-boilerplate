const featureFlagSchema = require('../schema/featureFlag.schema');

module.exports = async ({ app, environment, allFlags = false }) => {
	const featureFlags = await featureFlagSchema.find(!allFlags ? { app, environment } : {}).lean();

	let returnObj = null;
	let returnArr = null;

	if (!allFlags) {
		returnObj = {};
		featureFlags.forEach(x => returnObj[x.name] = x['value']);
	}
	else {
		returnArr = featureFlags.map(x => {
			x.id = x._id;

			delete x._id;

			return x;
		})
	}

	return returnObj || returnArr;
};
