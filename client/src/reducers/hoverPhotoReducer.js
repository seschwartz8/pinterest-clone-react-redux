import * as type from '../actions/types';

export default (state = null, action) => {
  switch (action.type) {
    case type.HOVER_PHOTO:
      return action.payload;
    case type.LEAVE_PHOTO:
      return null;
    default:
      return state;
  }
};
