const Validator = require('validator');
const isEmpty = require('is-empty');
const User = require('../schema/user.schema');
const responseMsg = require('../helpers/responseMsg');
const isValidPassword = require('../helpers/isValidPassword');

module.exports = async ({ email, code, password, confirmPassword }) => {
	try {
	  let errors = {};

	  email = !isEmpty(email) ? email : '';
	  code = !isEmpty(code) ? code : '';
	  password = !isEmpty(password) ? password : '';
	  confirmPassword = !isEmpty(confirmPassword) ? confirmPassword : '';

		// Email checks
	  if (Validator.isEmpty(email) || !Validator.isEmail(email))
	    errors.email = responseMsg.add({ message: 'Please include a valid email.' });

		// Password checks
		// TODO :: add length and special char check
	  if (Validator.isEmpty(password) || Validator.isEmpty(confirmPassword) || password !== confirmPassword)
	    errors.password = responseMsg.add({ message: 'Password field is required.' });

		// TODO :: check timestamp on resetPassword.dateAdded if you want an expiration on the link sent

		const { passwordErrors, passwordIsValid } = isValidPassword(password);
		if (!passwordIsValid)
			Object.keys(passwordErrors).forEach(x => errors[x] = responseMsg.add({ message: passwordErrors[x] }) );

		const user = await User.findOne({
			'email.address': email,
			'resetPassword.verificationCode': code
		});

    if (!user)
      errors.email = responseMsg.add({ message: 'Could not update password.' });

		return {
	    errors,
	    isValid: isEmpty(errors),
	    user,
	  };
	} catch(err) {

	}
};