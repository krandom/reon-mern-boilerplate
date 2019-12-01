const express = require('express');
const router = express.Router();
const jwtToken = require('../../../helpers/jwtToken');

const userSchema = require('../../../schema/user.schema');
const profileSchema = require('../../../schema/profile.schema');
const userModel = require('../../../models/user.model');
const usersModel = require('../../../models/users.model');
const profileModel = require('../../../models/profile.model');

const validateLoginInput = require('../../../validation/login');

const anonRoute = require('../../../middleware/anonRoute');
const adminRoute = require('../../../middleware/adminRoute');
const authRoute = require('../../../middleware/authRoute');

router.post('/all', adminRoute, async (req, res) => {
	try {
		res.json({
			success: true,
			users: await usersModel(),
		})
	} catch(err) {
		console.error('/auth/admin/user-profiles/all', err.message);

		res.status(500).send('Server error');
	}
});

module.exports = router;