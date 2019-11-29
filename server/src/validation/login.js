const Validator = require('validator');
const isEmpty = require('is-empty');
const User = require('../schema/user.schema');
const responseMsg = require('../helpers/responseMsg');
const bcrypt = require('bcryptjs');

module.exports = async ({ email, password }) => {
	try {
	  let errors = {};

		// Convert empty fields to an empty string so we can use validator functions
	  email = !isEmpty(email) ? email : '';
	  password = !isEmpty(password) ? password : '';

		// Email checks
	  if (Validator.isEmpty(email) || !Validator.isEmail(email))
	    errors.validation = responseMsg.info({ message: 'Invalid User Credentials' });

		// Password checks
	  if (Validator.isEmpty(password))
	    errors.validation = responseMsg.info({ message: 'Invalid User Credentials' });

		const user = await User.findOne({ email: { $elemMatch: { address: email }}});

		if (!user || !(await bcrypt.compare(password, user.password)))
			errors.validation = responseMsg.info({ message: 'Invalid User Credentials' });

		return {
	    errors,
	    isValid: isEmpty(errors),
	    user,
	  };
	} catch(err) {

	}
};