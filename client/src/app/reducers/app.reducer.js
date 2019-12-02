import { createAction } from 'redux-actions';
import initialState from './initialState';
import formatActionTypeNames from '../helpers/formatActionTypeNames';

import { actions as authActionTypes } from './auth.reducer';

export const actions = formatActionTypeNames(
	{
		boot: 'BOOT',
		booted: 'BOOTED',
		setFeatureFlags: 'SET_FEATURE_FLAGS',
		toggleHamburgerMenu: 'TOGGLE_HAMBURGER_MENU',
	},
	'APP'
);

export const appActions = {
	boot: createAction(actions.boot),
	booted: createAction(actions.booted),
	setFeatureFlags: createAction(actions.setFeatureFlags),
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

		case actions.setFeatureFlags:
			console.log('set setFeatureFlags')
			return {
				...state,
				setFeatureFlags: payload,
			};

		case actions.toggleHamburgerMenu:
			return {
				...state,
				showHamburgerMenu: payload || !state.showHamburgerMenu,
			};

		case authActionTypes.loginComplete:
			return {
				...state,
				isLoggedIn: true,
				token: payload.token,
			};

		case authActionTypes.logoutComplete:
			return initialState.app;

		default:
			return state;
	}
};
