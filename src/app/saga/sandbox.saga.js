import { call, select, put, takeEvery, takeLatest } from 'redux-saga/effects'

import { publicCall } from './api.saga';

import { sandboxActions } from '../reducers/sandbox.reducer';

function* getExchangeRates() {
	console.log('test')
   try {
		console.log('test 2', yield select(s => s))

    const endpoint = yield select(s => s.app.endpoints.exchangeRatesApi.latest);
		console.log('test 3', endpoint)
		// console.log('test 3', publicCall)

    const response = yield publicCall({endpoint});

		console.log('response', response)
    // yield put(sandboxActions.setExchangeRates({ exchangeRates: [] }));

  } catch (e) {}
}

export default function* sandboxSaga() {
  yield takeLatest(sandboxActions.getExchangeRates, getExchangeRates);
}