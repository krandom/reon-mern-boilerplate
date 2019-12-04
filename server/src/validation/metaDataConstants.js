const Validator = require('validator');
const isEmpty = require('is-empty');
const metaDataConstantsSchema = require('../schema/constants/metaDataConstants.schema');
const responseMsg = require('../helpers/responseMsg');

module.exports = async ({ type, key, value, group, description, url, add }) => {
	try {
	  let errors = {};

	  type = !isEmpty(type) ? type : '';
	  key = !isEmpty(key) ? key : '';
	  value = !isEmpty(value) ? value : '';

		type = type.toLowerCase().trim();
		key = key.toLowerCase().trim();
		value = value.toLowerCase().trim();


		if (Validator.isEmpty(type))
			errors.type = responseMsg.info({ message: 'Please include a valid Type.' });

		if (Validator.isEmpty(key))
			errors.key = responseMsg.info({ message: 'Please include a valid Value.' });

		if (Validator.isEmpty(value))
			errors.value = responseMsg.info({ message: 'Please include a valid Value.' });

		if (add) {
			const constant = await metaDataConstantsSchema.findOne({ value });
			if (constant)
				errors.value = responseMsg.info({ message: 'Value must be an unique.'});
		}

		return {
	    errors,
	    isValid: isEmpty(errors)
	  };
	} catch(err) {}
};