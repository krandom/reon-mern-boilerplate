import axios from 'axios';
import { call, select, put, takeEvery, takeLatest } from 'redux-saga/effects'
import { notificationActions } from '../reducers/notification.reducer';

// private API calls here
// https://github.com/axios/axios/issues/960
function* privateApi({
  endpoint,
  headers = {},
  method = 'post',
  payload = {},
}) {
	try {
		let options = {
			headers: {
	      'Accept': 'application/json',
	      'ContentType': 'application/x-www-form-urlencoded',
	      'Access-Control-Allow-Headers': 'x-access-token',
	      ...headers,
			},
		}

		const token = yield select(s => s.app.token)
		if (token) {
			options.headers = {
				...options.headers,
	      'x-auth-token': token,
			}
		}

    const { status, data } = yield call(
    	axios[method],
    	endpoint,
      payload,
      options,
    );

    switch (status)
    {
      case 200:
		    if ('toast' in data) {
		    	if ('message' in data.toast) {
						yield put(notificationActions.addToast(data.toast));
		    	} else {
			    	const toastArr = Object.values(data.toast);

			    	for (var i=0; i<toastArr.length; i++)
			    		yield put(notificationActions.addToast(toastArr[i]) )
		    	}
		    }

        return data;
        break;
    }

  } catch (err) {
    const { response, response: { data } } = err;

    if ('toast' in data) {
    	if ('message' in data.toast) {
				yield put(notificationActions.addToast(data.toast));
    	} else {
	    	const toastArr = Object.values(data.toast);

	    	for (var i=0; i<toastArr.length; i++)
	    		yield put(notificationActions.addToast(toastArr[i]) )
	    }
    }
  }
};

export const privateCall = (...args) => call(privateApi, ...args);

export default function* axiosSaga() {
  // yield takeLatest(authActions.login, login);
}