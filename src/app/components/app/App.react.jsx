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

import Header from '../header/Header.react';
import { appActions } from '../../reducers/app.reducer';

import Modal from '../modal/Modal.react';
import Routes from './routing/Routes.react';
import Notification from '../notification/Notification.react';
import Sidebar from '../sidebar/Sidebar.react';
import Preload from './Preload.react';


const App = ({ s, bootAction }) => {

	// const scrollHandler = () => {
	// 	console.log('scroll')
	// };

	useEffect(() => {
		bootAction();


    // window.addEventListener('scroll', scrollHandler);
    // return () => {
    //         window.removeEventListener('scroll', scrollHandler);
    // };

	}, []);

	console.log('state', s)
  return (
    <Router history={history}>
    <>
			<Preload />
      <Routes />

      <Header />
      <Modal />
      <Notification />
      <Sidebar />
    </>
    </Router>
  );
};

const mstp = s => ({
  s,
});

const mdtp = {
  bootAction: appActions.boot,
};

export default hot(connect(mstp, mdtp)(App));


/*



*/
