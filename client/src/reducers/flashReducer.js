import { SHOW_FLASH, HIDE_FLASH } from '../actions/types';

const initialState = {
   showFlash: false,
   msg: '',
   status: ''
};

export default (state = initialState, action) => {
   switch (action.type) {
      case SHOW_FLASH:
         return {
            ...state,
            showFlash: true,
            msg: action.payload.errors,
            status: action.payload.status
         };

      case HIDE_FLASH:
         return {
            ...state,
            showFlash: false,
            msg: '',
            status: ''
         };

      default:
         return state;
   }
};
