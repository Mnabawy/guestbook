import {combineReducers} from 'redux';
import { routerReducer as routing } from 'react-router-redux';
import authReducers from './authReducers';
import errorReducers from './errorReducers';
import appReducer from './appReducer';
import todoReducer from './todoReducer';

export default combineReducers({
  appState:appReducer,
  todoState: todoReducer,
  auth:authReducers,
  errors:errorReducers
})