const Validator = require('validator');
const isEmpty = require('is-empty');
const responseMsg = require('../helpers/responseMsg');

module.exports = async ({ email }) => {
	try {
	  let errors = {};

	  email = !isEmpty(email) ? email : '';

	  if (Validator.isEmpty(email) || !Validator.isEmail(email))
	    errors.validation = responseMsg.info({ message: 'Invalid Email Address' });

		return {
	    errors,
	    isValid: isEmpty(errors),
	  };
	} catch(err) {

	}
};