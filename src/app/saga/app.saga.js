import Cookies from 'universal-cookie';

import { call, select, put, takeEvery, takeLatest } from 'redux-saga/effects'
import { publicCall } from './api.saga';
import { appActions } from '../reducers/app.reducer';

function* boot() {
   try {
		// Look for cookie and log user in if valid
		const cookies = new Cookies();
		let token = cookies.get('reon-mern-boilerplate');
    const endpoint = yield select(s => s.app.endpoints.auth.validateCookie);
    const { user } = yield publicCall({ endpoint, payload: { token }, method: 'post' });

		if (!user) {
			token = null;
			cookies.remove('reon-mern-boilerplate');
		}

		console.log('COOKIE ON BOOT', user);
		console.log('COOKIE ON BOOT', token);

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

      // const endpoint = yield select(s => s.config.endpoints.user.getProfile);
      // const response = yield api({endpoint});

    yield put(appActions.booted({ mainNav, user, token, }));

  } catch (e) {}
}

export default function* appSaga() {
  yield takeLatest(appActions.boot, boot);
}