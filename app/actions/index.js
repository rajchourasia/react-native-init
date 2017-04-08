import * as UsersActions from './users';
import * as ShelvesActions from './shelves';
import * as BooksActions from './books';
import * as ApplicatonActions from './application';
import * as WordsActions from './words';

export const ActionCreators = Object.assign({},
  UsersActions,
  ShelvesActions,
  BooksActions,
  ApplicatonActions,
  WordsActions
);
