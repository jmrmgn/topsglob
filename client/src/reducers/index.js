import { combineReducers } from 'redux';
import flashReducer from './flashReducer';
import authReducer from './authReducer';
import postReducer from './postReducer';

export default combineReducers({
   flash: flashReducer,
   auth: authReducer,
   post: postReducer
});