import * as types from '../actions/actionTypes';
import initialState from './InitialState';

export default function NotificationsReducer(state = initialState.notifications, action) {
  const payload = action.payload;

  switch(action.type) {

    case types.ADD_TOAST:
      return {
       	...state, toast: [...state.toast, {
          ID: payload.ID || uuid(),
          type: payload.type || 'success',
          message: payload.message || 'This is a default message!',
          timer: payload.timer || 5000,
          sticky: payload.sticky || false,
          visible: payload.visible || true,
        }]
      }

    case types.REMOVE_TOAST:
      return { ...state, toast: state.toast.filter(x => x.ID !== payload) };

    case types.HIDE_TOAST:
      return { ...state, toast: state.toast.map(x => {
        if (x.ID === payload) { x.visible = false; }

        return x;
      })};

    case types.HIDE_COOKIE_WARNING:
      return { ...state, showCookieWarning : false };

    default:
      return state;
  }
}
