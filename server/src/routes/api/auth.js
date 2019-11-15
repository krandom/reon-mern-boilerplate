const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const User = require('../../models/User');
const bcrypt = require('bcryptjs');

const validateSignupInput = require('../../validation/signup');
const validateLoginInput = require('../../validation/login');

// @route 		GET api/auth
// @desc 			Routes for auth
// @access 		Public
// router.get('/', async (req, res) => res.send('Auth Route'));

// @route 		POST api/auth/signup
// @desc 			Routes for creating new user account
// @access 		Public
router.post('/signup', async (req, res) => {
	const { email, password } = req.body;
console.log('XXX ---------------------->', req.body, req.params)
	try {
		const { errors, isValid } = await validateSignupInput({ email, password });

	  if (!isValid)
	    return res.status(400).json(errors);

    const newUser = new User({
      email,
      password,
    });

		await newUser.save();

		const payload = {
			user: {
				id: newUser.id,
			}
		};

		jwt.sign(
			payload,
			'mysecret',
			{ expiresIn: 360000 },
			(err, token) => {
				if (err) throw err;
				res.json({ token });
			}
		)
	} catch(err) {
		console.error('/auth/signup', err.message);

		res.status(500).send('Server error');
	}
});

// @route 		POST api/auth/signup
// @desc 			Routes for creating new user account
// @access 		Public
router.post('/login', async (req, res) => {
	const { email, password } = req.body;

	try {
		const { errors, isValid } = await validateLoginInput({ email, password });

	  if (!isValid)
	    return res.status(400).json(errors);

		let user = await User.findOne({ email });

		if (!user || !await bcrypt.compare(password, user.password))
			return res.status(400).json({ message: 'Invalid Credentials' });

		const payload = {
			user: {
				id: user.id,
			}
		};

		jwt.sign(
			payload,
			'mysecret',
			{ expiresIn: 360000 },
			(err, token) => {
				if (err) throw err;
				res.json({ token });
			}
		)
	} catch(err) {
		console.error('/auth/signup', err.message);

		res.status(500).send('Server error');
	}
});

module.exports = router;