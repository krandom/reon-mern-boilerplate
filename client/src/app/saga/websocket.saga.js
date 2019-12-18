import { all, takeLatest, call, select, put } from 'redux-saga/effects';
import { websocketActions } from '../reducers/websocket.reducer';

const basePayload = s => ({
	websocketID: s.websocket.websocketID,
	userID: s.auth.user?.id,
	clientEnv: s.app.clientEnv,
	clientApp: s.app.clientApp,
});

function* send({ type, payload = {}, socket }) {
	try {
		socket.send(
			JSON.stringify({
				...basePayload(yield select(s => s)),
				...payload,
				type,
			})
		);
	} catch(e) {}
}

function* login({ payload: socket }) {
	try {
		yield send({ type: 'LOGIN', socket });
	} catch (e) {}
}

function* logout({ payload: socket }) {
	try {
		yield send({ type: 'LOGOUT', socket });
	} catch (e) {}
}

export default function* axiosSaga() {
	yield all([
		yield takeLatest(websocketActions.login, login),
		yield takeLatest(websocketActions.logout, logout),
	]);
}
