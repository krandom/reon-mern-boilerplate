const express = require('express');
const router = express.Router();
const jwtToken = require('../../../helpers/jwtToken');

const userModel = require('../../../models/user.model');
const profileModel = require('../../../models/profile.model');

const validateLoginInput = require('../../../validation/login');

const anonRoute = require('../../../middleware/anonRoute');

// @route 		POST api/auth/signup
// @desc 			Routes for creating new user account
// @access 		Public
router.post('/login', anonRoute, async (req, res) => {
	const { email, password } = req.body;

	try {
		const { errors, isValid, user } = await validateLoginInput({ email, password, role: 'admin' });

	  if (!isValid)
	    return res.status(400).json({ toast: errors });

		res.json({
			token: jwtToken.sign(user._id),
			user: await userModel(user._id),
			profile: await profileModel(user._id),
		})
	} catch(err) {
		console.error('/auth/admin/login', err.message);

		res.status(500).send('Server error');
	}
});

module.exports = router;