import axios from 'axios';
import { REGISTER_USER, REGISTER_USER_SUCCESS, REGISTER_USER_FAILURE } from './types';

var apiBaseUrl = "http://localhost:3000/api";

export function registerUser(formValues) {
  const request = axios.post(apiBaseUrl + '/users/signup', formValues);
  return {
    type: SIGNUP_USER,
    payload: request
  };
}

export function registerUserSuccess(user) {
  return {
    type: SIGNUP_USER_SUCCESS,
    payload: user
  };
}

export function registerFailure(error) {
  return {
    type: SIGNUP_USER_FAILURE,
    payload: error
  };
}
