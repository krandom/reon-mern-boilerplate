import { createAction } from 'redux-actions';
import initialState from './initialState';
import formatActionTypeNames from '../helpers/formatActionTypeNames';

const actions = formatActionTypeNames(
	{
		show: 'SHOW',
		hide: 'HIDE',
		add: 'ADD',
		remove: 'REMOVE',
	},
	'MODAL'
);

export const modalActions = {
	show: createAction(actions.show),
	hide: createAction(actions.hide),
	add: createAction(actions.add),
	remove: createAction(actions.remove),
};

export default (state = initialState.modal, action) => {
	const { payload } = action;

	switch (action.type) {
		case actions.show:
			return {
				visible: true,
				windows: [modal(payload)],
			};

		case actions.hide:
			return {
				visible: false,
				windows: [],
			};

		case actions.add:
			return {
				visible: true,
				windows: [...state.windows, modal(payload)],
			};

		case actions.remove:
			return {
				...state,
				visible: state.windows.length < 1 ? false : true,
				windows: state.windows.slice(0, -1),
			};

		default:
			return state;
	}
};

const modal = payload => {
	return {
		id: uuid(),
		component: payload.component,
	};
};
