import { createAction } from 'redux-actions';
import initialState from './initialState';
import formatActionTypeNames from '../helpers/formatActionTypeNames';

import { actions as authActions } from './auth.reducer';

export const actions = formatActionTypeNames(
	{
		boot: 'BOOT',
		booted: 'BOOTED',
		toggleHamburgerMenu: 'TOGGLE_HAMBURGER_MENU',
	},
	'APP'
);

export const appActions = {
	boot: createAction(actions.boot),
	booted: createAction(actions.booted),
	toggleHamburgerMenu: createAction(actions.toggleHamburgerMenu),
};

export default (state = initialState.app, action) => {
	const { payload } = action;
	switch (action.type) {
		case actions.booted:
			return {
				...state,
				mainNav: payload.mainNav,
				token: payload.token,
				booted: true,
				isLoggedIn: payload.token ? true : false,
			};

		case actions.toggleHamburgerMenu:
			return {
				...state,
				toggleHamburgerMenu: uuid(),
			};

		case authActions.loginComplete:
			return {
				...state,
				isLoggedIn: true,
				token: payload.token,
			};

		case authActions.logoutComplete:
			return initialState.app;

		default:
			return state;
	}
};
