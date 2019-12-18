/*
HERO CAROUSEL like this, and then it
http://html.iwthemes.com/roker/run/index-one-page.html

Template
https://www.free-css.com/free-css-templates/page233/solution
*/

import { useEffect } from 'react';
import { Router } from 'react-router-dom';
import { connect } from 'react-redux';
import { hot } from 'react-hot-loader/root';

// https://webthemez.com/preview/?fortune-business-bootstrap-html-website-template

import { history } from '../../store/store';

import { appActions } from '../../reducers/app.reducer';
import { websocketActions } from '../../reducers/websocket.reducer';

import Header from '../header/Header.react';
import Modal from '../modal/Modal.react';
import Routes from './routing/Routes.react';
import Notification from '../notification/Notification.react';
import Sidebar from '../sidebar/Sidebar.react';
import Hamburger from '../hamburger/Hamburger.react';
import Preload from './Preload.react';

const App = ({ bootAction, isLoggedIn, wsLoginAction }) => {
	useEffect(() => {
		bootAction();

		// const beforeunload = e => {
		// 	e.preventDefault();
		// 	disconnectAction();
		// };

		// $(window).on('beforeunload', beforeunload);

		// return () => $(window).off('beforeunload', beforeunload);
	}, []);

	useEffect(() => {
		if (isLoggedIn)
			wsLoginAction();
	}, [isLoggedIn]);

	return (
		<Router history={history}>
			<>
				<Preload />
				<Routes />

				<Header />
				<Modal />
				<Notification />
				<Sidebar />
				<Hamburger key="test" />
			</>
		</Router>
	);
};

const mstp = s => ({
	isLoggedIn: s.app.isLoggedIn,
});

const mdtp = {
	bootAction: appActions.boot,
	wsLoginAction: websocketActions.login,
};

export default hot(connect(mstp, mdtp)(App));
