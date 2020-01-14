const Validator = require('validator');
const isEmpty = require('is-empty');
const constantsSchema = require('../schema/constants/constants.schema');
const responseMsg = require('../helpers/responseMsg');

module.exports = async ({ app, description, key, name, value, add, slug }) => {
	try {
	  let errors = {};

	  name = !isEmpty(name) ? name : '';
	  value = !isEmpty(value) ? value : '';

		if (key)
			key = key.trim().toLowerCase();

	  if (Validator.isEmpty(name))
	    errors.name = responseMsg.info({ message: 'Please include a valid Name.' });

	  if (Validator.isEmpty(value))
	    errors.value = responseMsg.info({ message: 'Please include a valid Value.' });

		if (add) {
			if (!app) {
				// TODO :: make case insensitive
				let constant = await constantsSchema.findOne({ slug, values: { $elemMatch: { name }}});
				if (constant)
					errors.name = responseMsg.info({ message: 'Combination of Name and Application must be unique.'});

				// TODO :: make case insensitive
				constant = await constantsSchema.findOne({ slug, values: { $elemMatch: { value }}});
				if (constant)
					errors.value = responseMsg.info({ message: 'Combination of Value and Application must be unique.'});
			} else {
				// TODO :: make case insensitive
				let constant = await constantsSchema.findOne({ slug, values: { $elemMatch: { name, app }}});
				if (constant)
					errors.name = responseMsg.info({ message: 'Combination of Name and Application must be unique.'});

				// TODO :: don't make two queries for this!!! =)
				constant = await constantsSchema.findOne({ slug, values: { $elemMatch: { name, app: null }}});
				if (constant)
					errors.name = responseMsg.info({ message: 'Combination of Name and Application must be unique.'});

				constant = await constantsSchema.findOne({ slug, values: { $elemMatch: { value, app }}});
				if (constant)
					errors.value = responseMsg.info({ message: 'Combination of Value and Application must be unique.'});

				// TODO :: don't make two queries for this!!! =)
				constant = await constantsSchema.findOne({ slug, values: { $elemMatch: { value, app: null }}});
				if (constant)
					errors.value = responseMsg.info({ message: 'Combination of Value and Application must be unique.'});
			}
		}

		return {
	    errors,
	    isValid: isEmpty(errors)
	  };
	} catch(err) {}
};