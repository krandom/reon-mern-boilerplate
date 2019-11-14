const Validator = require('validator');
const isEmpty = require('is-empty');

const User = require('../models/User');

module.exports = async ({ email, password }) => {
	try {

		console.log('trying', email, password)
	  let errors = {};

		// Convert empty fields to an empty string so we can use validator functions
	  email = !isEmpty(email) ? email : '';
	  password = !isEmpty(password) ? password : '';

		// Email checks
	  if (Validator.isEmpty(email) || !Validator.isEmail(email))
	    errors.email = 'Please include a valid email';

		// Password checks
		// TODO :: add length and cpecial char check
	  if (Validator.isEmpty(password))
	    errors.password = 'Password field is required';

		const user = await User.findOne({ email: email });

		// User.findOne({ email: email }).then(user => {
	    if (user)
	      errors.email = 'Email already exists';
	  // });

		return {
	    errors,
	    isValid: isEmpty(errors)
	  };
	} catch(err) {

	}
};