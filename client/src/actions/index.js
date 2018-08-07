import axios from 'axios';
import {
  AUTH_USER, OTHER_USER, ALL_USERS,
  CREATE_PROPERTY, FETCH_PROPERTIES, GET_PROPERTY, SEARCH_PROPERTY, APPLY_PROPERTY,
  REVIEW_APPLICATIONS, CREATE_MESSAGE, GET_MESSAGE, GET_MESSAGES,
  DELETE_APPLICATION, GET_APPLICATION, APPROVE_APP, DENY_APP,
  FETCH_TENANTS, ADD_TO_PROP, FETCH_ALL_APPLICATIONS, FETCH_MY_APPLICATIONS,
  CREATE_MAINTENANCE_REQUEST, GET_MAINTENANCE_REQUEST, FETCH_MY_MAINTENANCE_REQUESTS,
  PAY_RENT, VIEW_RENT, FETCH_TENANT_MY_APPLICATION, START_CHAT
} from './types';
/* State Persist */
import {loadState, saveState} from '.././localStorage.js';

var apiBaseUrl = "http://localhost:3000/";

/* Because of redux thunk, we can return a function that calls dispatch. This is
an action creator */

/* pass form properties through */
/* Not saving Ids to state here */
export const signup =
({user_type, username, email, firstname, lastname, password}, callback) => async dispatch => {
  try {
    const response = await axios.post(
      apiBaseUrl +"api/"+ user_type + "/signup",
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
        apiBaseUrl + "api/" + user_type + "/login", {user_type, username, password}
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

export const edit_profile = ({username, email, firstname, lastname, id}, callback) => async dispatch => {
  try {
    let token = localStorage.getItem('token');
    let id = localStorage.getItem('my_id');
    const response = await axios.put(
      apiBaseUrl + "auth/"+ "users/" + id,
      {username, email, firstname, lastname}, { headers: {"token" : token}}

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
  let token = localStorage.getItem('token');
  const response = await axios.get(
    apiBaseUrl +"auth/"+ "users/" + id, { headers: {"token" : token}}
  )  .then(function (response) {
    /* Dispatch a payload of OTHER_USER */
    dispatch ({ type: OTHER_USER, payload: response.data });
    //console.log(response.data.user);
  })
};

export const get_users = () => async dispatch => {
  const response = await axios.get(
    apiBaseUrl +"api/"+ "users",
  )  .then(function (response) {
    /* Dispatch a payload of OTHER_USER */
      dispatch ({ type: ALL_USERS, payload: response.data });
      console.log(response.data);
  })
};

export const create_property = ({property_name, number_of_bedrooms, number_of_bathrooms, prices, property_type,
                                  street, city, state, zip, allows_pets,url_address}, callback) => async dispatch => {
 try {
   let token = localStorage.getItem('token');
   let userId = localStorage.getItem('id');
   const response = await axios.post(
     apiBaseUrl +"auth/"+ "property/create", {userId, property_name, number_of_bedrooms, number_of_bathrooms, prices, property_type,
                                       street, city, state, zip, allows_pets,url_address}, { headers: {"token" : token}}
                                     );

  dispatch({ type: CREATE_PROPERTY, payload: response.data});

  callback();

 } catch (e) {
   alert(e.response.data.message);
 }
};

export const fetchProperties = () => async dispatch => {
    const res = await axios.get( apiBaseUrl +"api/"+ "property/list");
    dispatch({ type: FETCH_PROPERTIES, payload: res.data });
};

export const search_property = ({price_gte, number_of_bedrooms, number_of_bathrooms, prices, city, state, zip, allows_pets, property_type}, callback) => async dispatch => {
 try {
   const response = await axios.post(
     apiBaseUrl +"api/"+ "property/filter", {price_gte, number_of_bedrooms, number_of_bathrooms, prices, city, state, zip, allows_pets, property_type});

  dispatch({ type: SEARCH_PROPERTY, payload: response.data});
  console.log(response.data);
  callback();

 } catch (e) {
   alert(e.response.data.message);
 }
};

export const get_property_profile = ({propertyId}) => async dispatch => {
  const response = await axios.get(
    apiBaseUrl +"api/"+ "property/" + propertyId,
  )  .then(function (response) {
    /* Dispatch a payload of OTHER_USER */
    console.log(response.data);
    dispatch ({ type: GET_PROPERTY, payload: response.data });

  })
};

export const apply_property = ({propertyId, form_subject, form_body, pmId, tenantId}, callback) => async dispatch => {
  try {
    console.log('apply_prop: '+ propertyId + form_subject, form_body);
    console.log(pmId);
    const response = await axios.post(
      apiBaseUrl +"api/"+ "property/" + propertyId + "/apply", {propertyId, form_subject, form_body, pmId, tenantId}
    );
    dispatch({ type: APPLY_PROPERTY, payload: response.data});
    callback();
  } catch (e) {
    alert(e.response.data.message);
  }
};

export const review_applications = ({propertyId}) => async dispatch => {
  try {
    let token = localStorage.getItem('token');
    console.log('propId: '+ propertyId);
    const response = await axios.get(
      apiBaseUrl +"auth/"+ "property/" + propertyId + "/applications", { headers: {"token" : token}}
    )  .then(function (response) {
      /* Dispatch a payload of OTHER_USER */
      dispatch ({ type: REVIEW_APPLICATIONS, payload: response.data });

    })
  } catch (e) {
    alert(e.response.message);
  }
};

export const get_application = ({propertyId, appId}) => async dispatch => {
    let token = localStorage.getItem('token');
    const res = await axios.get(
      apiBaseUrl + "auth/property/" + propertyId + "/applications/" + appId, { headers: {"token" : token}}
    ).then(function (res) {
      dispatch({ type: GET_APPLICATION, payload: res.data});
    })

};

export const create_message = ({senderId, receiverId, inboxId, subject, body}, callback) => async dispatch => {
  let token = localStorage.getItem('token');
  // let senderId = localStorage.getItem('my_id');
  // let inboxId = localStorage.getItem('my_id');
    try {
      const response = await axios.post(
        apiBaseUrl +"auth/user/message", {senderId, receiverId, inboxId, subject, body} ,{ headers: {"token" : token}}
      )  .then(function (response) {
        dispatch ({ type: CREATE_MESSAGE, payload: response.data });
        console.log(response.data);
        callback();
      })
    } catch (e) {
      alert(e.response.data.message);
    }
};

export const get_messages = ({id}) => async dispatch => {
  let token = localStorage.getItem('token');
  let user_id = localStorage.getItem('my_id');
  console.log('Id: '+ user_id);
  const response = await axios.get(
    apiBaseUrl + "auth/user/" + user_id + "/inbox", { headers: {"token" : token}}
  )  .then(function (response) {
    /* Dispatch a payload of OTHER_USER */
    dispatch ({ type: GET_MESSAGES, payload: response.data });
    console.log(response.data);
  })
};

export const get_message = ({messageId}) => async dispatch => {
  let token = localStorage.getItem('token');
  let user_id = localStorage.getItem('my_id');
  console.log('Id: '+ user_id);
  const response = await axios.get(
    apiBaseUrl + "auth/user/" + user_id + "/inbox/" + messageId, { headers: {"token" : token}}
  )  .then(function (response) {
    /* Dispatch a payload of OTHER_USER */
    dispatch ({ type: GET_MESSAGE, payload: response.data });
    console.log(response.data);
  })
};

export const approve_app = ({propertyId, appId}, callback) => async dispatch => {
  let token = localStorage.getItem('token');
  const res= await axios.put(
    apiBaseUrl + "auth/property/" + propertyId + "/applications/" + appId, {approval_status : true}, { headers: {"token" : token}}
  ).then(function (res) {
    dispatch({ type: APPROVE_APP, payload: res.data});
    callback();
  })
};

export const deny_app = ({propertyId, appId}, callback) => async dispatch => {
  let token = localStorage.getItem('token');
  const res = await axios.put(
    apiBaseUrl + "auth/property/" + propertyId + "/applications/" + appId, {approval_status : false}, { headers: {"token" : token}}
  ).then(function (res) {
    dispatch({ type: DENY_APP, payload: res.data});
    callback();
  })
};

export const fetch_tenants = ({propertyId}) => async dispatch => {
  let token = localStorage.getItem('token');
  const response = await axios.get(
    apiBaseUrl + "api/propertymanager/" + propertyId + "/tenants/", { headers: {"token" : token}}
  ).then(function (res) {
    dispatch({ type: FETCH_TENANTS, payload: res.data});

  })
};

export const add_to_prop = ({propertyId, tenantId, rent}, callback) => async dispatch => {
  let token = localStorage.getItem('token');
  console.log("propertyId: " + propertyId);
  const res = await axios.post(
    apiBaseUrl + "auth/propertymanager/add", {propertyId, tenantId, rent}, { headers: {"token" : token}}
  ).then(function (res) {
    dispatch({ type: ADD_TO_PROP, payload: res.data});
    callback();
  })
};

export const fetch_all_applications = () => async dispatch => {
  let token = localStorage.getItem('token');
  const res = await axios.get(
    apiBaseUrl + "auth/user/mypropertyapplications", { headers: {"token" : token}}
  ).then(function (res) {
    dispatch({ type: FETCH_ALL_APPLICATIONS, payload: res.data});
  })
};

export const fetch_my_applications = ({userId}) => async dispatch => {
  let token = localStorage.getItem('token');
  const res = await axios.get(
    apiBaseUrl + "auth/user/" + userId + "/myapplications", { headers: {"token" : token}}
  ).then(function (res) {
    dispatch({ type: FETCH_MY_APPLICATIONS, payload: res.data});
  })
};

export const create_maintenance_request = ({tenantId, propertyId, pmId, form_subject, form_body}, callback) => async dispatch => {
  try {
    console.log('apply_prop: '+ propertyId + form_subject, form_body);
    console.log(pmId);
    const response = await axios.post(
      apiBaseUrl +"api/"+ "property/" + propertyId + "/maintain", {tenantId, propertyId, pmId, form_subject, form_body}
    );
    dispatch({ type: CREATE_MAINTENANCE_REQUEST, payload: response.data});
    callback();
  } catch (e) {
    alert(e.response.data.message);
  }
};

export const fetch_my_maintenance_requests = ({userId}) => async dispatch => {
  let token = localStorage.getItem('token');
  const res = await axios.get(
    apiBaseUrl + "auth/user/mymaintenancerequests", { headers: {"token" : token}}
  ).then(function (res) {
    console.log(res.data);
    dispatch({ type: FETCH_MY_MAINTENANCE_REQUESTS, payload: res.data});
  })
};

export const get_maintenance_request = ({propertyId, appId}) => async dispatch => {
    let token = localStorage.getItem('token');
    const res = await axios.get(
      apiBaseUrl + "auth/user/" + propertyId + "/applications/" + appId, { headers: {"token" : token}}
    ).then(function (res) {
      dispatch({ type: GET_APPLICATION, payload: res.data});
    })

};

export const pay_rent = ({tenantId, stripeToken, amount, description}) => async dispatch => {
  const res = await axios.post(
    "/api/payments/" + tenantId + "/charge", {tenantId, stripeToken, amount, description}
  ).then(function (res) {
    dispatch( {type: PAY_RENT, payload: res.data});
  })
};

export const view_rent = ({tenantId}, callback) => async dispatch => {
  const res = await axios.post(

    apiBaseUrl + "api/payments/getRent", {tenantId}
  ).then(function(res) {
    dispatch( {type: VIEW_RENT, payload: res.data });
    callback();
  })
};

export const fetch_tenant_my_application = ({userId, appId}) => async dispatch => {
  let token = localStorage.getItem('token');
  const res = await axios.get(
    apiBaseUrl + "auth/user/" + userId + "/myapplications/" + appId, { headers: {"token" : token}}
  ).then(function (res) {
    dispatch({ type: FETCH_TENANT_MY_APPLICATION, payload: res.data});
  })
};

export const start_chat = ({senderId}, callback) => async dispatch => {
  const res = await axios.get(
    apiBaseUrl + "chat/" + senderId
  ).then(function(res) {
    dispatch( {type: START_CHAT, payload: res.data });
    callback();
  })
};
