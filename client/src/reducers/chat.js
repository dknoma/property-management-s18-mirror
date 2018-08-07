import { START_CHAT } from '../actions/types';

const INITIAL_STATE = {
  receiverId: '',
  senderId: '',
  users: [],
};

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    default:
      return state;
  }
}
