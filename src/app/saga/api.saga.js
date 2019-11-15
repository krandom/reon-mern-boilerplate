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

const apiCall = ({ method, endpoint, payload, }) => {
    return axios.post(endpoint, {
      payload // only if not an object. Otherwise don't use outer {},
    },
    // headerParams: headerParams,
   ).then(response => response.data)
    .catch(err => {
      throw err;
    });
  }

// public API calls here
function* publicApi({ method = 'get', endpoint, payload = {}, }) {
  console.log('payload', payload)
	try {
    // const response = yield call(
    //   axios[method](endpoint)
    // );
    // const response = yield call(apiCall({method, endpoint, payload}));
    const options = {};

      // const response = yield call(axios[method], endpoint, {
      //   // data: payload,
      //   // ...options,
      //   headers: {'Content-Type': 'application/json'}
      // });

    // const response = yield call(axios['post'], endpoint, {}, {'Content-Type': 'application/json'});

    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    }

    const body = JSON.stringify({ "test":"test" })

    const res = axios.post(endpoint, body, config);
    console.log('response', response)
    console.log('res', res)
    // axios.post(endpoint
    // // headerParams: headerParams,
    // ).then(response => response.data)
    //   .catch(err => {
    //     throw err;
    // });

    // // console.log('response', response);
    // const response = yield call(
    //   axios({
    //     method,
    //     url: endpoint,
    //     headers: {},
    //     data: {
    //       foo: 'bar', // This is the body part
    //     }
    //   })
    // );

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