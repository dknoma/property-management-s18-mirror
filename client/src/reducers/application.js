import { APPLY_PROPERTY, REVIEW_APPLICATIONS, DELETE_APPLICATION } from '../actions/types';

const INITIAL_STATE = {
  form_subject:'',
  form_body:'',
  property_id: '',
  tenant_id: '',
  pmId: ''
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
  default:
    return state;
  }
}
