import {
   USER_LOADING, GET_USERS, USER_ERROR
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
         }
      
      case GET_USERS:
         return {
            ...state,
            isFetching: false,
            users: action.payload
         }
   
      default:
         return state;
   }
};