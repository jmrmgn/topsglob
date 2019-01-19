import axios from 'axios';

import {
   POST_LOADING,
   POST_REQUEST,
   POST_ERROR,
   POST_SUCCESS,
   GET_POSTS,
   GET_LIKE_UNLIKE_POST,
   GET_POST,
   GET_USER_POST
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
};

export const getPost = id => async dispatch => {
   try {
      const res = await axios.get(`/api/posts/${id}`);
      dispatch({
         type: GET_POST,
         payload: res.data
      });
   }
   catch (err) {
      dispatch({ type: POST_ERROR, payload: err.response.data.errors });
   }
};

export const getLikeUnlikePost = id => async dispatch => {
   try {
      const res = await axios.get(`/api/posts/${id}`);
      dispatch({
         type: GET_LIKE_UNLIKE_POST,
         payload: res.data
      });
   }
   catch (err) {
      dispatch({ type: POST_ERROR, payload: err.response.data.errors });
   }
};

export const likePost = id => async dispatch => {
   try {
      await axios.put(`/api/posts/${id}/like`);
      dispatch(getLikeUnlikePost(id));
   }
   catch (err) {
      dispatch({ type: POST_ERROR, payload: err.response.data.errors });
   }
};

export const unlikePost = id => async dispatch => {
   try {
      await axios.put(`/api/posts/${id}/unlike`);
      dispatch(getLikeUnlikePost(id));
   }
   catch (err) {
      dispatch({ type: POST_ERROR, payload: err.response.data.errors });
   }
};

export const getCurrentPosts = userId => async dispatch => {
   try {
      await dispatch({ type: POST_LOADING });
      const res = await axios.get(`/api/users/${userId}/posts`);
      dispatch({
         type: GET_USER_POST,
         payload: res.data
      });
      console.log(res.data);
   }
   catch (err) {
      dispatch({ type: POST_ERROR, payload: err.response.data.errors });
   }
};