import { store } from '../';

export default (flag = '') => {
	const featureFlags = store.getState().app.featureFlags;

	// console.log('mainStore', store.getState())
	console.log('mainStore', featureFlags)
	// if (window.location.href.includes('localhost')) return 'dev';
	if ([flag] in featureFlags)
		return featureFlags[flag];

	return false;
};
