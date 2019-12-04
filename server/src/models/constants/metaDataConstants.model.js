const metaDataConstantsSchema = require('../../schema/constants/metaDataConstants.schema');

module.exports = async ({ admin }) => {
	const metaDataConstants = await metaDataConstantsSchema.find().lean();

	if (admin) {
		return metaDataConstants.map(x => {
			x.id = x._id;

			delete x._id;
			delete x.__v;

			return x;
		})
	}

	return metaDataConstants;
};
