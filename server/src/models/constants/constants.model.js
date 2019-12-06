const constantsSchema = require('../../schema/constants/constants.schema');

module.exports = async ({ slug, clientApp }) => {
	const constants = await constantsSchema.find({ slug }).lean();

	if (clientApp) {
		let returnObj = {};

		if (constants.length) {
			constants[0]
				.values
				.filter(x => !x.clientApp || x.clientApp === clientApp)
				.forEach(x => {
					returnObj[x.value] = x.name;
				});
		}

		return returnObj;
	}

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


