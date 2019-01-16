import axios from 'axios';

export const setAuthToken = token => {
   if (token) {
      // apply set of headers in every request
      axios.defaults.headers.common['Authorization'] = token;
   }
   else {
      // Delete auth header
      delete axios.defaults.headers.common['Authorization'];
   }
};