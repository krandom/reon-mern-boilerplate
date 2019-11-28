const Validator = require('validator');
const isEmpty = require('is-empty');
const User = require('../schema/user.schema');
const responseMsg = require('../helpers/responseMsg');
const isValidPassword = require('../helpers/isValidPassword');

module.exports = async ({ email, password }) => {
	try {
	  let errors = {};

	  email = !isEmpty(email) ? email : '';
	  password = !isEmpty(password) ? password : '';

		// Email checks
	  if (Validator.isEmpty(email) || !Validator.isEmail(email))
	    errors.email = responseMsg.add({ message: 'Please include a valid email' });

		// Password checks
	  if (Validator.isEmpty(password))
	    errors.password = responseMsg.add({ message: 'Password field is required' });

		// Validate password according to your standards set up in isValidPassword
		const { passwordErrors, passwordIsValid } = isValidPassword(password);
		if (!passwordIsValid)
			Object.keys(passwordErrors).forEach(x => errors[x] = responseMsg.add({ message: passwordErrors[x] }) );

		// Check if user with the same email is signed up
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