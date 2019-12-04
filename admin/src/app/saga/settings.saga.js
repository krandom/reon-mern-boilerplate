import { select, takeLatest, all, put } from 'redux-saga/effects';
import { privateCall } from './api.saga';
import { settingsActions } from '../reducers/settings.reducer';

function* getFeatureFlags() {
	try {
		const endpoint = yield select(s => s.config.endpoints.settings.featureFlags);
		const { featureFlags } = yield privateCall({ endpoint, method: 'get' });

		yield put(settingsActions.getFeatureFlagsComplete(featureFlags));
	} catch (e) {}
}

function* setFeatureFlags({ payload }) {
	try {
		const endpoint = yield select(s => s.config.endpoints.settings.featureFlags);
		// TODO :: send id, if null, then post
		const { featureFlags } = yield privateCall({ endpoint, payload, method: payload.add ? 'post' : 'put' });

		yield put(settingsActions.getFeatureFlagsComplete(featureFlags));
	} catch (e) {}
}

function* getConstants() {
	try {
		const endpoint = yield select(s => s.config.endpoints.settings.constants);
		const { constants } = yield privateCall({ endpoint, method: 'get' });

		yield put(settingsActions.getConstantsComplete(constants));
	} catch (e) {}
}

function* setConstants({ payload }) {
	// TODO :: send id, if null, then post
	try {
		const endpoint = yield select(s => s.config.endpoints.settings.constants);
		const { constants } = yield privateCall({
			endpoint,
			method: payload.add ? 'post' : 'put',
			payload,
		});

		yield put(settingsActions.getConstantsComplete(constants));
	} catch (e) {}
}

function* setMetaDataConstants({ payload }) {
	// TODO :: send id, if null, then post
	try {
		const endpoint = yield select(s => s.config.endpoints.settings.metaDataConstants);
		const { constants } = yield privateCall({
			endpoint,
			method: payload.add ? 'post' : 'put',
			payload,
		});

		yield put(settingsActions.getConstantsComplete(constants));
	} catch (e) {}
}

export default function* settingsSaga() {
	yield all([
		yield takeLatest(settingsActions.getFeatureFlags, getFeatureFlags),
		yield takeLatest(settingsActions.setFeatureFlags, setFeatureFlags),
		yield takeLatest(settingsActions.getConstants, getConstants),
		yield takeLatest(settingsActions.setConstants, setConstants),
		yield takeLatest(settingsActions.setMetaDataConstants, setMetaDataConstants),
	]);
}
