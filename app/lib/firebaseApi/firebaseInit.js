import firebase from 'firebase';
import { firebaseConfig } from '../../../config/firebase';

 // Initialize Firebase
const config = {
  apiKey: firebaseConfig.apiKey,
  authDomain: firebaseConfig.authDomain,
  databaseURL: firebaseConfig.databaseURL,
  storageBucket: firebaseConfig.storageBucket,

};

firebase.initializeApp(config);
export const firebaseDB = firebase.database().ref('/');
export const firebaseAuth = firebase.auth();
