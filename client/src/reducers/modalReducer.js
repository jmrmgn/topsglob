import {
   SHOW_MODAL, HIDE_MODAL
} from '../actions/types';

const initialState = {
   modalStatus: false
};

export default (state = initialState, action) => {
   switch (action.type) {
      case SHOW_MODAL:
         return {
            ...state,
            modalStatus: true
         };
         
      case HIDE_MODAL:
         return {
            ...state,
            modalStatus: false
         };
   
      default:
         return state;
   }
};