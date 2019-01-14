import axios from 'axios';

import { AUTH_REQUEST, AUTH_ERROR } from './types';

export const postRegister = (userData, history) => async dispatch => {
   try {
      await axios.post('/api/users/register', userData);
      history.push('/login');
   }
   catch(err) {
      dispatch({ type: AUTH_ERROR, payload: err.response.data.errors });
   }
};