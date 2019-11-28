const isEmpty = require('is-empty');

module.exports = password => {
	const minLength = 4;
	const uppercase = true;
	const lowercase = true;
	const number = true;
	const specialchar = true;

	let errors = {};

	if (minLength && password.length < minLength)
		errors.minLength = `Password must be at least ${minLength} characters long.`;

	if (number && !password.match(/[0-9]/g))
		errors.number = 'Password must include one number.';

	// TODO :: add Å,Ä,Ö
	if (uppercase && !password.match(/[A-Z]/g))
		errors.uppercase = 'Password must include one uppercase letter.';

	// TODO :: add å,ä,ö
	if (lowercase && !password.match(/[a-z]/g))
		errors.lowercase = 'Password must include one lowercase letter.';

	// TODO :: fill out special char array
	if (specialchar && !password.match(/[!@$,<>#:?_*&;]/g))
		errors.specialchar = 'Password must include one special character.';

	return {
		passwordErrors: errors,
		passwordIsValid: isEmpty(errors),
	};
};