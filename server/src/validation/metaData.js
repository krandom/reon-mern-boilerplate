const Validator = require('validator');
const isEmpty = require('is-empty');
const responseMsg = require('../helpers/responseMsg');

module.exports = async ({ content }) => {
	try {
	  let errors = {};

	  content = !isEmpty(content) ? content : '';

	  if (Validator.isEmpty(content))
	    errors.content = responseMsg.info({ message: 'Content can not be empty.' });

		// TODO :: check for duplicate type/key/value/...
		// REALLY ??? those values are not even being updated...
		// WHOOPS... they are...

		return {
	    errors,
	    isValid: isEmpty(errors),
	  };
	} catch(err) {

	}
};