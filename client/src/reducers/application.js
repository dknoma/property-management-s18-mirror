import { APPLY_PROPERTY, REVIEW_APPLICATIONS, DELETE_APPLICATION, GET_APPLICATION, APPROVE_APP, DENY_APP, FETCH_ALL_APPLICATIONS, FETCH_MY_APPLICATIONS } from '../actions/types';

const INITIAL_STATE = {
  form_subject:'',
  form_body:'',
  property_id: '',
  tenantId: '',
  pmId: '',
  approval_status: null,
  property_name: '',
  tenant_name: ''

};

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {

  case APPLY_PROPERTY:
    return {...state,
      application: action.payload
    }

  case REVIEW_APPLICATIONS:
    return {...state,
      applications: action.payload
    }

  case DELETE_APPLICATION:
    return {...state,
      applications: action.payload
    }

  case GET_APPLICATION:
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

  case APPROVE_APP:
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

    case DENY_APP:
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

    case FETCH_ALL_APPLICATIONS:
      return {...state,
        applications: action.payload
      }

    case FETCH_MY_APPLICATIONS:
      return {...state,
        applications: action.payload
      }

  default:
    return state;
  }
}
