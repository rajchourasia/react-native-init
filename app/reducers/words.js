import findKey from 'lodash/findKey';
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

const searchClear = (state) => {
  const newState = Object.assign({}, state);
  newState.meta.wordSearchList = null;
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

const wordMetaSet = (state, action) => {
  const newState = Object.assign({}, state);
  newState.entities = Object.assign({}, newState.entities, action.entities);
  newState.meta[action.metaPropName] = action.wordIds;
  return newState;
};

const wordMetaMerge = (state, action) => {
  const newState = Object.assign({}, state);
  newState.entities = Object.assign({}, newState.entities, action.entities);
  if (typeof newState.meta[action.metaPropName] !== 'undefined') {
    newState.meta[action.metaPropName]
    = Object.assign({}, newState.meta[action.metaPropName], action.wordIds);
  } else {
    newState.meta[action.metaPropName]
    = action.wordIds;
  }
  return newState;
};

const wordMetaPrepend = (state, action) => {
  const newState = Object.assign({}, state);
  const wordId = action.wordId;
  const metaPropName = action.metaPropName;
  if (newState.meta[metaPropName] && newState.meta[metaPropName].length) {
    if (!findKey(newState.meta[metaPropName], (o) => o === wordId)) {
      newState.meta[metaPropName].unshift(wordId);
    }
  } else {
    newState.meta[metaPropName] = [];
    newState.meta[metaPropName].push(wordId);
  }
  return newState;
};

export const words = createReducer(defaultState, {
  [types.WORD_SEARCH_UPDATE](state, action) {
    return searchUpdate(state, action);
  },
  [types.WORD_SEARCH_CLEAR](state) {
    return searchClear(state);
  },
  [types.WORD_UPDATE](state, action) {
    return wordUpdate(state, action);
  },
  [types.WORD_META_SET](state, action) {
    return wordMetaSet(state, action);
  },
  [types.WORD_META_MERGE](state, action) {
    return wordMetaMerge(state, action);
  },
  [types.WORD_META_PREPEND](state, action) {
    return wordMetaPrepend(state, action);
  },
});
