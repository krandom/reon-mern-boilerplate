import { call, select, put, takeEvery, takeLatest } from 'redux-saga/effects'
// import Api from '...'
// import { authActions } from '../reducers/auth.reducer';
import axios from 'axios';
import { notificationActions } from '../reducers/notification.reducer';

// worker Saga: will be fired on USER_FETCH_REQUESTED actions
export function api({ type = 'private', method = 'post', endpoint, payload = {} }) { //

  console.log('-------------------------------', method, endpoint, payload) //

  const loaderObj = {
    ID: payload.apiID || uuid(),
    endpoint,
    time: {
      end: null,
      start: moment(),
      total: null,
    },
  };

  return call(
    type === 'private' ? privateApiCall : publicApiCall,
    {
      method,
      type,
      endpoint,
      payload,
      loaderObj,
    }
  );
}


// calls to your own server here
function* privateApiCall({ type, method, endpoint, payload, loaderObj, }) {
console.log('2222222222222222222')
  if (type === 'private') {
    // TODO :: do all the private addons here

    // adding sessionID to identify user
    payload.sessionID = yield select(s => s.app.sessionID);
  }

  try {

    // TODO :: add loader obj to store here
    // payload is not present due to COORS issues on mock server
    const response = yield call(axios[method], endpoint, /*payload, */);
    const result = response.data;

    // https://restfulapi.net/http-status-codes/
    let returnObj = {};
    switch (response.status)
    {
      case 200:
      case 400:
        returnObj = result.data;
        break;
    }



    // TODO :: remove loader obj to store here
    return returnObj;

  } catch (e) {
    // yield put({type: "USER_FETCH_FAILED", message: e.message});
  }
};

const apiCall = ({ method, endpoint, data, header}) => {
  console.log('test """"""""""""""', method)

    const options = {
      // withCredentials: true,
      validateStatus: function(status) {
        return true
      }
    }

  return axios.post('//localhost:5000/api/auth/signup', data, header, options)
    .then(res => {
      console.log('THEN', res);
    })
    .catch(err => {
      console.log('ERR', err, err.response);
      return err.response
    });

  // return axios.post(endpoint, {
    // data,
    // header, // only if not an object. Otherwise don't use outer {},
  // },
  // headerParams: headerParams,
 // )
}

// public API calls here
// https://github.com/axios/axios/issues/960
function* publicApi({
  endpoint,
  headers = {},
  method = 'get',
  payload: data = {},
}) {
	try {
		const token = yield select(s => s.app.token)

		let options = {
			headers: {
	      'Accept': 'application/json',
	      'ContentType': 'application/x-www-form-urlencoded',
	      'Access-Control-Allow-Headers': 'x-access-token',
	      ...headers,
			}
		}

		if (token) {
			options.headers = {
				...options.headers,
	      'Authorization': 'Bearer ' + token,
	      'x-auth-token': token,
			}
		}

    let headers = {
      Accept: 'application/json',
      ContentType: 'application/x-www-form-urlencoded',
      ...headers,
    };

    if (token)
			headers = {
				...headers,
      	'Authorization': 'Bearer ' + token,
			};

		console.log('HEADER', header)
    const response = yield call(axios[method], endpoint,
      data,
      options,
    );

    switch (response.status)
    {
      case 200:
        return response.data;
        break;
    }

  } catch (err) {
    const { response, response: { data } } = err;

    if ('errors' in data) {
    	const notificationsArr = Object.values(data.errors);

    	for (var i=0; i<notificationsArr.length; i++)
    		yield put(notificationActions.addToast(notificationsArr[i]) )
    }
  }
};

export const publicCall = (...args) => call(publicApi, ...args);

export default function* axiosSaga() {
  // yield takeLatest(authActions.login, login);
}