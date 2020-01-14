// const express = require('express');
// const router = express.Router();
// const validateSignupInput = require('../../validation/signup');
// const jwt = require('jsonwebtoken');
// const User = require('../../schema/user.schema');
// const authMiddleware = require('../../middleware/auth');

// @route 		GET api/user
// @desc 			Getting user
// @access 		Public
// router.get('/', authMiddleware, async (req, res) => {
	// const { email, password } = req.body;

	// try {
	// 	const user = await User.findById(req.user.id).select('-password');
	// 	res.json(user);
	// } catch(err) {
		// console.error('/auth/signup', err.message);

		// res.status(500).send('Server error');
// 	}
// });

// module.exports = router;