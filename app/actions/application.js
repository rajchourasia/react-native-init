import * as types from './types';

export const homeSearchToggle = (status) =>
  (dispatch) =>
    dispatch({
      type: types.SET_HOME_SEARCH_STATUS,
      status,
    });
