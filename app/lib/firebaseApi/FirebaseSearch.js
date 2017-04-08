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
    const newQuery = query;
    if (matchWholePhrase) {
      const addQuery = {
        // match_phrase matches the phrase exactly instead of breaking it
        // into individual words
        "match_phrase": {
          // this is the field name, _all is a meta indicating any field
          "_all": term
        },
        /**
         * Match breaks up individual words and matches any
         * This is the equivalent of the `q` string below
        "match": {
          "_all": term
        }
        */
      };
      newQuery.body = Object.assign(addQuery, query.body);
    } else {
      newQuery.q = `${term}*`;
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
