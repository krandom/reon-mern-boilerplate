import { select, takeLatest, all, put } from 'redux-saga/effects';
import { privateCall } from './api.saga';
import { settingsActions } from '../reducers/settings.reducer';

function* getFeatureFlags() {
	try {
		const endpoint = yield select(s => s.config.endpoints.settings.featureFlags);
		const { featureFlags } = yield privateCall({ endpoint });

		yield put(settingsActions.getFeatureFlagsComplete(featureFlags));
	} catch (e) {}
}

function* setFeatureFlags({ payload }) {
	try {
		const endpoint = yield select(s => s.config.endpoints.settings.setFeatureFlags);
		const { featureFlags } = yield privateCall({ endpoint, payload });

		yield put(settingsActions.getFeatureFlagsComplete(featureFlags));
	} catch (e) {}
}

export default function* settingsSaga() {
	yield all([
		yield takeLatest(settingsActions.getFeatureFlags, getFeatureFlags),
		yield takeLatest(settingsActions.setFeatureFlags, setFeatureFlags),
	]);
}
