import {
   SHOW_FLASH, HIDE_FLASH
} from './types';

export const showFlash = errors => dispatch => {
   dispatch({
      type: SHOW_FLASH,
      payload: errors
   });
};

export const hideFlash = () => dispatch => {
   dispatch({
      type: HIDE_FLASH
   });
};