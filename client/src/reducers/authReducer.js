import { AUTH_REQUEST, AUTH_ERROR } from '../actions/types';

const initialState = {
   isAuthenticated: false,
   user: {},
   errors: {}
};

export default ( state = initialState, action ) => {
   switch (action.type) {
      case AUTH_ERROR:
         return {
            ...state,
            errors: action.payload
         };
      default:
         return state;
   }
};