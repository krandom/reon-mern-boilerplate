
import { call, select, put, takeEvery, takeLatest, all, } from 'redux-saga/effects'
import { publicCall } from './api.saga';
import { sandboxActions } from '../reducers/sandbox.reducer';

function* getExchangeRates() {
   try {
    const endpoint = yield select(s => s.app.endpoints.exchangeRatesApi.latest);
    const response = yield publicCall({ endpoint });
  } catch (e) {}
}

export default function* sandboxSaga() {
	yield all([
  	yield takeLatest(sandboxActions.getExchangeRates, getExchangeRates),
	]);
}