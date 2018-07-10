import axios from 'axios';
import { AUTH_USER, AUTH_ERROR, OTHER_USER } from './types';

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
    localStorage.setItem('username', response.data.user.username);
    localStorage.setItem('firstname', response.data.user.firstname);
    localStorage.setItem('lastname', response.data.user.lastname);
    localStorage.setItem('email', response.data.user.email);
    localStorage.setItem('user_type', response.data.user.user_type);
    localStorage.setItem('id', response.data.userId);
    /* This forces redirect */
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
        apiBaseUrl + user_type + "/login", {user_type, username, password}
      );

       /* and get the token as payload */
      dispatch ({ type: AUTH_USER, payload: response.data });
      /* Dispatch user object as well */

      /* This stores the token and other info into localStorage*/
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('username', response.data.user.username);
      localStorage.setItem('firstname', response.data.user.firstname);
      localStorage.setItem('lastname', response.data.user.lastname);
      localStorage.setItem('email', response.data.user.email);
      localStorage.setItem('user_type', response.data.user.user_type);
      localStorage.setItem('id', response.data.user.userId);
      console.log(response.data.user.userId);
      /* This says to redirect */
      callback();
      /* Should also save user data to state so we don't have to ping db every time */
    } catch (e) {
      alert(e.response.data.message);
    }
};

export const logout = () => {
  localStorage.clear();

  return {
    /* Reusing this same type we used above, just by changing authenticated state */
    type: AUTH_USER,
    payload: ''
  };
};

export const edit_profile = ({username, email, firstname, lastname}, callback) => async dispatch => {
  const id = localStorage.getItem('id');
  console.log(id);
  const response = await axios.put(
    apiBaseUrl + "users/" + id,
    {username, email, firstname, lastname}
  );

  localStorage.setItem('username', username);
  localStorage.setItem('email', email);
  localStorage.setItem('firstname', firstname);
  localStorage.setItem('lastname', lastname);
};

export const get_user_profile = ({id}) => async dispatch => {
  const response = await axios.get(
    apiBaseUrl + "users/" + id,
  )  .then(function (response) {
    /* Dispatch a payload of OTHER_USER */
    dispatch ({ type: OTHER_USER, payload: response.data });
    console.log(response.data.user);
  })
};

export const create_property = ({property_name, number_of_bedrooms, number_of_bathrooms,
                             prices, rent_type, street, city, state, zip, allow_pets}, callback) => async dispatch => {
 try {
   const response = await axios.post(
     apiBaseUrl + "api/property/create", {property_name, number_of_bedrooms, number_of_bathrooms,
                                     prices, rent_type, street, city, state, zip, allow_pets}
   );

 } catch (e) {
   alert(e.response.data.message);
 }
};
