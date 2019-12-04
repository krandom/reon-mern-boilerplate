const metaDataSchema = require('../schema/metaData.schema');

module.exports = async () => {
	const metaData = await metaDataSchema.find().lean();

	let returnObj = {};

	metaData.forEach(x => {
		// x.tags = x.tags.map(y => {
		// 	delete y._id;
		// 	return y;
		// })

		returnObj[x.route] = {
			tags: x.tags.map(y => {
				delete y._id;
				return y;
			}),
			title: x.title,
		};
	});

	return returnObj;
};
