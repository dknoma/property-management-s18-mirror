import { AUTH_USER, AUTH_ERROR, OTHER_USER, ALL_USERS } from '../actions/types';

// reducer for authentication
// we want to define an initial state constant variable
const INITIAL_STATE = {
  authenticated: '',
  errorMessage: '',
  email: '',
  username: '',
  firstname: '',
  lastname: '',
  user_type: '',
  my_id: '',
  id: '',
  users: [],
};

/* Reducer takes two arguments, the current state and an action */
export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    /* If case is auth_user, return properties and the JWT as payload */
    /* the ...state syntax returns current state + payload */
    /* We get AUTH_USER so we return new state with these changes */
    case AUTH_USER:
    /* action.payload is the whole user object now */

      /* When logging out a.k.a when payload is empty*/
      if(action.payload === '') {
        return {...state, authenticated: '', username: ''};
      }

      /* We can add more info if we want to*/
      return {...state,
        authenticated: action.payload.token,
        my_id: action.payload.user.id,
        id: action.payload.user.id,
        email: action.payload.user.email,
        my_username: action.payload.user.username,
        firstname: action.payload.user.firstname,
        lastname: action.payload.user.lastname,
        user_type: action.payload.user.user_type
      };

    case AUTH_ERROR:
    /* Need to make sure we're pulling this state in Register.js */
      return {...state, errorMessage: action.payload};

    case OTHER_USER:
    /* action.payload is the whole user object now */

      /* When logging out a.k.a when payload is empty*/
      if(action.payload === '') {
        return {...state, authenticated: '', username: ''};
      }

      /* We can add more info if we want to*/
      return {...state,
        id: action.payload.user.id,
        email: action.payload.user.email,
        username: action.payload.user.username,
        firstname: action.payload.user.firstname,
        lastname: action.payload.user.lastname,
        user_type: action.payload.user.user_type
      };

    case ALL_USERS:
    console.log(action.payload);
        return {...state,
          users: action.payload
        };

    default:
      return state;
    }



}
