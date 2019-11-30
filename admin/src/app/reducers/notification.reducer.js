import { createAction } from 'redux-actions';
import initialState from './initialState';
import formatActionTypeNames from '../helpers/formatActionTypeNames';

const actions = formatActionTypeNames(
	{
		addToast: 'ADD_TOAST',
		removeToast: 'REMOVE_TOAST',
	},
	'NOTIFICATION'
);

export const notificationActions = {
	addToast: createAction(actions.addToast),
	removeToast: createAction(actions.removeToast),
};

export default (state = initialState.notification, action) => {
	const { payload } = action;

	switch (action.type) {
		case actions.addToast:
			return {
				...state,
				toast: [
					...state.toast,
					{
						ID: payload.ID || uuid(),
						type: payload.type || 'success',
						sticky: payload.sticky || false,
						pauseOnHover: payload.pauseOnHover || true,
						timer: payload.timer || 5000,
						visible: true,
						message: payload.message || '',
						timestamp: moment(),
					},
				],
			};

		case actions.removeToast:
			return {
				...state,
				toast: state.toast.map(x => {
					if (x.ID === payload) x.visible = false;

					return x;
				}),
			};

		default:
			return state;
	}
};
