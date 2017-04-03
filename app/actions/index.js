import * as UsersActions from './users';
import * as ShelvesActions from './shelves';
import * as BookActions from './books';
import * as ApplicatonActions from './application';

export const ActionCreators = Object.assign({},
  UsersActions,
  ShelvesActions,
  BookActions,
  ApplicatonActions
);
