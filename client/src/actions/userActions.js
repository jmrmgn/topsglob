import axios from 'axios';

import {
   USER_LOADING, USER_ERROR, GET_USERS, GET_USER
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

export const getUser = userId => async dispatch => {
   try {
      dispatch({ type: USER_LOADING });
      const res = await axios.get(`/api/users/${userId}`);
      dispatch({
         type: GET_USER,
         payload: res.data
      });
   }
   catch (err) {
      dispatch({ type: USER_ERROR, payload: err.response.data.errors });
   }
};