import * as type from '../actions/types';
import _ from 'lodash';

export default (state = {}, action) => {
  switch (action.type) {
    case type.PIN_PHOTO:
      return { ...state, [action.payload.id]: action.payload };
    case type.FETCH_PINS:
      // Use lodash to take the array returned as payload and map it to my object of pins
      // Use the id property of each pin in the array as its key in the new merged object
      return { ...state, ..._.mapKeys(action.payload, 'id') };
    case type.UNPIN_PHOTO:
      // Use lodash to remove pin with the id given in the payload
      return _.omit(state, action.payload);
    default:
      return state;
  }
};
