import * as types from './types';

export const homeSearchToggle = (status) =>
  (dispatch) =>
    dispatch({
      type: types.SET_HOME_SEARCH_STATUS,
      status,
    });

export const appSetReadingStatus = (bookGrid) =>
      (dispatch) =>
        dispatch({
          type: types.SET_READING_STATUS,
          status: true,
          bookGrid,
        });
