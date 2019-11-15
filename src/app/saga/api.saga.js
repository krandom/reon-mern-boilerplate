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
  header = {},
  method = 'get',
  payload: data = {},
}) {
	console.log('data', data)
	try {
    const header = {
      Accept: 'application/json',
      ContentType: 'application/x-www-form-urlencoded',
      ...header,
    };

    // const options = {
    //   withCredentials: true,
    //   validateStatus: (status) => {
    //     return (status === 200 || status === 400)
    //   }
    // }
    // const response = yield call(apiCall({method, endpoint, data, header }))
    const response = yield call(axios[method], endpoint, {
      data,
      header,
    });
    console.log('here at all???')
    console.log('response', response)

    let returnObj = {};
    switch (response.status)
    {
      case 200:
        return response.data;
        break;

      case 400:
      console.log('400')
        yield call(notificationActions.addToast({ type: error, message: 'error' }));
        break;
    }

  } catch (err) {
    // console.log('catch it here', response)
    console.log('catch it here', err, err.response)
    // yield put({type: "USER_FETCH_FAILED", message: e.message});
  }
};

export const publicCall = (...args) => call(publicApi, ...args);

export default function* axiosSaga() {
  // yield takeLatest(authActions.login, login);
}