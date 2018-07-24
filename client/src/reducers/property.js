import { CREATE_PROPERTY, FETCH_PROPERTIES, GET_PROPERTY, SEARCH_PROPERTY, PERSIST_SEARCH_RESULTS, APPLY_PROPERTY, REVIEW_APPLICATIONS } from '../actions/types';

// reducer for authentication
// we want to define an initial state constant variable
const INITIAL_STATE = {
  property_list: [],
  property_name: '',
  id: '',
  number_of_bedrooms: 0,
  number_of_bathrooms: 0,
  prices: '',
  property_type: '',
  state: '',
  street: '',
  url_address: '',
  zip: '',
  allows_pets: false,
  search_results_list: null,
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

    case GET_PROPERTY:
    return {...state,
      userId: action.payload.userId,
      id: action.payload.id,
      property_name: action.payload.property_name,
      number_of_bedrooms: action.payload.number_of_bedrooms,
      number_of_bathrooms: action.payload.number_of_bathrooms,
      prices: action.payload.prices,
      property_type: action.payload.property_type,
      state: action.payload.state,
      street: action.payload.street,
      url_address: action.payload.url_address,
      zip: action.payload.zip,
      allows_pets: action.payload.allows_pets
    };

    case SEARCH_PROPERTY:
    console.log(action.payload);
      return {...state,
        search_results_list: action.payload
      }

    /*Maybe create new Reducer?*/
    case APPLY_PROPERTY:
      return {...state,
        application: action.payload
      }

   case REVIEW_APPLICATIONS:
      return {...state,
        applications: action.payload
      }

    default:
      return state;
    }
}
