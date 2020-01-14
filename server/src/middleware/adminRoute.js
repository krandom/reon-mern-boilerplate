const jwt = require('jsonwebtoken');
const jwtToken = require('../helpers/jwtToken');
const setLastActive = require('../helpers/setLastActive');

// TODO :: check user is admin here

module.exports = function(req, res, next) {
	const token = req.header('x-auth-token');
	const clientApp = req.header('clientApp');
	const clientEnv = req.header('clientEnv');

	if (!token)
		return res.status(401).json({ message: 'No token, Auth denied' });

	try {
		const { user } = jwtToken.verify({ token });

		global.userID = user.id;
		setLastActive({ clientApp, clientEnv, userID });

		next();
	} catch(err) {
		res.status(401).json({ message: 'No token, Auth denied' });
	}
}