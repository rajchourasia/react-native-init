import { combineReducers } from 'redux';
import * as applicationReducer from './application';
import * as usersReducer from './users';
import * as shelvesReducer from './shelves';
import * as booksReducer from './books';

export default combineReducers(Object.assign(
  applicationReducer,
  usersReducer,
  shelvesReducer,
  booksReducer
));
