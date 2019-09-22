// import { browserHistory } from 'react-router';

import * as UserActions from './User.actions';
import * as NotificationActions from './Notification.actions';
import * as types from './actionTypes';

// import UserApi from '../api/User.api';
import AppApi from '../api/App.api';

import Cookies from 'universal-cookie';
// import { endpoints as UserEndpoints } from '../constants/User.constants';

export const validateCookie = (formData = {}) => ((dispatch, getState) =>
    AppApi.validateCookie(formData, getState().config).then(res => {

        console.log('REA', res)
        if (res.Error) {
            const cookies = new Cookies();
            cookies.remove('ubudget');
        } else {
            dispatch(UserActions.getProfile({sessionId:formData.cookie}));
            dispatch(BudgetActions.getBoards({sessionId:formData.cookie}));
            dispatch(BudgetActions.getColumns({sessionId:formData.cookie}));
            dispatch(BudgetActions.getRows({sessionId:formData.cookie}));
            dispatch({ type: types.SET_SESSION_DATA, data : { SessionId : formData.cookie }})
        }
    })
);

export const logout = (formData = {}) => ((dispatch, getState) =>
    AppApi.logout(getState().config).then(res => {
        const cookies = new Cookies();
        cookies.remove('ubudget');
        dispatch({ type: types.LOGOUT, data : {}})
    })
);