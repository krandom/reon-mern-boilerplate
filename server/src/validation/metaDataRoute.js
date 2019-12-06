const Validator = require('validator');
const isEmpty = require('is-empty');
const metaDataSchema = require('../schema/metaData.schema');
const responseMsg = require('../helpers/responseMsg');

module.exports = async ({ clientApp, route }) => {
	try {
	  let errors = {};

	  clientApp = !isEmpty(clientApp) ? clientApp : '';
	  route = !isEmpty(route) ? route : '';

	  if (Validator.isEmpty(clientApp))
	    errors.clientApp = responseMsg.info({ message: 'Select an Application.' });

	  if (Validator.isEmpty(route))
	    errors.route = responseMsg.info({ message: 'Route can not be empty.' });

		const metaData = await metaDataSchema.findOne({ clientApp, route });

		if (metaData)
			errors.route = responseMsg.info({ message: 'Route already excists for this Application.' });

		return {
	    errors,
	    isValid: isEmpty(errors),
	  };
	} catch(err) {

	}
};