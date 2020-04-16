import * as type from '../actions/types';

const INITIAL_STATE = {
  searchInput: '',
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case type.SET_SEARCH_INPUT:
      return { ...state, searchInput: action.payload };
    default:
      return state;
  }
};
