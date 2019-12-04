import { store } from '../';

export default (flag = '') => {
	const featureFlags = store.getState().app.featureFlags;

	if ([flag] in featureFlags)
		return featureFlags[flag];

	return false;
};
