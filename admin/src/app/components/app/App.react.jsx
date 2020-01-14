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
import { settingsActions } from '../../reducers/settings.reducer';

import Header from '../header/Header.react';
import ModalContainer from '../modal/ModalContainer.react';
import Routes from './routing/Routes.react';
import Notification from '../notification/Notification.react';
import Sidebar from '../sidebar/Sidebar.react';
import Hamburger from '../hamburger/Hamburger.react';
import Preload from './Preload.react';

const App = ({ booted, isLoggedIn, bootAction, getConstantsAction }) => {
	useEffect(() => {
		bootAction();
	}, []);

	useEffect(() => {
		if (isLoggedIn)
			getConstantsAction();
	}, [booted]);

	return (
		<Router history={history}>
			<>
				<div className='app'>
					<Preload />
					{ booted && isLoggedIn &&
						<>
							<Routes />
							<Header />
							<ModalContainer />
							<Notification />
							<Sidebar />
							<Hamburger />
						</>
					}
				</div>
			</>
		</Router>
	);
};

const mstp = s => ({
	booted: s.app.booted,
	isLoggedIn: s.app.isLoggedIn,
});

const mdtp = {
	bootAction: appActions.boot,
	getConstantsAction: settingsActions.getConstants,
};

export default hot(connect(mstp, mdtp)(App));
