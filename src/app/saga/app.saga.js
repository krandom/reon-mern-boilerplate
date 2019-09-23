import { call, select, put, takeEvery, takeLatest } from 'redux-saga/effects'
// import { api } from './api.saga';
import { appActions } from '../reducers/app.reducer';

function* boot() {
   try {

		const mainNav = [
			{
				title: 'Home',
				url: '/',
				subnav: null,
				megamenu: null,
				action: null,
				mobile: true,
				published: true,
			},
			{
				title: 'Sandbox',
				url: '/sandbox',
				subnav: null,
				megamenu: null,
				action: null,
				mobile: true,
				published: true,
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
			},
			{
				title: 'Mega Menu',
				url: null,
				subnav: null,
				megamenu: 'libraries',
				action: null,
				mobile: true,
				published: true,
			},
		];

      // const endpoint = yield select(s => s.config.endpoints.user.getProfile);
      // const response = yield api({endpoint});

    yield put(appActions.booted({ mainNav }));

  } catch (e) {}
}

export default function* appSaga() {
  yield takeLatest(appActions.boot, boot);
}