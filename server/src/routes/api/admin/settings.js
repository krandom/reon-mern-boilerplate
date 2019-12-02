const express = require('express');
const router = express.Router();
const jwtToken = require('../../../helpers/jwtToken');
const featureFlagSchema = require('../../../schema/featureFlag.schema');
const featureFlagModel = require('../../../models/featureFlag.model');

const adminRoute = require('../../../middleware/adminRoute');
const anonRoute = require('../../../middleware/anonRoute');
const authRoute = require('../../../middleware/authRoute');

const server = require('../../../server');

router.post('/get-feature-flags', async (req, res) => {
	try {
		res.json({ featureFlags: await featureFlagModel({ allFlags: true }) })
	} catch(err) {
		console.error('/admin/settings/get-feature-flags', err.message);

		res.status(500).send('Server error');
	}
});

// TODO :: create validation
router.post('/set-feature-flags', adminRoute, async (req, res) => {
	const { app, environment, name, value } = req.body;
	try {
		const flag = await featureFlagSchema.findOne({ app, environment, name });

		if (flag) {
			flag.value = value;
			await flag.save();
		} else
			await featureFlagSchema.create({ app, environment, value, name });

		// console.log('server', server)
		// console.log('jwtToken', jwtToken)
		// server.test();
		broadcast({
			type: 'REFRESH_FEATURE_FLAGS',
		});
		res.json({ featureFlags: await featureFlagModel({ allFlags: true }) })
	} catch(err) {
		console.error('/admin/settings/set-feature-flags', err.message);

		res.status(500).send('Server error');
	}
});

module.exports = router;