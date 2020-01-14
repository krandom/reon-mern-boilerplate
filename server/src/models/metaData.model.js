const metaDataSchema = require('../schema/metaData.schema');

module.exports = async ({ clientApp }) => {

	if (!clientApp) {
		let metaData = await metaDataSchema.find().lean();
		metaData = metaData.map(x => {
			x.id = x._id;
			delete x._id;
			delete x.__v;

			return x;
		});
		return metaData;
	}

	const metaData = await metaDataSchema.find({ clientApp }).lean();

	let returnObj = {};

	metaData.forEach(x => {

		returnObj[x.route] = {
			title: x.title,
			tags: {},
		};

		x.tags.forEach(y => {
			returnObj[x.route]['tags'][y.value] = {
				content: y.content,
				type: y.type,
				key: y.key,
			}
		})

		// returnObj[x.route] = {
		// 	tags: x.tags.map(y => {
		// 		delete y._id;
		// 		return y;
		// 	}),
		// 	title: x.title,
		// };
	});

	return returnObj;
};
