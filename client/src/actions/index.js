import axios from 'axios';
import { AUTH_USER, AUTH_ERROR } from './types';

var apiBaseUrl = "http://localhost:3000/api";

/* Because of redux thunk, we can return a function that calls dispatch */
/* username, email, first_name, last_name, password */
/* pass form properties through */
export const signup_property =
({user_type, username, email, firstname, lastname, password}, callback) => async dispatch => {
  try {
    const response = await axios.post(
      apiBaseUrl + "/propertymanager/signup",
     {user_type, username, email, firstname, lastname, password}
    );
     /* and get the token as payload */
    dispatch ({ type: AUTH_USER, payload: response.data.token });
    /* This stores the JWT we recieve from server right above */
    localStorage.setItem('token', response.data.token);
    /* This says to redirect */
    callback();
  } catch (e) {
    dispatch({ type: AUTH_ERROR, payload: "ERROR"})
  }
};

export const signup_tenant = formProps => {
  return (dispatch) => {
    axios.post(apiBaseUrl + "/tenant/signup", formProps);
  };
};

export const logout = () => {
  localStorage.removeItem('token');

  return {
    /* Reusing this same type we used above, just by changing authenticated state */
    type: AUTH_USER
  };
};
