import { combineReducers } from 'redux';
import flashReducer from './flashReducer';
import authReducer from './authReducer';
import postReducer from './postReducer';
import userReducer from './userReducer';

export default combineReducers({
   flash: flashReducer,
   auth: authReducer,
   post: postReducer,
   user: userReducer
});