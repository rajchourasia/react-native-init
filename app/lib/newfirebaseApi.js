import firebase from 'firebase';
import { firebaseConfig } from '../../config/firebase';

 // Initialize Firebase
const config = {
  apiKey: firebaseConfig.apiKey,
  authDomain: firebaseConfig.authDomain,
  databaseURL: firebaseConfig.databaseURL,
  storageBucket: firebaseConfig.storageBucket,

};

firebase.initializeApp(config);
const firebaseDB = firebase.database().ref('/');
const firebaseUser = firebase.auth().currentUser;

class FirebaseApi {
  static getFirebaseCreds(gid) {
    const email = `${gid}@goodreads.com`;
    const password = gid;
    return {
      email,
      password,
    };
  }
  static isLoggedIn() {
    return true && firebaseUser;
  }
  static loginSignup(gid) {
    const email = FirebaseApi.getFirebaseCreds(gid).email;
    return new Promise((resolve, reject) => {
      firebase.auth().fetchProvidersForEmail(email).then((providers) => {
        if (providers.length > 0) {
          resolve(FirebaseApi.logIn(gid));
        } else {
          resolve(FirebaseApi.signUp(gid));
        }
      }).catch((error) => {
        reject(error);
      });
    });
  }
  static logIn(gid) {
    if (!gid) {
      return null;
    }
    const creds = FirebaseApi.getFirebaseCreds(gid);
    return firebase.auth().signInWithEmailAndPassword(creds.email, creds.password)
    .catch((error) => {
      console.log(error);
    });
  }
  static signUp(gid) {
    if (!gid) {
      return null;
    }
    const creds = FirebaseApi.getFirebaseCreds(gid);
    return firebase.auth().createUserWithEmailAndPassword(creds.email, creds.password)
    .catch((error) => {
      console.log(error);
    });
  }
}

export default FirebaseApi;
