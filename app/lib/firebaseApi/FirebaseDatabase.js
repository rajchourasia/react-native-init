import { firebaseDB } from './firebaseInit';

class FirebaseDatabase {
  static push(path, value) {
    if (path && value) {
      // Get a key for a new Post.
      const newPostKey = firebaseDB.child(path).push().key;
      // Write the new post's data simultaneously in the posts list and the user's post list.
      const updates = {};
      updates[`${path}/${newPostKey}`] = value;

      return firebaseDB.update(updates);
    }
    return null;
  }

  static set(path, value) {
    if (path && value) {
      return firebaseDB.set(path, value);
    }
    return null;
  }

  static update(path, value) {
    if (path && value) {
      const updates = {
        [path]: value,
      }
      return firebaseDB.update(updates);
    }
    return null;
  }

  static getByFieldValue(path, field, value) {
    return firebaseDB.child(path).orderByChild(field).equalTo(value).once('value')
    .then((objectSnap) => {
      if (objectSnap.val()) {
        return objectSnap.val();
      }
      return null;
    })
    .catch(err => {
      console.log(err);
    });
  }
}

export default FirebaseDatabase;
