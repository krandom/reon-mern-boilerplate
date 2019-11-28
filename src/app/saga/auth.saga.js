import { call, select, put, takeEvery, takeLatest, all, } from 'redux-saga/effects'
import { publicCall } from './api.saga';

import { authActions } from '../reducers/auth.reducer';
import { notificationActions } from '../reducers/notification.reducer';

function* getUser() {
  try {
    const endpoint = yield select(s => s.app.endpoints.auth.getUser);
    const { user } = yield publicCall({ method: 'post', endpoint });

		yield put(authActions.userFetched({ user }))
  } catch (e) {}
}

function* verifyEmail({ payload }) {
  try {
    const endpoint = yield select(s => s.app.endpoints.auth.verifyEmail);
    const { success } = yield publicCall({ method: 'post', endpoint, payload });

		if (success) {
			yield put(notificationActions.addToast({
				message: 'Thank you for verifying your email address!',
			}));

			if (yield select(s => s.app.isLoggedIn))
				yield put(authActions.getUser())
		}
  } catch (e) {}
}

function* resetPassword({ payload }) {
  try {
    const endpoint = yield select(s => s.app.endpoints.auth.resetPassword);
    const { user } = yield publicCall({ method: 'post', endpoint, payload });

		// yield put(authActions.userFetched({ user }))
  } catch (e) {}
}

export default function* authSaga() {
	yield all([
  	yield takeLatest(authActions.getUser, getUser),
  	yield takeLatest(authActions.verifyEmail, verifyEmail),
  	yield takeLatest(authActions.resetPassword, resetPassword),
	]);
}