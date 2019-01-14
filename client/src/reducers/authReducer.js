import { AUTH_REQUEST } from '../actions/types';

const initialState = {
   isAuthenticated: false,   
   user: {},
   errors: {}
};

export default ( state = initialState, action ) => {
   switch (action.type) {
      default:
         return state;
   }
};