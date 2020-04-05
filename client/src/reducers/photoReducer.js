import * as type from '../actions/types';
import _ from 'lodash';

export default (state = {}, action) => {
  switch (action.type) {
    case type.FETCH_PHOTOS:
      // Use lodash to take the array returned as payload and map it to my object of photos
      // Use the id property of each photo in the array as its key in the new merged object
      return { ...state, ..._.mapKeys(action.payload, 'id') };
    case type.FETCH_PHOTO:
      // Using key interpolation to assign the property with a key of id and value of payload
      return { ...state, [action.payload.id]: action.payload };
    case type.CREATE_PHOTO:
      return { ...state, [action.payload.id]: action.payload };
    case type.EDIT_PHOTO:
      return { ...state, [action.payload.id]: action.payload };
    case type.DELETE_PHOTO:
      // Use lodash to remove stream with the id given in the payload
      return _.omit(state, action.payload);
    default:
      return state;
  }
};
