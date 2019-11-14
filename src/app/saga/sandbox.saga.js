import { call, select, put, takeEvery, takeLatest, all, } from 'redux-saga/effects'

import { publicCall } from './api.saga';

import { sandboxActions } from '../reducers/sandbox.reducer';

function* getExchangeRates() {
   try {
    const endpoint = yield select(s => s.app.endpoints.exchangeRatesApi.latest);
    const response = yield publicCall({ endpoint });
  } catch (e) {}
}

function* signup({ payload }) {
	console.log('try and signup here', payload)
  try {
    const endpoint = yield select(s => s.app.endpoints.auth.signup);
    const response = yield publicCall({ endpoint, payload, method: 'post' });
  } catch (e) {}
}

export default function* sandboxSaga() {
	yield all([
  	yield takeLatest(sandboxActions.getExchangeRates, getExchangeRates),
  	yield takeLatest(sandboxActions.signup, signup),
	]);
}