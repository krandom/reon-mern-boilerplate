const express = require('express');
const router = express.Router();
const jwtToken = require('../../helpers/jwtToken');

const userModel = require('../../models/user.model');
const profileModel = require('../../models/profile.model');


const featureFlagModel = require('../../models/featureFlag.model');
const metaDataModel = require('../../models/metaData.model');

// const constantsSchema = require('../../schema/constants/constants.schema');
const constantsModel = require('../../models/constants/constants.model');
// const metaDataSchema = require('../../schema/metaData.schema');

// const adminRoute = require('../../middleware/adminRoute');
// const anonRoute = require('../../middleware/anonRoute');
// const authRoute = require('../../middleware/authRoute');

// TODO :: don't repeat return json
router.get('/admin/init', async (req, res) => {
	const token = req.header('x-auth-token');
	const clientApp = req.header('clientApp');
	const clientEnv = req.header('clientEnv');

	try {
		console.log('token', token)
		console.log('clientApp', clientApp)
		console.log('clientEnv', clientEnv)

		const { user } = jwtToken.verify({ token });
		console.log('user', user)

		res.json({
			isLoggedIn: true,
			token,
			user: await userModel(user.id),
			profile: await profileModel(user.id),
			featureFlags: await featureFlagModel({clientApp, clientEnv }),
			constants: {
				applications: await constantsModel({ slug: 'applications', clientApp }),
				userRoles: await constantsModel({ slug: 'user-roles', clientApp }),
				environments: await constantsModel({ slug: 'environments', clientApp }),
			},
		})
	} catch(err) {
		console.error('/admin/init', err.message);

		res
			.status(200)
			.json({
				isLoggedIn: false,
				token: null,
				user: null,
				profile: null,
				featureFlags: await featureFlagModel({clientApp, clientEnv }),
				constants: {
					applications: await constantsModel({ slug: 'applications', clientApp }),
					userRoles: await constantsModel({ slug: 'user-roles', clientApp }),
					environments: await constantsModel({ slug: 'environments', clientApp }),
				},
		 	});
	}
});

router.get('/client/init', async (req, res) => {
	const token = req.header('x-auth-token');
	const clientApp = req.header('clientApp');
	const clientEnv = req.header('clientEnv');

	try {
		const { user } = jwtToken.verify({ token });

		res.json({
			isLoggedIn: true,
			// success: true,
			token,
			user: await userModel(user.id),
			profile: await profileModel(user.id),
			featureFlags: await featureFlagModel({clientApp, clientEnv }),
			metaData: await metaDataModel({ clientApp }),
		})
	} catch(err) {
		console.error('/client/init', err.message);

		res
			.status(200)
			.json({
				isLoggedIn: false,
				// success: false,
				token: null,
				user: null,
				profile: null,
				featureFlags: await featureFlagModel({clientApp, clientEnv }),
				metaData: await metaDataModel({ clientApp }),
		 	});
	}
});

module.exports = router;


// @route 		POST api/auth/signup
// @desc 			Routes for creating new user account
// @access 		Public
// router.post('/validate-token', async (req, res) => {
// 	const { token } = req.body;

// 	try {
// 		const { user } = jwtToken.verify({ token });

// 		res.json({
// 			success: true,
// 			message: 'Token is valid',
// 			user: await userModel(user.id),
// 			profile: await profileModel(user.id),
// 		})
// 	} catch(err) {
// 		console.error('/auth/validate-token', err.message);

// 		res.status(200).json({ message: 'No token', user: null });
// 	}
// });