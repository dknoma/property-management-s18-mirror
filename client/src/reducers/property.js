import { CREATE_PROPERTY, FETCH_PROPERTIES, SEARCH_PROPERTY } from '../actions/types';

// reducer for authentication
// we want to define an initial state constant variable
const INITIAL_STATE = {
  property_list: [],
  property_name: ''
};

/* Reducer takes two arguments, the current state and an action */
export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    /* If case is auth_user, return properties and the JWT as payload */
    /* the ...state syntax returns current state + payload */
    /* We get AUTH_USER so we return new state with these changes */
    case CREATE_PROPERTY:
    /* action.payload is the whole user object now */

      /* When logging out a.k.a when payload is empty*/
      if(action.payload === '') {
        return {...state, property_name: ''};
      }

      /* We can add more info if we want to*/
      return {...state,
        property_name: action.payload.property_name

      };

    case FETCH_PROPERTIES:
      return {...state,
        property_list: action.payload
      }

    case SEARCH_PROPERTY:
      return {...state,
        search_result_list: action.payload

      }

    default:
      return state;
    }
}
