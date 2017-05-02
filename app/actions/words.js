import * as types from './types';
import FirebaseSearch from '../lib/firebaseApi/FirebaseSearch';
import PearsonApi from '../lib/pearsonApi';
import { FirebaseDatabase } from '../lib/firebaseApi';
import { modelWord } from '../utils/pearsonDataModel.js';

export const searchWords = (text) =>
  (dispatch) =>
    FirebaseSearch.search(text)
      .then(resp => {
        // console.log(resp);
        const data = resp;
        let wordIds = [];
        const wordList = {};
        if (data && data.hits && data.hits.total && data.hits.hits) {
          wordIds = data.hits.hits.map((value) => {
            const wordId = value._id;
            wordList[wordId] = {
              name: value._source.name,
              id: wordId,
            };
            return wordId;
          });
          const meta = {
            wordSearchList: wordIds,
          };
          return dispatch({
            type: types.WORD_SEARCH_UPDATE,
            entities: wordList,
            meta,
          });
        }
        return null;
      })
      .catch(err => console.log(err));

export const getWordDetails = (word) =>
    (dispatch) => {
      if (!word || !word.id) {
        return;
      }
      // Get the word from pearson.
      PearsonApi.search(word.name)
        .then(resp => {
          console.log(resp);
          if (resp && resp.count > 0 && resp.results && resp.results.length > 0) {
            const result = modelWord(resp.results, word);
            // const relatedWords = result.relatedWords;
            // Push info to firebase.
            // FirebaseDatabase.update(`words/${word.id}`, word);
            return dispatch({
              type: types.WORD_UPDATE,
              word: result.word,
              // relatedWords, @to Do something with related w
            });
          }
          return null;
        })
      .catch(err => console.log(err));
    };

export const clearSearchWords = () =>
  (dispatch) => dispatch({
    type: types.WORD_SEARCH_CLEAR,
  });

export const setWordView = (word, book, userId) =>
  (dispatch) => {
    const wordView = {
      name: word.name,
      userId,
      bookId: book.id,
      wordId: word.id,
      userId_bookId: `${userId}_${book.id}`,
      timestamp: +new Date(),
    };
    // Push info to firebase.
    FirebaseDatabase.push('relations/wordView', wordView).then((wordViewValue) => {
      if (wordViewValue) {
        return dispatch({
          type: types.WORD_META_PREPEND,
          wordId: word.id,
          metaPropName: `book/${book.id}/wordList`,
        });
      }
      return null;
    });
  };

export const getWordListByBookId = (bookId, userId) =>
    (dispatch) => {
      const filterValue = `${userId}_${bookId}`;
      const path = 'relations/wordView';
      // Check if books exixtes in Firebase.
      FirebaseDatabase.getByFieldValue(path, 'userId_bookId', filterValue).then((values) => {
        if (values) {
          const wordList = {};
          const wordIds = Object.keys(values).sort((a, b) =>
            values[b].timestamp - values[a].timestamp).map((value) => {
              const wordId = values[value].wordId;
              const name = values[value].name;
              wordList[wordId] = {
                name,
                id: wordId,
              };
              return wordId;
            });
          const metaPropName = `book/${bookId}/wordList`;
          return dispatch({
            type: types.WORD_META_SET,
            entities: wordList,
            wordIds,
            metaPropName,
          });
        }
        return null;
      });
    };
