const UserSchema = require('../schema/user.schema');

// TODO :: remove async so it won't hold up other tasks
module.exports = async ({ clientApp, clientEnv, userID }) => {

	const lastLogin = await UserSchema.findOne(
		{ _id: userID, lastLogin: { $elemMatch: { clientApp, clientEnv }}}
	);

	if (!lastLogin)
		await UserSchema.findOneAndUpdate(
			{ _id: userID },
			{ $push: { lastLogin: { clientApp, clientEnv, date: Date.now() }}}
		);
	else
		await UserSchema.findOneAndUpdate(
			{ _id: userID, 'lastLogin.clientApp': clientApp, 'lastLogin.clientEnv': clientEnv },
			{ $set: { 'lastLogin.$.date': Date.now() }}
		);
};