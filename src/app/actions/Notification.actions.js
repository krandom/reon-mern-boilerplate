import * as types from './actionTypes';
// import test from './actionTypes';

export const addToast = (payload = {}) => ((dispatch, getState) => {
    dispatch({ type: types.ADD_TOAST, payload })
});

export const removeToast = (payload) => ((dispatch, getState) => {
    dispatch({ type: types.REMOVE_TOAST, payload })
});

export const hideToast = (payload) => ((dispatch, getState) => {
    dispatch({ type: types.HIDE_TOAST, payload })
});

export const hideCookieWarning = () => ((dispatch, getState) => {
    dispatch({ type: types.HIDE_COOKIE_WARNING })
});