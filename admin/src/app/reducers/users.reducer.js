import { createAction } from 'redux-actions';
import initialState from './initialState';
import formatActionTypeNames from '../helpers/formatActionTypeNames';

import { actions as authActionTypes } from './auth.reducer';

export const actions = formatActionTypeNames(
	{
		getAllProfiles: 'GET_ALL_PROFILES',
		getAllProfilesComplete: 'GET_ALL_PROFILES_COMPLETE',
		sendToast: 'SEND_TOAST',
	},
	'USER_PROFILES'
);

export const usersActions = {
	getAllProfiles: createAction(actions.getAllProfiles),
	getAllProfilesComplete: createAction(actions.getAllProfilesComplete),
	sendToast: createAction(actions.sendToast),
};

export default (state = initialState.users, action) => {

	const { payload } = action;

	switch (action.type) {

		case actions.getAllProfilesComplete:
			return {
				...state,
				...payload,
			};

		case authActionTypes.logoutComplete:
			return initialState.users;

		default:
			return state;
	}
};
