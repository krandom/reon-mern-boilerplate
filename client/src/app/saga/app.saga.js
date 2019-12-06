import Cookies from 'universal-cookie';

import { select, put, takeLatest, all } from 'redux-saga/effects';
import { privateCall } from './api.saga';
import { appActions } from '../reducers/app.reducer';

function* boot() {
	const cookies = new Cookies();

	try {
		let endpoint = yield select(s => s.config.endpoints.app.boot);
		const {
			isLoggedIn,
			token,
			user,
			profile,
			featureFlags,
			metaData,
		} = yield privateCall({ endpoint, method: 'get' });

		if (!token)
			cookies.remove('reon-mern-boilerplate-admin');

		// move to mongodb
		// make published by environment
		// { environment: 'dev', value: true/false }
		// missing = false
		// default Date
		// date > now = false
		const mainNav = [
			{
				title: 'Home',
				url: '/',
				subnav: null,
				megamenu: null,
				action: null,
				mobile: true,
				published: true,
				icon: 'home',
			},
			{
				title: 'Sandbox',
				url: '/sandbox',
				subnav: [
					{
						title: 'Authentication',
						url: '/sandbox/auth',
						subnav: null,
						megamenu: null,
						action: null,
					},
				],
				megamenu: null,
				action: null,
				mobile: true,
				published: true,
				icon: 'image',
			},
			{
				title: 'Dropdown',
				url: null,
				subnav: [
					{
						title: 'SurviveJS',
						url: 'https://survivejs.com/',
						subnav: null,
						megamenu: null,
						action: null,
					},
					{
						title: 'Link 2',
						url: null,
						subnav: null,
						megamenu: null,
						action: null,
					},
					{
						title: 'Link 3',
						url: 'link3',
						subnav: null,
						megamenu: null,
						action: null,
					},
					{
						title: 'Link 4',
						url: 'link4',
						subnav: null,
						megamenu: null,
						action: null,
					},
				],
				megamenu: null,
				action: null,
				mobile: true,
				published: true,
				icon: 'caret-down',
			},
			{
				title: 'Mega Menu',
				url: null,
				subnav: null,
				megamenu: 'libraries',
				action: null,
				mobile: false,
				published: true,
			},
		];

		yield put(appActions.booted({ mainNav, user, profile, token, featureFlags, isLoggedIn, metaData }));
	} catch(e) {}

	// try {
	// 	// Look for cookie and log user in if valid
	// 	let token = cookies.get('reon-mern-boilerplate');

	// 	let endpoint = yield select(s => s.config.endpoints.auth.validateCookie);

	// 	// BUNDLE CALLS HERE
	// 	// validate token will return auth info
	// 	// boot call will return public info
	// 	// make separate boot calls for admin/client called 'boot.js'
	// 	// TODO :: make boot call after validate token to grab all data needed to start up app
	// 	// TODO :: move user and profile here instead of validateCookie call

	// 	const { user } = yield privateCall({ endpoint, payload: { token } });

	// 	if (!user) {
	// 		token = null;
	// 		cookies.remove('reon-mern-boilerplate');
	// 	}

	// 	endpoint = yield select(s => s.config.endpoints.app.featureFlags);
	// 	const { featureFlags } = yield privateCall({ endpoint });

	// 	endpoint = yield select(s => s.config.endpoints.app.metaData);
	// 	const { metaData } = yield privateCall({ endpoint });

	// 	// move to mongodb
	// 	// make published by environment
	// 	// { environment: 'dev', value: true/false }
	// 	// missing = false
	// 	// default Date
	// 	// date > now = false
	// 	const mainNav = [
	// 		{
	// 			title: 'Home',
	// 			url: '/',
	// 			subnav: null,
	// 			megamenu: null,
	// 			action: null,
	// 			mobile: true,
	// 			published: true,
	// 			icon: 'home',
	// 		},
	// 		{
	// 			title: 'Sandbox',
	// 			url: '/sandbox',
	// 			subnav: [
	// 				{
	// 					title: 'Authentication',
	// 					url: '/sandbox/auth',
	// 					subnav: null,
	// 					megamenu: null,
	// 					action: null,
	// 				},
	// 			],
	// 			megamenu: null,
	// 			action: null,
	// 			mobile: true,
	// 			published: true,
	// 			icon: 'image',
	// 		},
	// 		{
	// 			title: 'Dropdown',
	// 			url: null,
	// 			subnav: [
	// 				{
	// 					title: 'SurviveJS',
	// 					url: 'https://survivejs.com/',
	// 					subnav: null,
	// 					megamenu: null,
	// 					action: null,
	// 				},
	// 				{
	// 					title: 'Link 2',
	// 					url: null,
	// 					subnav: null,
	// 					megamenu: null,
	// 					action: null,
	// 				},
	// 				{
	// 					title: 'Link 3',
	// 					url: 'link3',
	// 					subnav: null,
	// 					megamenu: null,
	// 					action: null,
	// 				},
	// 				{
	// 					title: 'Link 4',
	// 					url: 'link4',
	// 					subnav: null,
	// 					megamenu: null,
	// 					action: null,
	// 				},
	// 			],
	// 			megamenu: null,
	// 			action: null,
	// 			mobile: true,
	// 			published: true,
	// 			icon: 'caret-down',
	// 		},
	// 		{
	// 			title: 'Mega Menu',
	// 			url: null,
	// 			subnav: null,
	// 			megamenu: 'libraries',
	// 			action: null,
	// 			mobile: false,
	// 			published: true,
	// 		},
	// 	];

	// 	// const endpoint = yield select(s => s.config.endpoints.user.getProfile);
	// 	// const response = yield api({endpoint});

	// 	yield put(appActions.booted({ mainNav, user, token, featureFlags }));
	// } catch (e) {}
}

function* getFeatureFlags() {
	try {
		const endpoint = yield select(s => s.config.endpoints.app.featureFlags);
		const { featureFlags } = yield privateCall({ endpoint });

		yield put(appActions.getFeatureFlagsComplete(featureFlags));
	} catch (e) {}
}

export default function* appSaga() {
	yield all([
		yield takeLatest(appActions.boot, boot),
		yield takeLatest(appActions.getFeatureFlags, getFeatureFlags),
	]);
}
