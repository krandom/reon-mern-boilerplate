const User = require('../schema/user.schema');

module.exports = async (userID) => {
	let user = await User.findById(userID).select('-password').lean();

	user.email = user.email.map(x => {
		if (x.verificationCode)
				x.verified = false;

		delete x.dateAdded;
		delete x.verificationCode;
		delete x._id

		return x;
	});

	user.id = user._id;

	delete user.__v;
	delete user._id;
	delete user.role;
	delete user.profile;
	delete user.lastActive;
	delete user.lastLogin;
	delete user.resetPassword;

	return user;
};
