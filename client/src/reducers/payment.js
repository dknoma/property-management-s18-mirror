import { PAY_RENT, VIEW_RENT } from '../actions/types';

const INITIAL_STATE = {
  propertyTenant : null,
  tenantPayment: null
};

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {

  case PAY_RENT:
    return {...state,
      tenantPayment: action.payload
    }

  case VIEW_RENT:
    return {...state,
      propertyTenant: action.payload
    }

  default:
    return state;
  }
}
