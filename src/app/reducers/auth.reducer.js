import { createAction } from 'redux-actions';
import initialState from './initialState';
import formatActionTypeNames from '../helpers/formatActionTypeNames';

import { actions as appActions } from './app.reducer';
import { actions as sandboxActions } from './sandbox.reducer';

export const actions = formatActionTypeNames({
	verifyEmail: 'VERIFY_EMAIL',
	getUser: 'GET_USER',
	userFetched: 'USER_FETCHED',
	resetPassword: 'RESET_PASSWORD',
	requestPwdResetLink: 'REQUEST_PWD_RESET_LINK',
}, 'AUTH');

export const authActions = {
  verifyEmail: createAction(actions.verifyEmail),
  getUser: createAction(actions.getUser),
  userFetched: createAction(actions.userFetched),
  resetPassword: createAction(actions.resetPassword),
  requestPwdResetLink: createAction(actions.requestPwdResetLink),
};

export default (state = {}, action) => {
  const { payload } = action;

  switch (action.type) {

		case actions.userFetched:
			return {
				...state,
				user: payload.user,
			};

		case appActions.booted:
			return {
				...state,
				user: payload.user,
			};

		case sandboxActions.loginComplete:
			return {
				...state,
				user: payload.user,
			};

    default:
      return state;
  }
}