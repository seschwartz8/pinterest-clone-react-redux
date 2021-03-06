import * as type from './types';
import photos from '../apis/photos';
import history from '../history';

// SEARCH ACTIONS
export const setSearchInput = (input) => {
  return {
    type: type.SET_SEARCH_INPUT,
    payload: input,
  };
};

// AUTH ACTIONS

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

// PIN ACTIONS

export const pinPhoto = (photo) => {
  return async (dispatch, getState) => {
    // POST request with axios to pin photo to current user's board
    const { userId } = getState().auth;

    const response = await photos.post('/pins', {
      ...photo,
      pinnedBy: userId,
    });
    dispatch({
      type: type.PIN_PHOTO,
      payload: response.data,
    });
  };
};

export const unPinPhoto = (id) => {
  return async (dispatch) => {
    // DELETE request with axios to remove specific pinned photo
    await photos.delete(`/pins/${id}`);
    dispatch({
      type: type.UNPIN_PHOTO,
      payload: id,
    });
    // Programmatically refresh the page to show the pin is removed
    window.location.reload();
  };
};

export const fetchPins = () => {
  return async (dispatch) => {
    // GET request with axios to get all pinned photos
    const response = await photos.get('/pins');

    dispatch({
      type: type.FETCH_PINS,
      payload: response.data,
    });
  };
};

// HOVER ACTIONS

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

// PHOTO ACTIONS

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
