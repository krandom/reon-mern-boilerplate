import { createAction } from 'redux-actions';
import initialState from './initialState';
import formatActionTypeNames from '../helpers/formatActionTypeNames';

import { actions as authActions } from './auth.reducer';

export const actions = formatActionTypeNames(
	{
		getConstants: 'GET_CONSTANTS',
		getConstantsComplete: 'GET_CONSTANTS_COMPLETE',
		setConstants: 'SET_CONSTANTS',
		getFeatureFlags: 'GET_FEATURE_FLAGS',
		getFeatureFlagsComplete: 'GET_FEATURE_FLAGS_COMPLETE',
		setFeatureFlags: 'SET_FEATURE_FLAGS',
		getMetaData: 'GET_META_DATA',
		getMetaDataComplete: 'GET_META_DATA_COMPLETE',
		setMetaData: 'SET_META_DATA',
		setMetaDataConstants: 'SET_META_DATA_CONSTANTS',
	},
	'SETTINGS'
);

export const settingsActions = {
	getConstants: createAction(actions.getConstants),
	getConstantsComplete: createAction(actions.getConstantsComplete),
	setConstants: createAction(actions.setConstants),

	getFeatureFlags: createAction(actions.getFeatureFlags),
	getFeatureFlagsComplete: createAction(actions.getFeatureFlagsComplete),
	setFeatureFlags: createAction(actions.setFeatureFlags),

	getMetaData: createAction(actions.getMetaData),
	getMetaDataComplete: createAction(actions.getMetaDataComplete),
	setMetaData: createAction(actions.setMetaData),
	setMetaDataConstants: createAction(actions.setMetaDataConstants),
};

export default (state = initialState.settings, action) => {
	const { payload } = action;

	switch (action.type) {
		// case actions.booted:
		// 	return {
		// 		...state,
		// 		constants: payload.constants,
		// 	};

		case actions.getFeatureFlagsComplete:
			return {
				...state,
				featureFlags: payload,
			};

		case actions.getConstantsComplete:
			return {
				...state,
				constants: {
					...state.constants,
					...payload,
				},
			};

		case actions.getMetaDataComplete:
			return {
				...state,
				metaData: payload,
			};

		default:
			return state;
	}
};
