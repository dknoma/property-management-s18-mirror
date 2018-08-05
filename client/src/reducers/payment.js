import { PAY_RENT } from '../actions/types';

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

  case PAY_RENT:
    return {...state,
      propertyTenant: action.payload
    }


  default:
    return state;
  }
}
