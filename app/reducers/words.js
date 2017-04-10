import createReducer from '../lib/createReducer';
import * as types from '../actions/types';

const defaultState = {
  entities: null,
  meta: {
    wordSearchList: null,
  },
};

const searchUpdate = (state, action) => {
  const newState = Object.assign({}, state);
  newState.entities = Object.assign({}, newState.entities, action.entities);
  newState.meta.wordSearchList = action.meta.wordSearchList;
  return newState;
};

const wordUpdate = (state, action) => {
  const newState = Object.assign({}, state);
  newState.entities[action.word.id] = Object.assign(
    {},
    state.entities[action.word.id],
    action.word
  );
  return newState;
};

export const words = createReducer(defaultState, {
  [types.WORD_SEARCH_UPDATE](state, action) {
    return searchUpdate(state, action);
  },
  [types.WORD_UPDATE](state, action) {
    return wordUpdate(state, action);
  },
});
