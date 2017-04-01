import createReducer from '../lib/createReducer';
import * as types from '../actions/types';

export const user = createReducer({}, {
  [types.LOG_IN](state, action) {
    return Object.assign({}, state, action.user);
  },
  [types.UPDATE_USER_DETAILS](state, action) {
    return Object.assign({}, state, action.user);
  },
  [types.LOG_OUT]() {
    return Object.assign({}, {});
  },
});
