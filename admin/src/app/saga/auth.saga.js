import { select, put, takeLatest, all } from 'redux-saga/effects';
import { privateCall } from './api.saga';

import { authActions } from '../reducers/auth.reducer';

function* login({ payload }) {
	try {
		const endpoint = yield select(s => s.config.endpoints.auth.login);
		const response = yield privateCall({ endpoint, payload });

		if (payload.rememberMe)
			localStorage.setItem('token', response.token);

		yield put(authActions.loginComplete(response));
	} catch (e) {}
}

function* getUser() {
	try {
		const endpoint = yield select(s => s.config.endpoints.auth.getUser);
		const { user } = yield privateCall({ endpoint });

		yield put(authActions.getUserComplete({ user }));
	} catch (e) {}
}

function* logout() {
	try {
		localStorage.clear();

		yield put(authActions.logoutComplete());
	} catch (e) {}
}

export default function* authSaga() {
	yield all([
		yield takeLatest(authActions.getUser, getUser),
		yield takeLatest(authActions.login, login),
		yield takeLatest(authActions.logout, logout),
	]);
}
