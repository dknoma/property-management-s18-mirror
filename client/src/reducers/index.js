// This will house our combined reducers call
import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import auth from './auth'
import property from './property'

export default combineReducers({
  auth,
  form: formReducer,
  property
});