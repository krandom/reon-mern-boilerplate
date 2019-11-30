const jwt = require('jsonwebtoken');
const jwtToken = require('../helpers/jwtToken');

// TODO :: update last active here
// TODO :: check user is admin here

module.exports = function(req, res, next) {
	const token = req.header('x-auth-token');

	if (!token)
		return res.status(401).json({ message: 'No token, Auth denied' });

	try {
		const { user } = jwtToken.verify({ token });

		global.userID = user.id;

		next();
	} catch(err) {
		res.status(401).json({ message: 'No token, Auth denied' });
	}
}