const express = require('express');
const router = express.Router();
const responseMsg = require('../../../helpers/responseMsg');

const featureFlagSchema = require('../../../schema/featureFlag.schema');
const featureFlagModel = require('../../../models/featureFlag.model');

const metaDataConstantsSchema = require('../../../schema/constants/metaDataConstants.schema');
const metaDataConstantsModel = require('../../../models/constants/metaDataConstants.model');
const metaDataSchema = require('../../../schema/metaData.schema');
const metaDataModel = require('../../../models/metaData.model');
const constantsSchema = require('../../../schema/constants/constants.schema');
const constantsModel = require('../../../models/constants/constants.model');

const sanitizeConstants = require('../../../sanitize/constants.sanitize');
const sanitizeFeatureFlags = require('../../../sanitize/featureFlags.sanitize');
const sanitizeMetaData = require('../../../sanitize/metaData.sanitize');

const validateConstants = require('../../../validation/constants');
const validateMetaDataConstants = require('../../../validation/metaDataConstants');
const validateMetaDataRoute = require('../../../validation/metaDataRoute');
const validateMetaData = require('../../../validation/metaData');

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
		res.json({ featureFlags: await featureFlagModel({}) })
	} catch(err) {
		console.error('/admin/settings/get-feature-flags', err.message);

		res.status(500).send('Server error');
	}
});

// TODO :: create validation (isEmpty)
router.post('/feature-flags', adminRoute, async (req, res) => {
	const { clientApp, clientEnv, key, value } = sanitizeFeatureFlags(req.props);
	try {
		let flag = await featureFlagSchema.findOne({ clientApp, clientEnv, key });

		if (flag) {
			flag.value = value;
			await flag.save();
		} else
			await featureFlagSchema.create({ clientApp, clientEnv, value, key });

		broadcast({type: 'REFRESH_FEATURE_FLAGS' });

		res.json({
			toast: responseMsg.success({ message: 'Done!' }),
			featureFlags: await featureFlagModel({}),
		});
	} catch(err) {
		console.error('/admin/settings/set-feature-flags', err.message);

		res.status(500).send('Server error');
	}
});

router.get('/meta-data', adminRoute, async (req, res) => {
	try {
		res.json({ metaData: await metaDataModel({}) })

	} catch(err) {
		console.error('/admin/settings/meta-data GET', err.message);

		res.status(500).send('Server error');
	}
});

router.post('/meta-data', adminRoute, async (req, res) => {
	// TODO :: sanitize (???)
	const { clientApp, route, title } = req.props;

	try {
		const { errors, isValid } = await validateMetaDataRoute({ clientApp, route });

	  if (!isValid)
	    return res.status(400).json({ toast: errors });

		await metaDataSchema.create({ clientApp, route, title });

		res.json({
			toast: responseMsg.success({ message: 'Done!' }),
			metaData: await metaDataModel({}),
		});
	} catch(err) {
		console.error('/admin/settings/meta-data POST', err.message);

		res.status(500).send('Server error');
	}
});

router.put('/meta-data', adminRoute, async (req, res) => {
	const { id, title } = req.props;

	try {
		await metaDataSchema.findOneAndUpdate({ _id: id }, { title });

		res.json({ metaData: await metaDataModel({}) })

	} catch(err) {
		console.error('/admin/settings/meta-data PUT', err.message);

		res.status(500).send('Server error');
	}
});

router.post('/meta-data-tag', adminRoute, async (req, res) => {
	const { id, content, type, key, value, } = sanitizeMetaData(req.props);

	try {
		const { errors, isValid } = await validateMetaData({ content, type, key, value });

	  if (!isValid)
	    return res.status(400).json({ toast: errors });

		await metaDataSchema.findOneAndUpdate({ _id: id }, { $push: { tags: { content, type, key, value }}});

		res.json({ metaData: await metaDataModel({}) })

	} catch(err) {
		console.error('/admin/settings/meta-data PUT', err.message);

		res.status(500).send('Server error');
	}
});

router.get('/constants', adminRoute, async (req, res) => {
	const clientApp = req.header('clientApp');
	try {
		res.json({
			constants: {
				metaData: await metaDataConstantsModel({ admin: true }),
				applications: await constantsModel({ slug: 'applications' }),
				userRoles: await constantsModel({ slug: 'user-roles' }),
				featureFlags: await constantsModel({ slug: 'feature-flags', }),
				environments: await constantsModel({ slug: 'environments' }),
			}
		});
	} catch(err) {
		console.error('/GET constants', err.message);

		res.status(500).send('Server error');
	}
});

router.post('/constants', adminRoute, async (req, res) => {
	const { clientApp, description, key, name, value, add, slug, title } = sanitizeConstants(req.props);

	try {
		const { errors, isValid } = await validateConstants({ clientApp, description, key, name, value, add, slug });

	  if (!isValid)
	    return res.status(400).json({ toast: errors });

		let constants = await constantsSchema.findOneAndUpdate({ slug }, { $push: { values: { clientApp, description, key, name, value }}});
		if (!constants)
			await constantsSchema.create({ title, slug, values: { clientApp, description, key, name, value }});

		res.json({
			toast: responseMsg.success({ message: 'Done!' }),
			constants: { [constantsDict[slug]]: await constantsModel({ slug }) }
		});
	} catch(err) {
		console.error('/POST constants', err.message);

		res.status(500).send('Server error');
	}
});

router.put('/constants', adminRoute, async (req, res) => {
	const { id, slug, description } = req.props;

	try {
		await constantsSchema.findOneAndUpdate({ slug, 'values._id': id }, {$set: {'values.$.description': description }});

		res.json({
			toast: responseMsg.success({ message: 'Done!' }),
			constants: { [constantsDict[slug]]: await constantsModel({ slug }) }
		})
	} catch(err) {
		console.error('/PUT constants', err.message);

		res.status(500).send('Server error');
	}
});

router.post('/meta-data-constants', adminRoute, async (req, res) => {
	const { type, key, value, group, description, url } = req.body;
	try {
		const { errors, isValid } = await validateMetaDataConstants({ type, key, value, group, description, url, add });

	  if (!isValid)
	    return res.status(400).json({ toast: errors });

		await metaDataConstantsSchema.create({ type, key, value, group, description, url });

		res.json({
			toast: responseMsg.success({ message: 'Done!' }),
			constants: { metaData: await metaDataConstantsModel({ admin: true }) }
		});
	} catch(err) {
		console.error('/admin/settings/meta-data-constant', err.message);

		res.status(500).send('Server error');
	}
});

router.put('/meta-data-constants', adminRoute, async (req, res) => {
	const { id, description, url } = req.body;
	try {
		await metaDataConstantsSchema.findOneAndUpdate({ _id: id }, { description, url });

		res.json({
			toast: responseMsg.success({ message: 'Done!' }),
			constants: { metaData: await metaDataConstantsModel({ admin: true }) }
		});
	} catch(err) {
		console.error('/admin/settings/meta-data-constant', err.message);

		res.status(500).send('Server error');
	}
});

module.exports = router;