import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import { history } from '../store/store';

import app from './app.reducer';
import auth from './auth.reducer';
// import config from './config.reducer';
import modal from './modal.reducer';
import notification from './notification.reducer';
import sandbox from './sandbox.reducer';
import sidebar from './sidebar.reducer';
// import user from './user.reducer';

const rootReducer = combineReducers({
	// TODO :: MAKE THIS WORK
    // router: connectRouter(history),

	app,
	auth,
	// config,
	modal,
	notification,
	sandbox,
	sidebar,
	// user,
});

export default rootReducer;