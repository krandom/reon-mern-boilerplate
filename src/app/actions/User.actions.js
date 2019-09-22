import * as types from './actionTypes';
import UserApi from '../api/User.api';
import { endpoints as UserEndpoints } from '../constants/User.constants';
import {browserHistory} from 'react-router';
import history from '../history';

// export function loadUserSuccess(profile) {
//   return {type: types.LOAD_USER_SUCCESS, profile};
// }

// export function updateCatSuccess(cat) {
//   return {type: types.UPDATE_CAT_SUCCESS, cat}
// }

// export function createCatSuccess(cat) {
//   return {type: types.CREATE_CAT_SUCCESS, cat}
// }

// export function deleteCatSuccess(cat) {
//   return {type: types.DELETE_CAT_SUCCESS, cat}
// }

export function getProfile(formData = {}, redirrect) {
  // make async call to api, handle promise, dispatch action when promise is resolved
	console.log('GET PROFILE!!!!!!!!!!!!!!', formData)

  return function(dispatch, getState) {

  console.log('222', getState())
	return UserApi.getProfile(formData, getState().config).then(res => {
		console.log('WE HAVE A PROFILE!!!', res)
		dispatch({ type: types.SET_PROFILE, data : res.Data })

    if (redirrect)
      history.push('/');

	})
	// dispatch(loadUserSuccess({userId : userId}));
	// dispatch({
		// type : types.LOAD_USER_SUCCESS, userId
	// })
  	/*
    return UserApi.getAllCats().then(cats => {
      dispatch(loadUserSuccess(cats));
    }).catch(error => {
      throw(error);
    });
    */
  };
}

// export function updateCat(cat) {
//   return function (dispatch) {
//     return catApi.updateCat(cat).then(responseCat => {
//       dispatch(updateCatSuccess(responseCat));
//     }).catch(error => {
//       throw(error);
//     });
//   };
// }

// export function createCat(cat) {
//   return function (dispatch) {
//     return catApi.createCat(cat).then(responseCat => {
//       dispatch(createCatSuccess(responseCat));
//       return responseCat;
//     }).catch(error => {
//       throw(error);
//     });
//   };
// }

// export function deleteCat(cat) {
//   return function(dispatch) {
//     return catApi.deleteCat(cat).then(() => {
//       console.log(`Deleted ${cat.id}`)
//       dispatch(deleteCatSuccess(cat));
//       return;
//     }).catch(error => {
//       throw(error);
//     })
//   }
// }







