import Cookies from 'universal-cookie';

import { call, select, put, takeEvery, takeLatest, all, } from 'redux-saga/effects'
import { publicCall } from './api.saga';
import { sandboxActions } from '../reducers/sandbox.reducer';
import { notificationActions } from '../reducers/notification.reducer';

function* getExchangeRates() {
   try {
    const endpoint = yield select(s => s.app.endpoints.exchangeRatesApi.latest);
    const response = yield publicCall({ endpoint });
  } catch (e) {}
}

function* signup({ payload }) {
  try {
    const endpoint = yield select(s => s.app.endpoints.auth.signup);
    const response = yield publicCall({ endpoint, payload, method: 'post' });
  } catch (e) {}
}

function* login({ payload }) {
  try {
    const endpoint = yield select(s => s.app.endpoints.auth.login);
    const response = yield publicCall({ endpoint, payload, method: 'post' });

		if (payload.rememberMe)
			new Cookies().set('reon-mern-boilerplate', response.token, { path: '/' });

    yield put(sandboxActions.loginComplete(response));
  } catch (e) {}
}

function* logout({ payload }) {
  try {
    // const endpoint = yield select(s => s.app.endpoints.auth.logout);
    // const response = yield publicCall({ endpoint });

		const cookies = new Cookies();
		cookies.remove('reon-mern-boilerplate');

	console.log('test')
    yield put(sandboxActions.logoutComplete());
  } catch (e) {}
}

export default function* sandboxSaga() {
	yield all([
  	yield takeLatest(sandboxActions.getExchangeRates, getExchangeRates),
  	yield takeLatest(sandboxActions.signup, signup),
  	yield takeLatest(sandboxActions.login, login),
  	yield takeLatest(sandboxActions.logout, logout),
	]);
}