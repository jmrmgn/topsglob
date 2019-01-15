import { AUTH_REQUEST, AUTH_ERROR, AUTH_SUCCESS } from '../actions/types';

const initialState = {
   isPosting: false,
   isAuthenticated: false,
   user: {},
   errors: {}
};

export default ( state = initialState, action ) => {
   switch (action.type) {
      case AUTH_ERROR:
         return {
            ...state,
            errors: action.payload,
            isPosting: false
         };
      
      case AUTH_REQUEST:
         return {
            ...state,
            isPosting: true
         };

      case AUTH_SUCCESS:
         return {
            ...state,
            isPosting: false
         };

      default:
         return state;
   }
};