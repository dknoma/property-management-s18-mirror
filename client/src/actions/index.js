import axios from 'axios';
import { AUTH_USER, AUTH_ERROR } from './types';

var apiBaseUrl = "http://localhost:3000/api/";

/* Because of redux thunk, we can return a function that calls dispatch */
/* username, email, first_name, last_name, password */
/* pass form properties through */
export const signup =
({user_type, username, email, firstname, lastname, password}, callback) => async dispatch => {
  try {
    const response = await axios.post(
      apiBaseUrl + user_type + "/signup",
     {user_type, username, email, firstname, lastname, password}
    );
     /* and get the whole object as payload, not just token!
     dispatch sends to store */
    dispatch ({ type: AUTH_USER, payload: response.data });
    /* This stores the JWT we recieve from server right above */
    localStorage.setItem('token', response.data.token);
    localStorage.setItem('username', response.data.user.username);
    /* This says to redirect */
    callback();
  } catch (e) {
    alert(e.response.data.message);
    //dispatch({ type: AUTH_ERROR, payload: "ERROR"})
  }
};

export const login =
({user_type, username, password}, callback) => async dispatch => {
    try {
      const response = await axios.post(
        apiBaseUrl + user_type + "/login",
       {user_type, username, password}
      );

       /* and get the token as payload */
      dispatch ({ type: AUTH_USER, payload: response.data });
      /* Dispatch user object as well */

      /* This stores the token and username into localStorage*/
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('username', response.data.user.username);
      /* This says to redirect */
      callback();

      /* Should also save user data to state so we don't have to ping db every time */
    } catch (e) {
      alert(e.response.data.message);
    }
};

export const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('username');

  return {
    /* Reusing this same type we used above, just by changing authenticated state */
    type: AUTH_USER,
    payload: ''
  };
};
