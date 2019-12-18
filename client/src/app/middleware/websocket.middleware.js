import { actions as appActionTypes, appActions } from '../reducers/app.reducer';
import { notificationActions } from '../reducers/notification.reducer';

export const setupSocket = (store) => {
	const { dispatch, getState } = store;
	const { app, websocket, config } = getState();

	const socket = new WebSocket(config.websocket);

	socket.onopen = () => {
		socket.send(JSON.stringify({
			type: 'CONNECT',
			websocketID: websocket.websocketID,
			clientApp: app.clientApp,
			clientEnv: app.clientEnv,
		}));
	};

	// socket.onclose = () => {
		// console.log('SOCET IS GETTING CLOSED!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!');
	// };

	socket.onmessage = (event) => {
		const data = JSON.parse(event.data);

		console.log('WE GOT A SIGNAL!!!', data)

		switch (data.type) {

			case 'REFRESH_FEATURE_FLAGS':
				dispatch(appActions.getFeatureFlags(data));
				break;

			case 'TOAST':
				dispatch(notificationActions.addToast({ message: 'this is a test' }));
				break;

			// case 'ADD_MESSAGE':
				// console.log('message got added', data, appActions);
				// dispatch(appActions.getFeatureFlags(data));
				// dispatch(messageReceived(data.message, data.author));
				// break;

			// case 'USERS_LIST':
				// console.log('list???');
				// 	dispatch(populateUsersList(data.users));
				// break;

			default:
				break;
		}
	};

	return socket;
};

// import * as actions from '../modules/websocket';
// import { updateGame, } from '../modules/game';

// const socketMiddleware = () => {
// 	let socket = null;

// 	const onOpen = store => (event) => {
// 		console.log('websocket open', event.target.url);
// 		store.dispatch(actions.wsConnected(event.target.url));
// 	};

// 	const onClose = store => () => {
// 		store.dispatch(actions.wsDisconnected());
// 	};

// 	const onMessage = store => (event) => {
// 		const payload = JSON.parse(event.data);
// 		console.log('receiving server message');

// 		switch (payload.type) {
// 			case 'update_game_players':
// 				store.dispatch(updateGame(payload.game, payload.current_player));
// 				break;
// 			default:
// 				break;
// 		}
// 	};

// 	// the middleware part of this function
// 	return store => next => action => {
// 		switch (action.type) {
// 			case 'WS_CONNECT':
// 				if (socket !== null) {
// 					socket.close();
// 				}

// 				// connect to the remote host
// 				socket = new WebSocket(action.host);

// 				// websocket handlers
// 				socket.onmessage = onMessage(store);
// 				socket.onclose = onClose(store);
// 				socket.onopen = onOpen(store);

// 				break;
// 			case 'WS_DISCONNECT':
// 				if (socket !== null) {
// 					socket.close();
// 				}
// 				socket = null;
// 				console.log('websocket closed');
// 				break;
// 			case 'NEW_MESSAGE':
// 				console.log('sending a message', action.msg);
// 				socket.send(JSON.stringify({ command: 'NEW_MESSAGE', message: action.msg }));
// 				break;
// 			default:
// 				console.log('the next action:', action);
// 				return next(action);
// 		}
// 	};
// };

// export default socketMiddleware();