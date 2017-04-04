import { firebaseAuth } from './firebaseInit';

const getFirebaseCreds = (gid) => {
  const email = `${gid}@goodreads.com`;
  const password = gid;
  return {
    email,
    password,
  };
};

class FirebaseAuthentication {
  static isLoggedIn() {
    return true && firebaseAuth.currentUser;
  }
  static loginSignup(gid) {
    const email = getFirebaseCreds(gid).email;
    return new Promise((resolve, reject) => {
      firebaseAuth.fetchProvidersForEmail(email).then((providers) => {
        if (providers.length > 0) {
          resolve(FirebaseAuthentication.logIn(gid));
        } else {
          resolve(FirebaseAuthentication.signUp(gid));
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
    const creds = getFirebaseCreds(gid);
    return firebaseAuth.signInWithEmailAndPassword(creds.email, creds.password)
    .catch((error) => {
      console.log(error);
    });
  }
  static signUp(gid) {
    if (!gid) {
      return null;
    }
    const creds = getFirebaseCreds(gid);
    return firebaseAuth.createUserWithEmailAndPassword(creds.email, creds.password)
    .catch((error) => {
      console.log(error);
    });
  }
}

export default FirebaseAuthentication;
