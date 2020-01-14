const userSchema = require('../schema/user.schema');
const uuid = require('uuid');

module.exports = async () => {
	try {
		const initialUser = await userSchema.findById('initial_user');

		console.log('initial_user', initialUser)
		if (!initialUser) {
			const newInitialUser = new userSchema({
				_id: 'initial_user',
				sequence: 1,
				password: uuid()
			})

			await newInitialUser.save();

			return 1;
		} else {

			const sequenceDocument = await userSchema.findOneAndUpdate({
			  query: { _id: 'initial_user' },
			  update: { $inc: { sequence: 1 }},
			  new: true
			});

			return sequenceDocument.sequence;
		}
	} catch(err) {
		console.log('getNextSequenceValue', err)
	}
};