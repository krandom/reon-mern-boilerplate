import * as types from '../actions/actionTypes';
import initialState from './InitialState';
import {browserHistory} from 'react-router';

export default function UserReducer(state = initialState.app, action) {
  // state variable here reps just an array of courses
  switch(action.type) {

    case types.SET_PROFILE:
      return { ...state, isLoggedIn : true }

    case types.LOGOUT:
      return initialState.app;

    default: 
      return state;
  }
}





// const AppReducer = (app = {}, action) => {
// 	switch (action.type)
// 	{
// 		case 'SET_ROUTE':
// 			console.log('BLAH', action.data)
// 			app.route = action.data.route;
// 			return app;
// 	}

// 	return app;
// };

// export default AppReducer;
