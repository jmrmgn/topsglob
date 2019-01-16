import axios from 'axios';

import {
   SHOW_FLASH, HIDE_FLASH,
   AUTH_REQUEST, AUTH_ERROR, AUTH_SUCCESS
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
      if (typeof err.response.data.errors !== 'object') {
         dispatch({ type: SHOW_FLASH, payload: err.response.data.errors });
      }
   }
};

export const postLogin = (userData, history) => async dispatch => {
   try {
      await dispatch({ type: AUTH_REQUEST });
      await axios.post('/api/users/login', userData);
      await dispatch({ type: AUTH_SUCCESS });
      history.push('/');
      await dispatch({ type: HIDE_FLASH });
   }
   catch(err) {
      dispatch({ type: AUTH_ERROR, payload: err.response.data.errors });
      (typeof err.response.data.errors === 'string')
         ? dispatch({ type: SHOW_FLASH, payload: err.response.data })
         : dispatch({ type: HIDE_FLASH });
   }
};