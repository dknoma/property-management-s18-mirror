import axios from 'axios';
import { AUTH_USER, AUTH_ERROR, OTHER_USER, ALL_USERS, CREATE_PROPERTY, FETCH_PROPERTIES, GET_PROPERTY, SEARCH_PROPERTY } from './types';

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
    localStorage.setItem('my_username', response.data.user.username);
    localStorage.setItem('firstname', response.data.user.firstname);
    localStorage.setItem('lastname', response.data.user.lastname);
    localStorage.setItem('email', response.data.user.email);
    localStorage.setItem('user_type', response.data.user.user_type);

    /* Need both so info shows up correctly on login */
    localStorage.setItem('my_id', response.data.user.userId);
    localStorage.setItem('id', response.data.user.userId);
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
      localStorage.setItem('my_username', response.data.user.username);
      localStorage.setItem('firstname', response.data.user.firstname);
      localStorage.setItem('lastname', response.data.user.lastname);
      localStorage.setItem('email', response.data.user.email);
      localStorage.setItem('user_type', response.data.user.user_type);
      /* Need both so info shows up correctly on login */
      localStorage.setItem('my_id', response.data.user.userId);
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
  try {
    const id = localStorage.getItem('my_id');
    const token = localStorage.getItem('token');
    console.log(token);
    const response = await axios.put(
      apiBaseUrl + "users/" + id + "/" + token,
      {username, email, firstname, lastname}
    );

    localStorage.setItem('my_username', username);
    localStorage.setItem('email', email);
    localStorage.setItem('firstname', firstname);
    localStorage.setItem('lastname', lastname);
    callback();

 } catch (e) {
   if(e.response.status === 409) {
     alert("Username or Email address is already in use! Try a different one." );
   }
 }
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

export const get_users = () => async dispatch => {
  const response = await axios.get(
    apiBaseUrl + "users",
  )  .then(function (response) {
    /* Dispatch a payload of OTHER_USER */
      dispatch ({ type: ALL_USERS, payload: response.data });
      console.log(response.data);
  })
};

export const create_property = ({property_name, number_of_bedrooms, number_of_bathrooms, prices, property_type,
                                  street, city, state, zip, allows_pets,url_address}, callback) => async dispatch => {
 try {
   const response = await axios.post(
     apiBaseUrl + "property/create", {property_name, number_of_bedrooms, number_of_bathrooms, prices, property_type,
                                       street, city, state, zip, allows_pets,url_address});

  dispatch({ type: CREATE_PROPERTY, payload: response.data});
  console.log(response.data.property_name);

  callback();

 } catch (e) {
   alert(e.response.data.message);
 }
};

export const fetchProperties = () => async dispatch => {
    const res = await axios.get( apiBaseUrl + "property/list");
    dispatch({ type: FETCH_PROPERTIES, payload: res.data });
    console.log(res.data);
};

export const propertiesSearch = () => async dispatch => {
    const res = await axios.get( apiBaseUrl + "property/list");
    dispatch({ type: FETCH_PROPERTIES, payload: res.data });
    console.log(res.data);
};

export const search_property = ({price_gte, number_of_bedrooms, number_of_bathrooms, prices, city, state, zip, allows_pets}, callback) => async dispatch => {
 try {
   const response = await axios.post(
     apiBaseUrl + "property/filter", {price_gte, number_of_bedrooms, number_of_bathrooms, prices, city, state, zip, allows_pets});

  dispatch({ type: SEARCH_PROPERTY, payload: response.data});
  console.log(response.data);

  callback();

 } catch (e) {
   alert(e.response.data.message);
 }
};

export const get_property_profile = ({id}) => async dispatch => {
  const response = await axios.get(
    apiBaseUrl + "property/" + id,
  )  .then(function (response) {
    /* Dispatch a payload of OTHER_USER */
    console.log(response.data.user);
    dispatch ({ type: GET_PROPERTY, payload: response.data });

  })
};
