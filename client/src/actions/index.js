import * as type from './types';
import photos from '../apis/photos';
import history from '../history';

export const signIn = (userId) => {
  return {
    type: type.SIGN_IN,
    payload: userId,
  };
};

export const signOut = () => {
  return {
    type: type.SIGN_OUT,
  };
};

export const createPhoto = (formValues) => {
  return async (dispatch, getState) => {
    // POST request with axios to create new photo with current userId
    const { userId } = getState().auth;
    const response = await photos.post('/photos', { ...formValues, userId });
    dispatch({
      type: type.CREATE_PHOTO,
      payload: response.data,
    });
    // Navigate the user back to list of photos (only after the API request is resolved)
    history.push('/');
  };
};
