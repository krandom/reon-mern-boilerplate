import { createAction } from 'redux-actions';
import initialState from './initialState';
import formatActionTypeNames from '../helpers/formatActionTypeNames';

const actions = formatActionTypeNames({
	boot: 'BOOT',
	booted: 'BOOTED',
	toggleHamburgerMenu: 'TOGGLE_HAMBURGER_MENU',
}, 'APP');

export const appActions = {
  boot: createAction(actions.boot),
  booted: createAction(actions.booted),
  toggleHamburgerMenu: createAction(actions.toggleHamburgerMenu),
};

export default (state = initialState.app, action) => {
  const { payload } = action;

  switch (action.type) {

    case actions.booted:
    	const { mainNav } = payload;

    	return {
        ...state,
        mainNav,
        booted: true,
      };

		case actions.toggleHamburgerMenu:

			return {
				...state,
				showHamburgerMenu: payload,
			};

    default:
      return state;
  	}
}