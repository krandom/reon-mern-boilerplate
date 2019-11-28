const Validator = require('validator');
const isEmpty = require('is-empty');
const User = require('../schema/user.schema');
const responseMsg = require('../helpers/responseMsg');

module.exports = async ({ email, password }) => {
	try {
	  let errors = {};

	  email = !isEmpty(email) ? email : '';
	  password = !isEmpty(password) ? password : '';

		// Email checks
	  if (Validator.isEmpty(email) || !Validator.isEmail(email))
	    errors.email = responseMsg.add({ message: 'Please include a valid email' });

		// Password checks
		// TODO :: add length and special char check
	  if (Validator.isEmpty(password))
	    errors.password = responseMsg.add({ message: 'Password field is required' });

		// Check if user with the same email is signed up
		// const user = await User.findOne({ email: { address: email }});
		const user = await User.findOne({ email: { $elemMatch: { address: email }}});

    if (user)
      errors.email = responseMsg.add({ message: 'Please include a valid email' });

		return {
	    errors,
	    isValid: isEmpty(errors)
	  };
	} catch(err) {

	}
};