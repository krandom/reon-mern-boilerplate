const User = require('../schema/user.schema');

module.exports = async (userID) => {
	const user = await User.findById(userID).select('-password');

	return user;
};
