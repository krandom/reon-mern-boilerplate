const jwt = require('jsonwebtoken');

// TODO :: Move mysecret to config file

const sign = (userID, rememberMe) => {
	return jwt.sign(
		{
			user: {
				id: userID,
			}
		},
		'mysecret',
		{ expiresIn: 360000 },
	)
}

const verify = ({ token }) => {
	return jwt.verify(token, 'mysecret');
}

module.exports = {
	sign: sign,
	verify: verify,
};
