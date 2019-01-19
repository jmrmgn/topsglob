import isEmpty from '../validation/isEmpty';
import {
   AUTH_REQUEST, AUTH_ERROR, AUTH_SUCCESS, SET_CURRENT_USER,
   UPDATE_PROFILE
} from '../actions/types';

const initialState = {
   isPosting: false,
   isAuthenticated: false,
   user: {},
   errors: {}
};

export default ( state = initialState, action ) => {
   switch (action.type) {

      case UPDATE_PROFILE:
         return {
            ...state,
            isPosting: false,
            user: {
               ...state.user,
               bio: action.payload
            },
            errors: {}
         };

      case SET_CURRENT_USER:
         return {
            ...state,
            isAuthenticated: !isEmpty(action.payload),
            user: action.payload
         };

      case AUTH_ERROR:
         return {
            ...state,
            errors: action.payload,
            isPosting: false
         };
      
      case AUTH_REQUEST:
         return {
            ...state,
            isPosting: true,
            errors: {}
         };

      case AUTH_SUCCESS:
         return {
            ...state,
            isPosting: false,
            errors: {}
         };

      default:
         return state;
   }
};