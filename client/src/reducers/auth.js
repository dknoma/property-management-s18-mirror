import { AUTH_USER, AUTH_ERROR } from '../actions/types';

// reducer for authentication
// we want to define an initial state constant variable
const INITIAL_STATE = {
  authenticated: '',
  errorMessage: '',
  username: '',
  firstname: '',
  lastname: '',
  user_type: '',
};

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    /* If case is auth_user, return properties and the JWT as payload */
    /* the ...state syntax returns current state + payload */
    case AUTH_USER:
    /* action.payload is the whole user object now */
      return {...state,
        authenticated: action.payload.token,
        username: action.payload.user.username,
        firstname: action.payload.user.firstname,
        lastname: action.payload.user.lastname,
        user_type: action.payload.user.user_type
      };
    case AUTH_ERROR:
    /* Need to make sure we're pulling this state in Register.js */
      return {...state, errorMessage: action.payload};
    default:
      return state;
    }
}
