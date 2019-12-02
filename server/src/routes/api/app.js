const express = require('express');
const router = express.Router();

// const featureFlagSchema = require('../../schema/featureFlag.schema');
const featureFlagModel = require('../../models/featureFlag.model');

const adminRoute = require('../../middleware/adminRoute');
const anonRoute = require('../../middleware/anonRoute');
const authRoute = require('../../middleware/authRoute');

router.post('/get-feature-flags', async (req, res) => {
	const { app = 'client', environment = 'dev' } = req.body;

	try {
		const featureFlags = await featureFlagModel({ app, environment });

		res.json({
			success: true,
			featureFlags,
		})
	} catch(err) {
		console.error('/app/get-feature-flags', err.message);

		res.status(500).send('Server error');
	}
});

module.exports = router;