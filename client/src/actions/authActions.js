import axios from 'axios';
import jwt_decode from 'jwt-decode';

import { setAuthToken } from '../utils/setAuthToken';

import { showFlash, hideFlash } from './flashActions';

import {
   AUTH_REQUEST, AUTH_ERROR, AUTH_SUCCESS, SET_CURRENT_USER
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
}

export const logoutUser = () => dispatch => {
   // Remove token from Localstorage
   localStorage.removeItem('jwtToken');
   // Remove auth header
   setAuthToken(false);
   // Set the current user to empty object
   dispatch(setCurrentUser({}));
}