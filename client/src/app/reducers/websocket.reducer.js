import { createAction } from 'redux-actions';
import initialState from './initialState';
import formatActionTypeNames from '../helpers/formatActionTypeNames';

import { actions as appActionTypes, appActions } from './app.reducer';
// import { appActions } from './app.reducer';

import { socket } from '../store/store'; //null;

const actions = formatActionTypeNames(
	{
		connect: 'CONNECT',
		newMessage: 'NEW_MESSAGE',
	},
	'SIDEBAR'
);

export const websocketActions = {
	connect: createAction(actions.connect),
	newMessage: createAction(actions.newMessage, payload => socket),
};

export const setupSocket = (dispatch, username) => {
	const socket = new WebSocket('ws://localhost:5000');
	console.log('SOCK', socket)
	socket.onopen = () => {
		socket.send(JSON.stringify({
			type: 'ADD_USER', //types.ADD_USER,
			name: username,
		}));
	};

	socket.onmessage = (event) => {
		const data = JSON.parse(event.data);
		switch (data.type) {
			case 'ADD_MESSAGE':
				console.log('message got added', data, appActions);
				dispatch(appActions.setFeatureFlags(data));
				// dispatch(messageReceived(data.message, data.author));
				break;
			case 'USERS_LIST':
				console.log('list???');
				// 	dispatch(populateUsersList(data.users));
				break;
			default:
				break;
		}
	};
	console.log('SOCK2', socket)

	return socket;
};


export default (state = initialState.websocket, action) => {
	// const { payload } = action;
	// let socket = null;
	switch (action.type) {

		case appActionTypes.booted:
			// const socket = setupSocket();
			console.log('boot?')
			// socket = setupSocket();
			console.log('sock3', socket)
			// appActions.setFeatureFlags({test:'test'});
			return {
				...state,
				socket: 'test',
			};

		// case actions.newMessage:
			// socket.send(JSON.stringify({ type: 'ADD_MESSAGE', author: 'test' }));

			// console.log('newMessage');
			// return state;

		case actions.connect:
			return state;

		default:
			return state;
	}
};
