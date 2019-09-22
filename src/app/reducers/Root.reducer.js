import { combineReducers } from 'redux';

import app from './App.reducer';
import config from './Config.reducer';
import user from './User.reducer';
import notification from './Notification.reducer';

const rootReducer = combineReducers({
	app,
	config,
 	user,
 	notification,
})

export default rootReducer;