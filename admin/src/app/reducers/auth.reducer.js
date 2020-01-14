import { createAction } from 'redux-actions';
import initialState from './initialState';
import formatActionTypeNames from '../helpers/formatActionTypeNames';

import { actions as appActions } from './app.reducer';

export const actions = formatActionTypeNames(
	{
		getUser: 'GET_USER',
		getUserComplete: 'GET_USER_COMPLETE',
		login: 'LOGIN',
		loginComplete: 'LOGIN_COMPLETE',
		logout: 'LOGOUT',
		logoutComplete: 'LOGOUT_COMPLETE',
	},
	'AUTH'
);

export const authActions = {
	getUser: createAction(actions.getUser),
	getUserComplete: createAction(actions.getUserComplete),
	login: createAction(actions.login),
	loginComplete: createAction(actions.loginComplete),
	logout: createAction(actions.logout),
	logoutComplete: createAction(actions.logoutComplete),
};

export default (state = initialState.auth, action) => {
	const { payload } = action;

	switch (action.type) {
		case appActions.booted:
			return {
				...state,
				user: payload.user,
			};

		case actions.getUserComplete:
			return {
				...state,
				user: payload.user,
			};

		case actions.loginComplete:
			return {
				...state,
				user: payload.user,
			};

		case actions.logoutComplete:
			return initialState.auth;

		default:
			return state;
	}
};
