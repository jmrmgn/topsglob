import axios from 'axios';

import {
   USER_LOADING, USER_ERROR, GET_USERS
} from './types';

export const getUsers = () => async dispatch => {
   try {
      dispatch({ type: USER_LOADING });
      const res = await axios.get('/api/users');
      dispatch({
         type: GET_USERS,
         payload: res.data
      });
   }
   catch (err) {
      dispatch({ type: USER_ERROR, payload: err.response.data.errors });
   }
};