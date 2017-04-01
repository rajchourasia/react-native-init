import { combineReducers } from 'redux';
import * as applicationReducer from './application';
import * as usersReducer from './users';

export default combineReducers(Object.assign(
  applicationReducer,
  usersReducer
));
