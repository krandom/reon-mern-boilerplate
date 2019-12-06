const featureFlagSchema = require('../schema/featureFlag.schema');

module.exports = async ({ clientApp, clientEnv }) => {

	if (clientApp || clientEnv) {
		const featureFlags = await featureFlagSchema.find({ clientApp, clientEnv }).lean();

		let returnObj = {};
		featureFlags.forEach(x => returnObj[x.key] = x.value);
		return returnObj;
	} else {
		const featureFlags = await featureFlagSchema.find().lean();

		return featureFlags.map(x => {
			x.id = x._id;
			delete x._id;
			return x;
		})
	}
};
