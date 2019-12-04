const express = require('express');
const router = express.Router();

const metaDataSchema = require('../../schema/metaData.schema');
const featureFlagModel = require('../../models/featureFlag.model');
const metaDataModel = require('../../models/metaData.model');

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

router.post('/get-meta-data', async (req, res) => {
	try {
		const metaData = await metaDataModel();

		// await metaDataSchema.create({
		// 	route: '/',
		// 	title: 'Reon MERN Client',
		// 	tags: [{
		// 		name: 'description',
		// 		content: 'Get up and running with MERN in a sec!',
		// 	}]
		// })
		res.json({
			success: true,
			metaData,
		})
	} catch(err) {
		console.error('/app/get-meta-data', err.message);

		res.status(500).send('Server error');
	}
});

module.exports = router;