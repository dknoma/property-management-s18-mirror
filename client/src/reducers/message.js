import { CREATE_MESSAGE, GET_MESSAGES } from '../actions/types';

// reducer for authentication
// we want to define an initial state constant variable
const INITIAL_STATE = {
  sender_id: '',
  recipient_id: '',
  messages: [],
  message_body: ''
};

/* Reducer takes two arguments, the current state and an action */
export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    /* If case is auth_user, return properties and the JWT as payload */
    /* the ...state syntax returns current state + payload */
    /* We get AUTH_USER so we return new state with these changes */
    case CREATE_MESSAGE:
    /* action.payload is the whole user object now */

      /* When logging out a.k.a when payload is empty*/
      if (action.payload === '') {
        return {...state, message_body: ''};
      }

      /* We can add more info if we want to*/
      return {...state,
        message: action.payload
      };

    case GET_MESSAGES:
      return {...state,
        messages: action.payload.messages,
        recipient_id: action.payload.recipient
      }

    default:
      return state;
    }
}
