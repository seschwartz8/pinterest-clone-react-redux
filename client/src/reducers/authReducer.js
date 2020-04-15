import * as type from '../actions/types';

const INITIAL_STATE = {
  isSignedIn: null,
  userId: null,
  board: [],
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case type.SIGN_IN:
      return { ...state, isSignedIn: true, userId: action.payload };
    case type.SIGN_OUT:
      return { ...state, isSignedIn: false, userId: null };
    case type.PIN_PHOTO:
      return { ...state, board: [action.payload, ...state.board] };
    case type.FETCH_BOARD:
      return { ...state, board: action.payload };
    default:
      return state;
  }
};
