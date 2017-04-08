import { combineReducers } from 'redux';
import * as applicationReducer from './application';
import * as usersReducer from './users';
import * as shelvesReducer from './shelves';
import * as booksReducer from './books';
import * as wordsReducer from './words';

export default combineReducers(Object.assign(
  applicationReducer,
  usersReducer,
  shelvesReducer,
  booksReducer,
  wordsReducer
));
