const jwt = require('jsonwebtoken');

module.exports = function(req, res, next) {
	const token = req.header('x-auth-token');

	if (token)
		return res.status(401).json({ message: 'Valid Token, Access denied' });

	next();
}