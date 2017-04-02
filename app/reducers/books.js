import createReducer from '../lib/createReducer';
import * as types from '../actions/types';

export const books = createReducer({}, {
  [types.SHELF_INSERT](state, action) {
    return Object.assign({}, state, action.books);
  },
  [types.SHELF_UPDATE](state, action) {
    return Object.assign({}, state, action.books);
  },
});
