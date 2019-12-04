const constantsSchema = require('../../schema/constants/constants.schema');

module.exports = async ({ slug, app }) => {
	const constants = await constantsSchema.find({ slug }).lean();

	return constants.length === 1 ?
		constants[0]
			.values
			// .filter(x => {
			// 	if (!app)
			// 		return x;

			// 	return !x.app || x.app === app
			// })
			.map(x => {
				x.id = x._id;
				delete x._id;
				return x;
			})
		:
			[];
};
