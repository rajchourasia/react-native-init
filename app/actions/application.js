import { AsyncStorage } from 'react-native';
import * as types from './types';

export const homeSearchToggle = (status) =>
  (dispatch) =>
    dispatch({
      type: types.SET_HOME_SEARCH_STATUS,
      status,
    });

export const appSetReadingStatus = (bookGrid, userId) =>
      (dispatch) => {
        const reading = {
          status: true,
          bookGrid,
        };
        // Store in AsyncStorage.
        AsyncStorage.setItem(`@Application:${userId}:reading`, JSON.stringify(reading))
        .catch(err => console.log(err));

        return dispatch({
          type: types.SET_READING_STATUS,
          reading,
        });
      };

export const getApplicationReading = (userId) =>
(dispatch) => {
  AsyncStorage.getItem(`@Application:${userId}:reading`).then((readingStr) => {
    if (readingStr) {
      const reading = JSON.parse(readingStr);
      return dispatch({
        type: types.SET_READING_STATUS,
        reading,
      });
    }
    return null;
  }).catch(err => console.log(err));
};
