import { CREATE_MAINTENANCE_REQUEST, GET_MAINTENANCE_REQUEST, FETCH_MY_MAINTENANCE_REQUESTS, APPROVE_MAINTENANCE, DENY_MAINTENANCE } from '../actions/types';

// reducer for authentication
// we want to define an initial state constant variable
const INITIAL_STATE = {
  id: '',
  form_subject:'',
  form_body:'',
  property_id: '',
  tenantId: '',
  pmId: '',
  approval_status: null,
  tenant_name: '',
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
        maintenancerequest: action.payload
      };

    case GET_MAINTENANCE_REQUEST:
      return {...state,
        id: action.payload.id,
        approval_status: action.payload.approval_status,
        tenantId: action.payload.tenantId,
        tenant_name: action.payload.tenant_name,
        propertyId: action.payload.propertyId,
        pmId: action.payload.pmId,
        form_subject: action.payload.form_subject,
        form_body: action.payload.form_body
      }

    case APPROVE_MAINTENANCE:
      return {...state,
        id: action.payload.id,
        approval_status: action.payload.approval_status,
        tenantId: action.payload.tenantId,
        tenant_name: action.payload.tenant_name,
        propertyId: action.payload.propertyId,
        property_name: action.payload.property_name,
        pmId: action.payload.pmId,
        form_subject: action.payload.form_subject,
        form_body: action.payload.form_body
      }

    case DENY_MAINTENANCE:
      return {...state,
        id: action.payload.id,
        approval_status: action.payload.approval_status,
        tenantId: action.payload.tenantId,
        tenant_name: action.payload.tenant_name,
        propertyId: action.payload.propertyId,
        property_name: action.payload.property_name,
        pmId: action.payload.pmId,
        form_subject: action.payload.form_subject,
        form_body: action.payload.form_body
      }

    case FETCH_MY_MAINTENANCE_REQUESTS:
      return {...state,
        maintenancerequests: action.payload
      }

    default:
      return state;
    }
}
