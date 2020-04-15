import { combineReducers } from 'redux';
import authReducer from './authReducer';
import photoReducer from './photoReducer';
import pinReducer from './pinReducer';
import hoverPhotoReducer from './hoverPhotoReducer';
// Import redux form's built inreducer
import { reducer as reduxFormReducer } from 'redux-form';

export default combineReducers({
  auth: authReducer,
  form: reduxFormReducer,
  photos: photoReducer,
  pins: pinReducer,
  isHoverPhoto: hoverPhotoReducer,
});
