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

export const hoverPhoto = (photoId) => {
  return {
    type: type.HOVER_PHOTO,
    payload: photoId,
  };
};

export const leavePhoto = () => {
  return {
    type: type.LEAVE_PHOTO,
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

export const fetchPhotos = () => {
  return async (dispatch) => {
    // GET request with axios to get all photos
    const response = await photos.get('/photos');
    dispatch({
      type: type.FETCH_PHOTOS,
      payload: response.data,
    });
  };
};

export const fetchPhoto = (id) => {
  return async (dispatch) => {
    // GET request for specific photo with given id
    const response = await photos.get(`/photos/${id}`);
    dispatch({
      type: type.FETCH_PHOTO,
      payload: response.data,
    });
  };
};

export const editPhoto = (id, formValues) => {
  return async (dispatch) => {
    // PATCH request with axios to edit specific photo with new formValues
    const response = await photos.patch(`/photos/${id}`, formValues);
    dispatch({
      type: type.EDIT_PHOTO,
      payload: response.data,
    });
    // Navigate the user back to list of streams (only after API request is resolved)
    history.push('/');
  };
};

export const deletePhoto = (id) => {
  return async (dispatch) => {
    // DELETE request with axios to remove specific photo
    await photos.delete(`/photos/${id}`);
    dispatch({
      type: type.DELETE_PHOTO,
      payload: id,
    });
    // Navigate the user back to list of streams (only after API request is resolved)
    history.push('/');
  };
};
