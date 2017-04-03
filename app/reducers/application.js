import createReducer from '../lib/createReducer';
import * as types from '../actions/types';

export const application = createReducer({
  initialiased: false,
  authenticated: false,
  homeSearchStatus: false,
}, {
  [types.LOG_IN](state) {
    return Object.assign({}, state, {
      initialiased: true,
      authenticated: true,
    });
  },
  [types.APP_INIT](state) {
    return Object.assign({}, state, {
      initialiased: true,
    });
  },
  [types.LOG_OUT](state) {
    return Object.assign({}, state, {
      authenticated: false,
    });
  },
  [types.SET_HOME_SEARCH_STATUS](state, action) {
    return Object.assign({}, state, {
      homeSearchStatus: action.status,
    });
  },
});
