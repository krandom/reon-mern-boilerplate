const Validator = require('validator');
const isEmpty = require('is-empty');
const constantsSchema = require('../schema/constants/constants.schema');
const responseMsg = require('../helpers/responseMsg');

module.exports = async ({ description, key, name, url, value, add, slug }) => {
	try {
	  let errors = {};

	  name = !isEmpty(name) ? name : '';
	  value = !isEmpty(value) ? value : '';

		value = value.toLowerCase();
		name = name.trim();

		if (key)
			key = key.toLowerCase();

	  if (Validator.isEmpty(name))
	    errors.name = responseMsg.info({ message: 'Please include a valid Name.' });

	  if (Validator.isEmpty(value))
	    errors.value = responseMsg.info({ message: 'Please include a valid Value.' });

		if (add) {
			// TODO :: make case insensitive
			let constant = await constantsSchema.findOne({ slug, 'values.name': name });
			if (constant)
				errors.name = responseMsg.info({ message: 'Name and must be an unique value in the Database.'});

			constant = await constantsSchema.findOne({ slug, 'values.value': value });
			if (constant)
				errors.value = responseMsg.info({ message: 'Value and must be an unique value in the Database.'});
		}

		return {
	    errors,
	    isValid: isEmpty(errors)
	  };
	} catch(err) {}
};