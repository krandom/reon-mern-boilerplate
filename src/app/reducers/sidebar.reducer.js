import { createAction } from 'redux-actions';
import initialState from './initialState';
import formatActionTypeNames from '../helpers/formatActionTypeNames';

const actions = formatActionTypeNames({
	addPage: 'ADD',
	delPage: 'DEL',
	close: 'CLOSE',
	transition: 'TRANSITION',
}, 'SIDEBAR');

export const sidebarActions = {
  addPage: createAction(actions.addPage),
  delPage: createAction(actions.delPage),
  close: createAction(actions.close),
  transition: createAction(actions.transition),
};

export default (state = initialState.sidebar, action) => {
  const { payload } = action;

	switch(action.type) {

  	case actions.addPage:
  		return ({
        pages: [...state.pages, payload.page],
        position: payload.position || 'left'
      });

  	case actions.delPage:
  		return { ...state, pages: state.pages.slice(0, -1) };

    case actions.close:
      return { ...state, pages: [] };

    case actions.transition:
      return { ...state, transition: payload };

  	default:
    		return state;
	}
}