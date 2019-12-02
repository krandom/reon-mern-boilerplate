import { all, takeLatest, call, select, put } from 'redux-saga/effects';
import { websocketActions } from '../reducers/websocket.reducer';

function* newMessage({ payload: socket }) {
	try {
		// console.log('handle new message here 1', dispatch);
		console.log('handle new message here 1', socket);

		const websocketID = yield select(s => s.websocket.websocketID);

			socket.send(JSON.stringify({ type: 'ADD_MESSAGE', author: websocketID }));


		console.log('handle new message here 2', websocketID);

	} catch (e) {}
}


export default function* axiosSaga() {
	yield all([
		yield takeLatest(websocketActions.newMessage, newMessage),
	]);
}
