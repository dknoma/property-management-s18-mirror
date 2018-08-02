import { CREATE_MAINTENANCE_REQUEST, GET_MAINTENANCE_REQUEST, FETCH_MY_MAINTENANCE_REQUESTS } from '../actions/types';

// reducer for authentication
// we want to define an initial state constant variable
const INITIAL_STATE = {
  senderId: '',
  senderUsername: '',
  receiverId: '',
  maintenance_requests: [],
  message_body: '',
  message:'',
  id: '',
  createdAt: '',
  inboxId: '',
  subject: '',
  body: '',
};

/* Reducer takes two arguments, the current state and an action */
export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    /* If case is auth_user, return properties and the JWT as payload */
    /* the ...state syntax returns current state + payload */
    /* We get AUTH_USER so we return new state with these changes */
    case CREATE_MAINTENANCE_REQUEST:
    /* action.payload is the whole user object now */

      /* When logging out a.k.a when payload is empty*/
      if (action.payload === '') {
        return {...state, message_body: ''};
      }

      /* We can add more info if we want to*/
      return {...state,
        message: action.payload
      };

    case GET_MAINTENANCE_REQUEST:
    console.log(action.payload);
      return {...state,
        id: action.payload.id,
        subject: action.payload.subject,
        senderId: action.payload.senderId,
        senderUsername: action.payload.senderUsername,
        receiverId: action.payload.receiverId,
        viewed: action.payload.body,
      }

    case FETCH_MY_MAINTENANCE_REQUESTS:
      console.log(action.payload);
      return {...state,
        messages: action.payload
      }

    default:
      return state;
    }
}
