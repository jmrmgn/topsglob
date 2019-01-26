import { combineReducers } from 'redux';
import flashReducer from './flashReducer';
import modalReducer from './modalReducer';
import authReducer from './authReducer';
import postReducer from './postReducer';
import userReducer from './userReducer';

export default combineReducers({
   flash: flashReducer,
   modal: modalReducer,
   auth: authReducer,
   post: postReducer,
   user: userReducer
});