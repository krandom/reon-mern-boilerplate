const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwtToken = require('../../helpers/jwtToken');
const responseMsg = require('../../helpers/responseMsg');
const uuid = require('uuid');

// const nodemailer = require('nodemailer');
// const nodemailer = require('../../helpers/nodemailer');

// const Email = require('email-templates');
const nodemailer = require('../../helpers/nodemailer');

const userSchema = require('../../schema/user.schema');
const userModel = require('../../models/user.model');
const profileModel = require('../../models/profile.model');

const validateSignupInput = require('../../validation/signup');
const validateLoginInput = require('../../validation/login');
const validateRequestPwdResetLink = require('../../validation/requestPwdResetLink');
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
		const { errors, isValid, user } = await validateLoginInput({ email, password, role: 'user' });

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
router.post('/request-pwd-reset-password', anonRoute, async (req, res) => {
	const { email } = req.body;

	try {
		const { errors, isValid } = await validateRequestPwdResetLink({ email });

	  if (!isValid)
	    return res.status(400).json({ toast: errors });

		const user = await userSchema.findOne({ email: { $elemMatch: { address: email }}});

		if (user) {
			const verificationCode = uuid();
			userSchema.updateOne({ _id: user._id }, { $set: { 'resetPassword.verificationCode': verificationCode, 'resetPassword.dateAdded': new Date() }}, (err, res) => {

				if (!err) {
			    nodemailer.send({
			      template: 'reset-password',
			      message: {
			        from: 'Reon Solutions <no-reply@reonsolutions.com>',
			        to: email,
			      },
			      locals: {
			      	email,
			        verificationCode,
			      },
			    }).then(() => console.log('email has been sent!'));
				}
			});
		}

		res.status(200).json({
			toast: responseMsg.info({ message: `Instructions for changing your password have been sent to ${email}` })
		});
	} catch(err) {
		console.error('/auth/get-user', err.message);

		res.status(400).json({ message: 'Could not get user' });
	}
});

// @route 		POST api/auth/signup
// @desc 			Routes for creating new user account
// @access 		Public
router.post('/reset-password', anonRoute, async (req, res) => {
	const { email, code, password, confirmPassword } = req.body;

	try {
		const { errors, isValid, user } = await validateResetPassword({ email, code, password, confirmPassword });

	  if (!isValid || !user)
	    return res.status(400).json({ toast: errors });

		const salt = await bcrypt.genSalt(10);

		await userSchema.updateOne({ _id: user._id }, { $set: {
			password: await bcrypt.hash(password, salt),
			'resetPassword.verificationCode': null,
			'resetPassword.dateAdded': null,
		}})

		res.status(200).json({
			toast: responseMsg.info({ message: `Your password have been updated, please log in to continue.`, type: 'success', sticky: true }),
			success: true,
		});
	} catch(err) {
		console.error('/auth/reset-password', err.message);

		res.status(400).json({ message: 'Could not update password' });
	}
});

module.exports = router;