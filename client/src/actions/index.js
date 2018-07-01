import axios from 'axios';
import { REGISTER_USER, REGISTER_USER_SUCCESS, REGISTER_USER_FAILURE, AUTH_USER } from './types';

var apiBaseUrl = "http://localhost:3000/api";

// export function registerUser(formValues) {
//   const request = axios.post(apiBaseUrl + '/users/signup', formValues);
//   return {
//     type: SIGNUP_USER,
//     payload: request
//   };
// }
//
// export function registerUserSuccess(user) {
//   return {
//     type: SIGNUP_USER_SUCCESS,
//     payload: user
//   };
// }
//
// export function registerFailure(error) {
//   return {
//     type: SIGNUP_USER_FAILURE,
//     payload: error
//   };
// }

/* Because of redux thunk, we can return a function that calls dispatch */
/* username, email, first_name, last_name, password, passwordConfirm */
/* pass form properties through */
export const signup_property = ({user_type, username, email, firstname, lastname, password}) => {
  return (dispatch) => {
    axios.post(apiBaseUrl + "/propertymanager/signup", {user_type, username, email, firstname, lastname, password});
    // dispatch({ AUTH_USER });
  };
}

export const signup_tenant = formProps => {
  return (dispatch) => {
    axios.post(apiBaseUrl + "/tenant/signup", formProps);
    // dispatch({ AUTH_USER });
  };
}
