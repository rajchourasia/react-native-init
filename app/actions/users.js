import * as types from './types';
import GoodreadsApi from '../lib/goodreadsApi';

export function getUserDetails(uid) {
  return (dispatch) => {
    const url = `http://www.goodreads.com/user/show/${uid}.xml`;
    return GoodreadsApi.get(url)
      .then(resp => {
        const userObject = resp.data.GoodreadsResponse.user;
        const user = {
          image: {
            default: userObject.image_url.text,
            small: userObject.small_image_url.text,
          },
        };
        return dispatch({
          type: types.LOG_IN,
          user,
        });
      })
      .catch(err => console.log(err));
  };
}

export function getAuthenticatedUser() {
  return (dispatch) => {
    const url = 'http://www.goodreads.com/api/auth_user';
    return GoodreadsApi.get(url)
      .then(resp => {
        const userObject = resp.data.GoodreadsResponse.user;
        const user = {
          id: userObject.id,
          name: userObject.name.text,
          link: userObject.link.text,
          initialiased: true,
        };
        dispatch(getUserDetails(user.id));

        return dispatch({
          type: types.LOG_IN,
          user,
        });
      })
      .catch(err => {
        console.log(err);
        const user = {
          initialiased: true,
        };
        return dispatch({
          type: types.USER_INIT,
          user,
        });
      });
  };
}

export function logIn() {
  return (dispatch) =>
    GoodreadsApi.authorize()
      .then(() => dispatch(getAuthenticatedUser()))
      .catch(err => console.log(err));
}

export function logOut() {
  return (dispatch) =>
    GoodreadsApi.deauthorize()
      .then(() => dispatch({
        type: types.LOG_OUT,
      }))
      .catch(err => console.log(err));
}
