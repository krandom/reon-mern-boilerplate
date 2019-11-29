import { select, takeLatest, all } from 'redux-saga/effects';
import { privateCall } from './api.saga';
import { sandboxActions } from '../reducers/sandbox.reducer';

function* getExchangeRates() {
	try {
		const endpoint = yield select(s => s.app.endpoints.exchangeRatesApi.latest);
		yield privateCall({ endpoint });
	} catch (e) {}
}

export default function* sandboxSaga() {
	yield all([
		yield takeLatest(sandboxActions.getExchangeRates, getExchangeRates),
	]);
}
