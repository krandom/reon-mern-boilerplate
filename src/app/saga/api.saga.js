import { call, select, put, takeEvery, takeLatest } from 'redux-saga/effects'
// import Api from '...'
// import { authActions } from '../reducers/auth.reducer';
import axios from 'axios';

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

// public API calls here
function* publicApi({ method = 'get', endpoint, payload = {}, }) {
	try {
    const response = yield call(axios[method], endpoint, /*payload, */);

    let returnObj = {};
    switch (response.status)
    {
      case 200:
      case 400:
        return response.data;
        break;
    }

  } catch (e) {
    // yield put({type: "USER_FETCH_FAILED", message: e.message});
  }
};

export const publicCall = (...args) => call(publicApi, ...args);

export default function* axiosSaga() {
  // yield takeLatest(authActions.login, login);
}