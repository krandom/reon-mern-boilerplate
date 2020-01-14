const UserSchema = require('../schema/user.schema');

// TODO :: remove async so it won't hold up other tasks
module.exports = async ({ clientApp, clientEnv, userID }) => {

	const lastActive = await UserSchema.findOne(
		{ _id: userID, lastActive: { $elemMatch: { clientApp, clientEnv }}}
	);

	if (!lastActive)
		await UserSchema.findOneAndUpdate(
			{ _id: userID },
			{ $push: { lastActive: { clientApp, clientEnv, date: Date.now() }}}
		);
	else
		await UserSchema.findOneAndUpdate(
			{ _id: userID, 'lastActive.clientApp': clientApp, 'lastActive.clientEnv': clientEnv },
			{ $set: { 'lastActive.$.date': Date.now() }}
		);
};