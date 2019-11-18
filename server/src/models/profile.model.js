const Profile = require('../schema/profile.schema');

module.exports = async (userID) => {
	const profile = await Profile.findOne({ user: userID });

	return profile || {};
};
