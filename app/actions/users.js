import * as types from './types';

export function logIn() {
  return (dispatch) => dispatch({
    type: types.LOG_IN,
    user: {
      id: '1234',
      name: 'Full Name',
    },
  });
}

export function logOut() {
  return (dispatch) =>
    dispatch({
      type: types.LOG_OUT,
    });
}

export function initialiseUser() {
  return (dispatch) => dispatch({
    type: types.USER_INIT,
    user: { initialiased: true },
  });
}
