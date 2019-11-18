import { createAction } from 'redux-actions';
import initialState from './initialState';
import formatActionTypeNames from '../helpers/formatActionTypeNames';

export const actions = formatActionTypeNames({
	signup: 'SIGNUP',
	login: 'LOGIN',
	loginComplete: 'LOGIN_COMPLETE',
	logout: 'LOGOUT',
	logoutComplete: 'LOGOUT_COMPLETE',
	getExchangeRates: 'GET_EXCHANGE_RATES',
	setExchangeRates: 'SET_EXCHANGE_RATES',
}, 'SANDBOX');

export const sandboxActions = {
	signup: createAction(actions.signup),
	login: createAction(actions.login),
	loginComplete: createAction(actions.loginComplete),
	logout: createAction(actions.logout),
	logoutComplete: createAction(actions.logoutComplete),
  getExchangeRates: createAction(actions.getExchangeRates),
  setExchangeRates: createAction(actions.setExchangeRates),
};

export default (state = initialState.sandbox, action) => {
  const { payload } = action;

  switch (action.type) {

    case actions.setExchangeRates:
    	const { exchangeRates } = payload;

    	return {
        ...state,
        exchangeRates,
      };

    default:
      return state;
  	}
}