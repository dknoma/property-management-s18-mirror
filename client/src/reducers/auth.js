import { AUTH_USER, AUTH_ERROR } from '../actions/types';

// reducer for authentication
// we want to define an initial state constant variable
const INITIAL_STATE = {
  authenticated: '',
  errorMessage: ''
};

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    /* If case is auth_user, return properties and the JWT as payload */
    case AUTH_USER:
      return {...state, authenticated: action.payload};
    case AUTH_ERROR:
    /* Need to make sure we're pulling this state in Register.js */
      return {...state, errorMessage: action.payload};
    default:
      return state;
    }
}
