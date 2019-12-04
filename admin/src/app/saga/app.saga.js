import Cookies from 'universal-cookie';

import { select, put, takeLatest } from 'redux-saga/effects';
import { privateCall } from './api.saga';
import { appActions } from '../reducers/app.reducer';

function* boot() {
	try {
		// Look for cookie and log user in if valid
		const cookies = new Cookies();
		let token = cookies.get('reon-mern-boilerplate-admin');
		let endpoint = yield select(s => s.config.endpoints.auth.validateCookie);
		const { user } = yield privateCall({ endpoint, payload: { token } });

		if (!user) {
			token = null;
			cookies.remove('reon-mern-boilerplate-admin');
		}

		// TODO :: make boot call after validate token to grab all data needed to start up app
		// TODO :: move user and profile here instead of validateCookie call
		endpoint = yield select(s => s.config.endpoints.app.featureFlags);
		const { featureFlags } = yield privateCall({
			endpoint,
			payload: {
				app: 'admin',
				environment: yield select(s => s.app.environment),
			},
		});

		// endpoint = yield select(s => s.config.endpoints.settings.constants);
		// const { constants } = yield privateCall({ endpoint, method: 'get' });

		// const endpoint = yield select(s => s.config.endpoints.user.getProfile);
		// const response = yield api({endpoint});

		yield put(appActions.booted({ user, token, featureFlags }));
	} catch (e) {}
}

export default function* appSaga() {
	yield takeLatest(appActions.boot, boot);
}