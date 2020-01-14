import { select, put, takeLatest } from 'redux-saga/effects';
import { privateCall } from './api.saga';
import { usersActions } from '../reducers/users.reducer';
import { normalizeUsers } from '../normalizer/users.normalizer';

function* getAllProfiles() {
	try {
		console.log('get all actions')
		// Look for cookie and log user in if valid
		const endpoint = yield select(s => s.config.endpoints.userProfiles.getAllProfiles);
		let { users } = yield privateCall({ endpoint, method: 'get' });

		yield put(usersActions.getAllProfilesComplete(normalizeUsers(users)))
		// console.log('res', users)
		// users = ;

		// console.log('normaliser', users)
		// console.log('RESPONSE', response);

		// const { user } = yield privateCall({ endpoint, payload: { token } });

		// if (!user) {
			// token = null;
			// cookies.remove('reon-mern-boilerplate-admin');
		// }

		// const endpoint = yield select(s => s.config.endpoints.user.getProfile);
		// const response = yield api({endpoint});

		// yield put(userProfileActions.booted({  user, token }));
	} catch (e) {}
}

function* sendToast({ payload }) {
	try {
		console.log('sendToastsendToastsendToastsendToastsendToastsendToast')
		// Look for cookie and log user in if valid
		// let endpoint = yield select(s => s.config.endpoints.userProfiles.sendToast);
		// let response = yield privateCall({ endpoint, payload });

		let endpoint = yield select(s => s.config.endpoints.userProfiles.sendToast);
		let response = yield privateCall({ endpoint, method: 'post' , payload });

		// yield put(usersActions.getAllProfilesComplete(normalizeUsers(users)))
		// console.log('res', users)
		// users = ;

		// console.log('normaliser', users)
		console.log('RESPONSE', response);

		// const { user } = yield privateCall({ endpoint, payload: { token } });

		// if (!user) {
			// token = null;
			// cookies.remove('reon-mern-boilerplate-admin');
		// }

		// const endpoint = yield select(s => s.config.endpoints.user.getProfile);
		// const response = yield api({endpoint});

		// yield put(userProfileActions.booted({  user, token }));
	} catch (e) {}
}

function* test({ payload }) {
	try {
		console.log('sendToastsendToastsendToastsendToastsendToastsendToast')
		// Look for cookie and log user in if valid
		// let endpoint = yield select(s => s.config.endpoints.userProfiles.sendToast);
		// let response = yield privateCall({ endpoint, payload });

		let endpoint = yield select(s => s.config.endpoints.userProfiles.test);
		let response = yield privateCall({ endpoint, method: 'get' });

		// yield put(usersActions.getAllProfilesComplete(normalizeUsers(users)))
		// console.log('res', users)
		// users = ;

		// console.log('normaliser', users)
		console.log('RESPONSE', response);

		// const { user } = yield privateCall({ endpoint, payload: { token } });

		// if (!user) {
			// token = null;
			// cookies.remove('reon-mern-boilerplate-admin');
		// }

		// const endpoint = yield select(s => s.config.endpoints.user.getProfile);
		// const response = yield api({endpoint});

		// yield put(userProfileActions.booted({  user, token }));
	} catch (e) {}
}

export default function* userProfilesSaga() {
	yield takeLatest(usersActions.getAllProfiles, getAllProfiles);
	yield takeLatest(usersActions.sendToast, sendToast);
	yield takeLatest(usersActions.test, test);
}
