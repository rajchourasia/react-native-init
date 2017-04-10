import { AsyncStorage } from 'react-native';
import * as types from './types';
import GoodreadsApi from '../lib/goodreadsApi';
import { FirebaseAuthentication } from '../lib/firebaseApi';
import { modelUser } from '../utils/goodreadsDataModel';
import { getBooksFromAllShelves } from './shelves';

export function getUserDetails(uid) {
  return (dispatch) => {
    const url = `http://www.goodreads.com/user/show/${uid}.xml`;
    return GoodreadsApi.get(url)
      .then(resp => {
        const userObject = resp.data.GoodreadsResponse.user;
        const user = modelUser(userObject);
        if (user.shelves) {
          dispatch(getBooksFromAllShelves(user));
        }
        return dispatch({
          type: types.UPDATE_USER_DETAILS,
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
      .then((resp) => Promise.all(
        [FirebaseAuthentication.loginSignup(resp.data.GoodreadsResponse.user.id), resp]))
      .then((values) => {
        const grKey = values[1].data.GoodreadsResponse.Request.key.text;
        const userObject = values[1].data.GoodreadsResponse.user;
        const userFirebaseObject = values[0];
        const user = modelUser(userObject);
        user.fbUid = userFirebaseObject.uid;
        user.fbEmail = userFirebaseObject.email;
        user.initialiased = true;
        dispatch(getUserDetails(user.id));
        if (grKey) {
          // Store in AsyncStorage
          AsyncStorage.setItem('@Goodreads:key', grKey)
          .catch(err => console.log(err));
        }
        return dispatch({
          type: types.LOG_IN,
          user,
        });
      })
      .catch(err => {
        console.log(err);
        GoodreadsApi.deauthorize();
        return dispatch({
          type: types.APP_INIT,
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
