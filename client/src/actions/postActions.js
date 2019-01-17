import axios from 'axios';

import {
   POST_LOADING,
   POST_REQUEST,
   POST_ERROR,
   POST_SUCCESS,
   GET_POSTS
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

export const getPosts = () => async dispatch => {
   try {
      await dispatch({ type: POST_LOADING });
      const res = await axios.get('/api/posts');
      dispatch({
         type: GET_POSTS,
         payload: res.data
      });
   }
   catch (err) {
      dispatch({ type: POST_ERROR, payload: err.response.data.errors });      
   }
}