import { createStore, combineReducers, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension';
import createSagaMiddleware from 'redux-saga';
import { createBrowserHistory } from 'history';
import { routerMiddleware, connectRouter } from 'connected-react-router';

// import thunk from 'redux-thunk';

// import logMiddleware from '../middleware/log';

// import createHistory from 'history/createBrowserHistory';

// Browser history
// export const history = createHistory();

// Reducers
// import CountReducer from '../reducers/Count.reducer'
import rootReducer from '../reducers/root.reducer';

// import authSaga from '../saga/auth.saga';
// import apiSaga from '../saga/api.saga';
import appSaga from '../saga/app.saga';
// import userSaga from '../saga/user.saga';
// import rootSaga from '../sagas/root.saga'

// import Axios from '../utils/Axios.utils';

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
// console.log('connectRouter', connectRouter(history))

const saga = createSagaMiddleware()

export const history = createBrowserHistory();
export const mainStore = ({ initialState = {} } = {}) => {
  const router = routerMiddleware(history);

	// const reducer = combineReducers({
	//     CountReducer
	// });

  const store = createStore(
    rootReducer,
    // rootReducer,
    initialState,
    composeWithDevTools(
    	applyMiddleware(
    		saga,
        router,
    	)
    ),
  );

  saga.run(appSaga);
  // saga.run(authSaga);
  // saga.run(apiSaga);
  // saga.run(userSaga);

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
