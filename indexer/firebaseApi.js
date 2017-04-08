const admin = require('firebase-admin');
const firebaseConfig = require('../config/firebase');
const serviceAccount = require('./firebase-service-account.json');

// console.log(firebaseConfig.firebaseConfig.databaseURL);
// Initialize the app with a service account, granting admin privileges
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: firebaseConfig.firebaseConfig.databaseURL,
});

// As an admin, the app has access to read and write all data, regardless of Security Rules
const db = admin.database();
const firebaseAdminDb = db.ref('/');

module.exports = {
  firebaseAdminDb,
};
