const express = require('express');
const router = express.Router();
const responseMsg = require('../../../helpers/responseMsg');

const featureFlagSchema = require('../../../schema/featureFlag.schema');
const featureFlagModel = require('../../../models/featureFlag.model');

const metaDataConstantsSchema = require('../../../schema/constants/metaDataConstants.schema');
const metaDataConstantsModel = require('../../../models/constants/metaDataConstants.model');
const constantsSchema = require('../../../schema/constants/constants.schema');
const constantsModel = require('../../../models/constants/constants.model');

const validateConstants = require('../../../validation/constants');
const validateMetaDataConstants = require('../../../validation/metaDataConstants');

const adminRoute = require('../../../middleware/adminRoute');
const anonRoute = require('../../../middleware/anonRoute');
const authRoute = require('../../../middleware/authRoute');

const constantsDict = {
	'user-roles': 'userRoles',
	'feature-flags': 'featureFlags',
	'environments': 'environments',
};

router.get('/feature-flags', adminRoute, async (req, res) => {
	try {
		res.json({ featureFlags: await featureFlagModel({ allFlags: true }) })
	} catch(err) {
		console.error('/admin/settings/get-feature-flags', err.message);

		res.status(500).send('Server error');
	}
});

// TODO :: create validation (isEmpty)
router.post('/feature-flags', adminRoute, async (req, res) => {
	const { app, environment, name, value } = req.body;
	try {
		let flag = await featureFlagSchema.findOne({ app, environment, name });

		if (flag) {
			flag.value = value;
			await flag.save();
		} else
			await featureFlagSchema.create({ app, environment, value, name });

		broadcast({type: 'REFRESH_FEATURE_FLAGS' });

		res.json({ featureFlags: await featureFlagModel({ allFlags: true }) })
	} catch(err) {
		console.error('/admin/settings/set-feature-flags', err.message);

		res.status(500).send('Server error');
	}
});

router.get('/constants', adminRoute, async (req, res) => {
	try {
		res.json({
			constants: {
				metaData: await metaDataConstantsModel({ admin: true }),
				userRoles: await constantsModel({ slug: 'user-roles' }),
				featureFlags: await constantsModel({ slug: 'feature-flags' }),
				environments: await constantsModel({ slug: 'environments' }),
			}
		});
	} catch(err) {
		console.error('/get-constants', err.message);

		res.status(500).send('Server error');
	}
});

router.post('/constants', adminRoute, async (req, res) => {
	const { description, key, name, url, value, add, slug, title } = req.props;
	try {
		const { errors, isValid } = await validateConstants({ description, key, name, url, value, add, slug });

	  if (!isValid)
	    return res.status(400).json({ toast: errors });

		let constants = await constantsSchema.findOneAndUpdate({ slug }, { $push: { values: { description, key, name, url, value }}});
		if (!constants)
			await constantsSchema.create({ title, slug, values: { description, key, name, url, value }});

		res.json({
			toast: responseMsg.success({ message: 'Done!' }),
			constants: { [constantsDict[slug]]: await constantsModel({ slug }) }
		})
	} catch(err) {
		console.error('/get-constants', err.message);

		res.status(500).send('Server error');
	}
});

router.post('/meta-data-constants', adminRoute, async (req, res) => {
	const { type, key, value, group, description, url, add } = req.body;
	try {
		const { errors, isValid } = await validateMetaDataConstants({ type, key, value, group, description, url, add });

	  if (!isValid)
	    return res.status(400).json({ toast: errors });

		await metaDataConstantsSchema.create({ type, key, value, group, description, url });

		res.json({
			toast: responseMsg.success({ message: 'Done!' }),
			constants: { metaData: await metaDataConstantsModel({ admin: true }) }
		});
		// res.json({ message: 'success' });

		// let constant = await metaDataConstantsSchema.findOne({ type, key, value });

		// if (constant) {
		// 	constant = { ...constant, group, description };
		// 	await constant.save();
		// } else
		// 	await metaDataConstantsSchema.create({ type, key, value, group, description });

		// res.json({ constants: { metaData: await metaDataConstantsModel({ admin: true }) }});
	} catch(err) {
		console.error('/admin/settings/meta-data-constant', err.message);

		res.status(500).send('Server error');
	}
});

// TODO :: create validation (isEmpty)
// router.post('/meta-data-constants', adminRoute, async (req, res) => {
// 	const { type, key, value, content, group, description } = req.body;
// 	try {
// 		let constant = await metaDataConstantsSchema.findOne({ type, key, value });

// 		if (constant) {
// 			constant = { ...constant, content, group, description };
// 			await constant.save();
// 		} else
// 			await metaDataConstantsSchema.create({ type, key, value, content, group, description });

// 		res.json({ constants: { metaData: await metaDataConstantsModel({ admin: true }) }});
// 	} catch(err) {
// 		console.error('/admin/settings/meta-data-constant', err.message);

// 		res.status(500).send('Server error');
// 	}
// });

module.exports = router;