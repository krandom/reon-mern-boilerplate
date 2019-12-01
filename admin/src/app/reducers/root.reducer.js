import { combineReducers } from 'redux';

import app from './app.reducer';
import auth from './auth.reducer';
import config from './config.reducer';
import modal from './modal.reducer';
import notification from './notification.reducer';
import sandbox from './sandbox.reducer';
import sidebar from './sidebar.reducer';
import users from './users.reducer';

const rootReducer = combineReducers({
	// TODO :: MAKE THIS WORK
	// router: connectRouter(history),

	app,
	auth,
	config,
	modal,
	notification,
	sandbox,
	sidebar,
	users,
});

export default rootReducer;
