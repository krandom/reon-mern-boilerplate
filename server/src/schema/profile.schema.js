const mongoose = require('mongoose');
const uuid = require('uuid');

const ProfileSchema = new mongoose.Schema({
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'user'
	},
	firstName: {
		type: String,
	},
	lastName: {
		type: String,
	},
	phone: [{
		name: {
			type: String,
		},
		number: {
			type: String,
			required: true,
		},
		type: {
			type: String,
			default: 'cell',
		},
		primary: {
			type: Boolean,
			default: true,
		},
		verificationCode: {
			type: String,
			default: uuid(),
		},
		dateAdded: {
			type: Date,
			default: Date.now,
			private: true,
		}
	}],
});

module.exports = Profile = mongoose.model('profile', ProfileSchema);