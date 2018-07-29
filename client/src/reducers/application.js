import { APPLY_PROPERTY, REVIEW_APPLICATIONS, DELETE_APPLICATION, GET_APPLICATION } from '../actions/types';

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
      id: action.payload.application.id,
      approval_status: action.payload.application.approval_status,
      tenantId: action.payload.application.tenantId,
      tenant_name: action.payload.application.tenant_name,
      propertyId: action.payload.application.propertyId,
      property_name: action.payload.application.property_name,
      pmId: action.payload.application.pmId,
      form_subject: action.payload.application.form_subject,
      form_body: action.payload.application.form_body
    }

  default:
    return state;
  }
}
