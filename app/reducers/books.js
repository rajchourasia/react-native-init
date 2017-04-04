import createReducer from '../lib/createReducer';
import * as types from '../actions/types';

const booksDefaultState = {
  entities: null,
  meta: {
    homeList: null,
    homeSearchList: null,
  },
};

const insertWithoutMeta = (state, action) => {
  const newState = Object.assign({}, state);
  newState.entities = Object.assign({}, {}, action.entities);
  return newState;
};

const shelfUpdate = (state, action) => {
  const newState = Object.assign({}, state);
  newState.entities = Object.assign({}, newState.entities, action.entities);
  newState.meta.homeList = action.meta && action.meta.homeList
  && action.meta.homeList.concat(newState.meta.homeList);
  return newState;
};

const searchUpdate = (state, action) => {
  const newState = Object.assign({}, state);
  newState.entities = Object.assign({}, newState.entities, action.entities);
  newState.meta.homeSearchList = action.meta.homeSearchList;
  return newState;
};

const bookUpdate = (state, action) => {
  const newState = Object.assign({}, state);
  const book = action.book;
  newState.entities[book.id] = Object.assign(newState.entities[book.id], book);
  return newState;
};

export const books = createReducer(booksDefaultState, {
  [types.SHELF_INSERT](state, action) {
    return insertWithoutMeta(state, action);
  },
  [types.SHELF_UPDATE](state, action) {
    return shelfUpdate(state, action);
  },
  [types.BOOK_SEARCH_UPDATE](state, action) {
    return searchUpdate(state, action);
  },
  [types.BOOK_UPDATE](state, action) {
    return bookUpdate(state, action);
  },
});
