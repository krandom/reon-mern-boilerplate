import * as types from './actionTypes';

import AuthApi from '../api/Auth.api';

import Cookies from 'universal-cookie';

import history from '../history';

// import { endpoints as UserEndpoints } from '../constants/User.constants';

export const logout = () => ((dispatch, getState) => 
    AuthApi.logout(getState().config).then(res => {
        const cookies = new Cookies();
        cookies.remove('ubudget');
        dispatch({ type: types.LOGOUT, data : {}})
        history.push('/');
    })
);