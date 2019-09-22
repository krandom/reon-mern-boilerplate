import { createStore, applyMiddleware } from 'redux'
import { combineReducers } from 'redux'
import thunk from 'redux-thunk';
import logMiddleware from '../middleware/log';

// import createHistory from 'history/createBrowserHistory';

// Browser history
// export const history = createHistory();

// Reducers
// import CountReducer from '../reducers/Count.reducer'
import rootReducer from '../reducers/Root.reducer';

import Axios from '../utils/Axios.utils';

// const configureStore = (initialState = {}) => {
//   return createStore(
//     rootReducer,
//     initialState,
//     // applyMiddleware(thunk)
//   );
// }

// export default configureStore;

// WORKING WITH MM MODEL
// import in index.js
// import { configureStore } from './store/Store';
// const store = configureStore();

// import CountReducer from '../reducers/Count.reducer'


export const mainStore = (initialState) => {
	// const reducer = combineReducers({
	//     CountReducer
	// });

  const store = createStore(
    rootReducer,
    initialState,
    applyMiddleware(thunk),
  );

  return store;
};


















// const reducer = combineReducers({
//     CountReducer
// });

// const initialState = {
//     CountReducer: {count: 123, wish_value: 12}
// };


// let store = createStore(reducer, initialState);

// export default store;


// import { createStore, applyMiddleware } from 'redux';
// import rootReducer from '../reducers/Root.reducer';
// import logMiddleware from '../middleware/log';

// const initialState = {
// 	user : {},
// 	isLoggedIn : false,
// };

// const store = createStore(
// 	rootReducer,
// 	initialState,
// 	applyMiddleware(logMiddleware)
// );

// window.store = store;

// export default store;
