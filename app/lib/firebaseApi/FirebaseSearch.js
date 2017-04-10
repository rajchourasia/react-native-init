import { firebaseDB } from './firebaseInit';

const searchRef = firebaseDB.child('search');

class FirebaseSearch {
  static buildQuery(index, type, term) {
    // this just gets data out of the form
    const matchWholePhrase = false;
    const size = 20;
    const from = 0;

    // skeleton of the JSON object we will write to DB
    const query = {
      index,
      type,
    };

    // size and from are used for pagination
    if (!isNaN(size)) { query.size = size; }
    if (!isNaN(from)) { query.from = from; }

    const newQuery = FirebaseSearch.buildQueryBody(query, term, matchWholePhrase);
    return newQuery;
  }
  static buildQueryBody(query, term, matchWholePhrase) {
    const addquery = {
      body: {
        query: {
          match_phrase_prefix: {
            name: term,
          },
        },
      },
    };
    const newQuery = Object.assign({}, addquery, query);
    if (matchWholePhrase) {
      // Do nothing.
    }
    return newQuery;
  }
  static search(text) {
    const query = FirebaseSearch.buildQuery('firebase', 'word', text);
    const key = searchRef.child('request').push(query).key;

    console.log('search', key, query);
    // $('#query').text(JSON.stringify(query, null, 2));
    return new Promise((resolve, reject) => {
      function showResults(snap) {
        if (!snap.exists()) {
          return;
        } // wait until we get data
        const data = snap.val();

        // when a value arrives from the database, stop listening
        // and remove the temporary data from the database
        snap.ref.off('value', FirebaseSearch.showResults);
        snap.ref.remove();
        // the rest of this just displays data in our demo and probably
        // isn't very interesting

        resolve(data);
        return;
      }
      searchRef.child(`response/${key}`).on('value', showResults);
    });
  }

}

export default FirebaseSearch;
