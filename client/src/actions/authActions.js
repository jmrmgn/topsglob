import axios from 'axios';
import jwt_decode from 'jwt-decode';

import { setAuthToken } from '../utils/setAuthToken';

import { showFlash, hideFlash } from './flashActions';

import {
   AUTH_REQUEST, AUTH_ERROR, AUTH_SUCCESS, SET_CURRENT_USER, UPDATE_PROFILE
} from './types';

export const postRegister = (userData, history) => async dispatch => {
   try {
      await dispatch({ type: AUTH_REQUEST });
      await axios.post('/api/users/register', userData);
      await dispatch({ type: AUTH_SUCCESS });
      history.push('/login');
   }
   catch(err) {
      dispatch({ type: AUTH_ERROR, payload: err.response.data.errors });
      (typeof err.response.data.errors === 'string')
         ? dispatch(showFlash(err.response.data))
         : dispatch(hideFlash())
   }
};

export const postLogin = (userData, history) => async dispatch => {
   try {
      await dispatch({ type: AUTH_REQUEST });
      const res = await axios.post('/api/users/login', userData);
      
      const { token } = res.data;
      // Set the token to Local Storage
      localStorage.setItem('jwtToken', token);
      // Set token to auth header
      setAuthToken(token);
      // Decode the token to get the user data
      const decoded = jwt_decode(token);
      // set current user
      dispatch(setCurrentUser(decoded));

      await dispatch({ type: AUTH_SUCCESS });
      await dispatch(hideFlash());
      history.push('/posts');
   }
   catch(err) {
      dispatch({ type: AUTH_ERROR, payload: err.response.data.errors });
      (typeof err.response.data.errors === 'string')
         ? dispatch(showFlash(err.response.data))
         : dispatch(hideFlash())
   }
};

export const setCurrentUser = decoded => {
   return {
      type: SET_CURRENT_USER,
      payload: decoded
   }
};

export const updateUserProfile = data => async dispatch => {
   try {
      dispatch({ type: AUTH_REQUEST });
      const res = await axios.put('/api/users/profile', data);
      dispatch({
         type: UPDATE_PROFILE,
         payload: data.bio
      });

      // Get the token
      const { token } = res.data;
      // Set the token to Local Storage
      localStorage.setItem('jwtToken', token);
      // Set token to auth header
      setAuthToken(token);
      // Decode the token to get the user data
      const decoded = jwt_decode(token);
      // set current user
      dispatch(setCurrentUser(decoded));
      dispatch({ type: AUTH_SUCCESS });
   }
   catch(err) {
      dispatch({ type: AUTH_ERROR, payload: err.response.data.errors });
   }
};

export const changePassword = (userData, history) => async dispatch => {
   try {
      dispatch({ type: AUTH_REQUEST });
      await axios.put('/api/users/changePassword', userData);
      dispatch({ type: AUTH_SUCCESS });
      dispatch(hideFlash());
      history.push('/profile');
   }
   catch(err) {
      dispatch({ type: AUTH_ERROR, payload: err.response.data.errors });
      (typeof err.response.data.errors === 'string')
         ? dispatch(showFlash(err.response.data))
         : dispatch(hideFlash());
   }
};

export const logoutUser = () => dispatch => {
   // Remove token from Localstorage
   localStorage.removeItem('jwtToken');
   // Remove auth header
   setAuthToken(false);
   // Set the current user to empty object
   dispatch(setCurrentUser({}));
}