const userSchema = require('../schema/user.schema');

module.exports = async () => {

	let users = await userSchema
		.find()
		.select('-password')
		.populate('profile')
		.lean();

	return users;
};
