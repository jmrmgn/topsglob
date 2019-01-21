import {
   USER_LOADING, USER_ERROR,
   GET_USERS, GET_USER
} from '../actions/types';

const initialState = {
   isFetching: false,
   users: [],
   user: {},
   errors: {}
};

export default (state = initialState, action) => {
   switch (action.type) {
      case USER_LOADING:
         return {
            ...state,
            isFetching: true
         };

      case USER_ERROR:
         return {
            ...state,
            isFetching: false,
            errors: action.payload
         };
      
      case GET_USERS:
         return {
            ...state,
            isFetching: false,
            users: action.payload
         };

      case GET_USER:
         return {
            ...state,
            isFetching: false,
            user: action.payload
         };
   
      default:
         return state;
   }
};