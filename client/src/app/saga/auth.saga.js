import Cookies from 'universal-cookie';

import { select, put, takeLatest, all } from 'redux-saga/effects';
import { privateCall } from './api.saga';
import { history } from '../store/store';

import { authActions } from '../reducers/auth.reducer';
import { notificationActions } from '../reducers/notification.reducer';
import { websocketActions } from '../reducers/websocket.reducer';

function* getUser() {
	try {
		const endpoint = yield select(s => s.config.endpoints.auth.getUser);
		const { user } = yield privateCall({ endpoint });

		yield put(authActions.getUserComplete({ user }));
	} catch (e) {}
}

function* verifyEmail({ payload }) {
	try {
		const endpoint = yield select(s => s.config.endpoints.auth.verifyEmail);
		const { success } = yield privateCall({ endpoint, payload });

		if (success) {
			yield put(
				notificationActions.addToast({
					message: 'Thank you for verifying your email address!',
				})
			);

			if (yield select(s => s.app.isLoggedIn)) yield put(authActions.getUser());
		}
	} catch (e) {}
}

function* requestPwdResetLink({ payload }) {
	try {
		const endpoint = yield select(
			s => s.config.endpoints.auth.requestPwdResetLink
		);
		yield privateCall({ endpoint, payload });
	} catch (e) {}
}

function* resetPassword({ payload }) {
	try {
		const endpoint = yield select(s => s.config.endpoints.auth.resetPassword);
		const { success } = yield privateCall({ endpoint, payload });

		if (success) history.push('/');
	} catch (e) {}
}

function* signup({ payload }) {
	try {
		const endpoint = yield select(s => s.config.endpoints.auth.signup);
		yield privateCall({ endpoint, payload });
	} catch (e) {}
}

function* login({ payload }) {
	try {
		const endpoint = yield select(s => s.config.endpoints.auth.login);
		const response = yield privateCall({ endpoint, payload });

		if (payload.rememberMe)
			new Cookies().set('reon-mern-boilerplate', response.token, { path: '/' });

		yield put(authActions.loginComplete(response));
	} catch (e) {}
}

function* logout() {
	try {
		const cookies = new Cookies();
		cookies.remove('reon-mern-boilerplate', { path: '/' });

		yield put(authActions.logoutComplete());
		yield put(websocketActions.logout());
	} catch (e) {}
}

export default function* authSaga() {
	yield all([
		yield takeLatest(authActions.getUser, getUser),
		yield takeLatest(authActions.verifyEmail, verifyEmail),
		yield takeLatest(authActions.requestPwdResetLink, requestPwdResetLink),
		yield takeLatest(authActions.resetPassword, resetPassword),
		yield takeLatest(authActions.signup, signup),
		yield takeLatest(authActions.login, login),
		yield takeLatest(authActions.logout, logout),
	]);
}
