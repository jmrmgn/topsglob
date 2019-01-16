import axios from 'axios';

import {
   POST_REQUEST,
   POST_ERROR,
   POST_SUCCESS
} from './types';

export const addPost = postData => async dispatch => {
   try {
      dispatch({ type: POST_REQUEST });
      const res = await axios.post('/api/posts', postData);
      dispatch({
         type: POST_SUCCESS,
         payload: res.data
      });
   }
   catch (err) {
      dispatch({ type: POST_ERROR, payload: err.response.data.errors });      
   }
};