import axios from 'axios';

import {
   POST_LOADING,
   LOAD_MORE,
   POST_REQUEST,
   POST_ERROR,
   POST_SUCCESS,
   GET_POSTS,
   GET_UPDATED_POST,
   GET_POST,
   GET_USER_POST,
   DELETE_POST
} from './types';

import { hideModal } from './modalActions';

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

export const getPosts = (limit=3, page=1) => async dispatch => {
   try {
      if (page > 1) {
         await dispatch({ type: LOAD_MORE });
      }
      else {
         await dispatch({ type: POST_LOADING });
      }
      
      const res = await axios.get(`/api/posts?perPage=${limit}&page=${page}`);
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

export const getUpdatedPost = id => async dispatch => {
   try {
      const res = await axios.get(`/api/posts/${id}`);
      dispatch({
         type: GET_UPDATED_POST,
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
      dispatch(getUpdatedPost(id));
   }
   catch (err) {
      dispatch({ type: POST_ERROR, payload: err.response.data.errors });
      alert(err.response.data);
   }
};

export const unlikePost = id => async dispatch => {
   try {
      await axios.put(`/api/posts/${id}/unlike`);
      dispatch(getUpdatedPost(id));
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
   }
   catch (err) {
      dispatch({ type: POST_ERROR, payload: err.response.data.errors });
   }
};

export const deletePost = postId => async dispatch => {
   try {
      await axios.delete(`/api/posts/${postId}`);
      dispatch({
         type: DELETE_POST,
         payload: postId
      })
   }
   catch (err) {
      dispatch({ type: POST_ERROR, payload: err.response.data.errors });
   }
};

export const updatePost = (data, postId) => async dispatch => {
   try {
      await axios.put(`/api/posts/${postId}`, data);
      dispatch(getUpdatedPost(postId));
      dispatch(hideModal());
   }
   catch (err) {
      dispatch({ type: POST_ERROR, payload: err.response.data.errors });
   }
};