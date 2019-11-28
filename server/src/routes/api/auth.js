const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const jwtToken = require('../../helpers/jwtToken');
const responseMsg = require('../../helpers/responseMsg');

// const nodemailer = require('nodemailer');
// const nodemailer = require('../../helpers/nodemailer');

// const Email = require('email-templates');
const nodemailer = require('../../helpers/nodemailer');

const userSchema = require('../../schema/user.schema');
const userModel = require('../../models/user.model');
const profileModel = require('../../models/profile.model');

const validateSignupInput = require('../../validation/signup');
const validateLoginInput = require('../../validation/login');
const validateResetPassword = require('../../validation/resetPassword');

const anonRoute = require('../../middleware/anonRoute');
const authRoute = require('../../middleware/authRoute');

// @route 		POST api/auth/signup
// @desc 			Routes for creating new user account
// @access 		Public
router.post('/signup', anonRoute, async (req, res) => {
	const { email, password } = req.body;
	try {
		const { errors, isValid } = await validateSignupInput({ email, password });

	  if (!isValid)
	    return res.status(400).json({ toast: errors });

    const newUser = new userSchema({
      email: { address: email },
      password,
    });

		await newUser.save();

    nodemailer.send({
      template: 'verify-email',
      message: {
        from: 'Reon Solutions <no-reply@reonsolutions.com>',
        to: email,
      },
      locals: {
      	email,
        verificationCode: newUser.email[0].verificationCode,
      },
    }).then(() => console.log('email has been sent!'));

		res.json({ token: jwtToken.sign(newUser.id) });

	} catch(err) {
		console.error('/auth/signup', err.message);

		res.status(500).send('Server error');
	}
});

// @route 		POST api/auth/signup
// @desc 			Routes for creating new user account
// @access 		Public
router.post('/login', anonRoute, async (req, res) => {
	const { email, password } = req.body;

	try {
		const { errors, isValid, user } = await validateLoginInput({ email, password });

	  if (!isValid)
	    return res.status(400).json({ toast: errors });

		res.json({
			token: jwtToken.sign(user._id),
			user: await userModel(user._id),
			profile: await profileModel(user._id),
		})
	} catch(err) {
		console.error('/auth/login', err.message);

		res.status(500).send('Server error');
	}
});

// @route 		POST api/auth/signup
// @desc 			Routes for creating new user account
// @access 		Public
router.post('/validate-token', async (req, res) => {
	const { token } = req.body;

	try {
		const { user } = jwtToken.verify({ token });

		res.json({
			message: 'Token is valid',
			user: await userModel(user.id),
			profile: await profileModel(user.id),
		})
	} catch(err) {
		console.error('/auth/validate-token', err.message);

		res.status(200).json({ message: 'No token', user: null });
	}
});

// @route 		POST api/auth/signup
// @desc 			Routes for creating new user account
// @access 		Public
router.post('/verify-email', async (req, res) => {
	const { email, code } = req.body;

	try {
		const user = await userSchema.findOne({ email: { $elemMatch: { address: email, verificationCode: code }}});

		if (!user) {
			res.status(400).json({
				toast: responseMsg.warn({ message: 'Could not verify email address!', sticky: true })
			});
		} else {
			await userSchema.updateOne({ 'email.address': email, 'email.verificationCode': code }, { $set: { 'email.$.verificationCode': null }});

			res.json({
				success: true,
			});
		}

	} catch(err) {
		console.error('/auth/verify-email', err.message);

		res.status(400).json({ message: 'Could not verify email' });
	}
});

// @route 		POST api/auth/signup
// @desc 			Routes for creating new user account
// @access 		Public
router.post('/get-user', authRoute, async (req, res) => {

	try {
		res.json({
			user: await userModel(userID),
		})
	} catch(err) {
		console.error('/auth/get-user', err.message);

		res.status(400).json({ message: 'Could not get user' });
	}
});

// @route 		POST api/auth/signup
// @desc 			Routes for creating new user account
// @access 		Public
router.post('/reset-password', anonRoute, async (req, res) => {
	const { email } = req.body;

	try {
		const { errors, isValid } = await validateResetPassword({ email });

		res.json({
			user: await userModel(userID),
		})
	} catch(err) {
		console.error('/auth/get-user', err.message);

		res.status(400).json({ message: 'Could not get user' });
	}
});

module.exports = router;