import { combineReducers } from 'redux';
import authReducer from './authReducer';
import photoReducer from './photoReducer';

export default combineReducers({
  auth: authReducer,
  photos: photoReducer,
});
