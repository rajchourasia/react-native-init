import createReducer from '../lib/createReducer';
import * as types from '../actions/types';

export const user = createReducer({
  initialiased: false,
}, {
  [types.LOG_IN](state, action) {
    return Object.assign({}, state, action.user);
  },
  [types.USER_INIT](state, action) {
    return Object.assign({}, state, action.user);
  },
  [types.LOG_OUT]() {
    return Object.assign({}, {
      initialiased: true,
    });
  },
});
