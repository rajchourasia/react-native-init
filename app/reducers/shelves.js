import createReducer from '../lib/createReducer';
import * as types from '../actions/types';

export const shelves = createReducer({}, {
  [types.SHELF_INSERT](state, action) {
    const newState = state;
    newState[action.shelfName] = action.shelf;
    return newState;
  },
  [types.SHELF_UPDATE](state, action) {
    const newState = state;
    newState[action.shelfName] = Object.assign({}, state[action.shelfName], action.shelf);
    return newState;
  },
});
