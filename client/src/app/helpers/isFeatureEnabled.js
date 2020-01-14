import { store } from '../';

/*
	Getting the value of an individual flag,
	if the flag is not present, it will return
	false (off).

	This don't listen to redux state changes so
	use hooks/useFeatureFlag when using feature
	flags in React components.
*/

export default (flag = '') => {
	const featureFlags = store.getState().app.featureFlags;

	if ([flag] in featureFlags)
		return featureFlags[flag];

	return false;
};
