import axios from 'axios';
import { AUTH_USER, AUTH_ERROR } from './types';

var apiBaseUrl = "http://localhost:3000/api/";

/* Because of redux thunk, we can return a function that calls dispatch. This is
an action creator */

/* pass form properties through */
export const signup =
({user_type, username, email, firstname, lastname, password}, callback) => async dispatch => {
  try {
    const response = await axios.post(
      apiBaseUrl + user_type + "/signup",
     {user_type, username, email, firstname, lastname, password}
    );
     /* and get the whole object as payload, not just token!
     dispatch sends to store (through reducer I think) */
    dispatch ({ type: AUTH_USER, payload: response.data });

    /* This stores the JWT we recieve from server right above */
    localStorage.setItem('token', response.data.token);
    /* This says to redirect */
    callback();
  } catch (e) {
    dispatch({ type: AUTH_ERROR, payload: "ERROR"})
  }
};

export const get_profile_info =
({user_type, username, email, firstname, lastname, password}, callback) => async dispatch => {
    try {
      const response = await axios.get(
        apiBaseUrl + "/tenant/signup",
       {user_type, username, email, firstname, lastname, password}
      );
       /* and get the token as payload */
      dispatch ({ type: AUTH_USER, payload: response.data.token });
      /* Dispatch user object as well */
      dispatch ({ type: AUTH_USER, payload: response.data.user});
      /* This stores the JWT we recieve from server right above */
      localStorage.setItem('token', response.data.token);
      /* This says to redirect */
      callback();

      /* Should also save user data to state so we don't have to ping db every time */
    } catch (e) {
      dispatch({ type: AUTH_ERROR, payload: "ERROR"})
    }
};

export const logout = () => {
  localStorage.removeItem('token');
  console.log('fires');

  return {
    /* Reusing this same type we used above, just by changing authenticated state */
    type: AUTH_USER
  };
};
