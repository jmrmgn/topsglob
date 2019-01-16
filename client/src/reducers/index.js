import { combineReducers } from 'redux';
import flashReducer from './flashReducer';
import authReducer from './authReducer';

export default combineReducers({
   flash: flashReducer,
   auth: authReducer
});