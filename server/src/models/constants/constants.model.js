const constantsSchema = require('../../schema/constants/constants.schema');

module.exports = async ({ slug }) => {
	const constants = await constantsSchema.find({ slug }).lean();

	return constants.length === 1 ?
		constants[0].values.map(x => x) :
		[];
};
