import * as types from '../actions/actionTypes';
import initialState from './InitialState';
import {browserHistory} from 'react-router';

export default function UserReducer(state = initialState.user, action) {
  switch(action.type) {

    case types.SET_PROFILE:
      return {
       	...state, profile : action.data
      }

    case types.LOGOUT:
      return initialState.user;

    default:
      return state;
  }
}
