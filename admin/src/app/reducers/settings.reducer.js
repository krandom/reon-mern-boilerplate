import { createAction } from 'redux-actions';
import initialState from './initialState';
import formatActionTypeNames from '../helpers/formatActionTypeNames';

export const actions = formatActionTypeNames(
	{
		getFeatureFlags: 'GET_FEATURE_FLAGS',
		getFeatureFlagsComplete: 'GET_FEATURE_FLAGS_COMPLETE',
		setFeatureFlags: 'SET_FEATURE_FLAGS',
	},
	'SETTINGS'
);

export const settingsActions = {
	getFeatureFlags: createAction(actions.getFeatureFlags),
	getFeatureFlagsComplete: createAction(actions.getFeatureFlagsComplete),
	setFeatureFlags: createAction(actions.setFeatureFlags),
};

export default (state = initialState.settings, action) => {
	const { payload } = action;

	switch (action.type) {
		case actions.getFeatureFlagsComplete:
			return {
				...state,
				featureFlags: payload,
			};

		default:
			return state;
	}
};
