import axios from 'axios';
import { call, select, put } from 'redux-saga/effects';
import { notificationActions } from '../reducers/notification.reducer';

function* toastNotifications(data) {
	try {
		if ('toast' in data) {
			if ('message' in data.toast) {
				yield put(notificationActions.addToast(data.toast));
			} else {
				const toastArr = Object.values(data.toast);

				for (var i = 0; i < toastArr.length; i++)
					yield put(notificationActions.addToast(toastArr[i]));
			}
		}
	} catch (e) {}
}

// private API calls here
// https://github.com/axios/axios/issues/960
function* privateApi({
	endpoint,
	headers = {},
	method = 'post',
	payload = {},
}) {
	try {
		const token = yield select(s => s.app.token);

		let options = {
			headers: {
				Accept: 'application/json',
				ContentType: 'application/x-www-form-urlencoded',
				'Access-Control-Allow-Headers': 'x-access-token',
				...headers,
			},
		};

		if (token)
			axios.defaults.headers['x-auth-token'] = token;

		axios.defaults.headers['clientApp'] = yield select(s => s.app.clientApp);
		axios.defaults.headers['clientEnv'] = yield select(s => s.app.clientEnv);

		let response = null;

		if (['post', 'put'].includes(method)) {
			response = yield call(
				axios[method],
				endpoint,
				payload,
				options,
			);
		} else if (method === 'get') {
			options = {
				...options,
				params: payload,
			};

			response = yield call(
				axios[method],
				endpoint,
				options,
			);
		}

		const { status, data } = response;

		yield toastNotifications(data);

		switch (status) {
			case 200:
				return data;
		}
	} catch (err) {
		const {
			response: { data },
		} = err;
		yield toastNotifications(data);
	}
	// TODO :: use finally to yeald toastnotificaions
}

export const privateCall = (...args) => call(privateApi, ...args);

export default function* axiosSaga() {
	// yield takeLatest(authActions.login, login);
}
