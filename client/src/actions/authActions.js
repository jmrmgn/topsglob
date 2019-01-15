import axios from 'axios';

import { AUTH_REQUEST, AUTH_ERROR, AUTH_SUCCESS } from './types';

export const postRegister = (userData, history) => async dispatch => {
   try {
      await dispatch({ type: AUTH_REQUEST });
      await axios.post('/api/users/register', userData);
      await dispatch({ type: AUTH_SUCCESS });
      history.push('/login');
   }
   catch(err) {
      dispatch({ type: AUTH_ERROR, payload: err.response.data.errors });
   }
};