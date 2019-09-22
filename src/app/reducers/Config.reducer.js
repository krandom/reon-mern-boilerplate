import * as types from '../actions/actionTypes';
import initialState from './InitialState';

import Cookies from 'universal-cookie';

export default function catReducer(state = initialState.config, action) {
  // state variable here reps just an array of courses
  switch(action.type) {

    case types.SET_SESSION_DATA:
        var tmp = action
        const cookies = new Cookies();
        cookies.set('ubudget', action.data.SessionID, { path: '/' });

        return { ...state, sessionID : action.data.SessionID };

    case types.LOGOUT:
      return initialState.config;

    default:
      return state;
  }
}
