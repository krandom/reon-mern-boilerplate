import { createAction } from 'redux-actions';
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
		requestPwdResetLink: 'REQUEST_PWD_RESET_LINK',
		resetPassword: 'RESET_PASSWORD',
		signup: 'SIGNUP',
		verifyEmail: 'VERIFY_EMAIL',
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
	signup: createAction(actions.signup),
	requestPwdResetLink: createAction(actions.requestPwdResetLink),
	resetPassword: createAction(actions.resetPassword),
	verifyEmail: createAction(actions.verifyEmail),
};

export default (state = {}, action) => {
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

		default:
			return state;
	}
};
