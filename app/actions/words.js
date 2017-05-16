import uniqBy from 'lodash/uniqBy';
import * as types from './types';
import { firebaseDB } from '../lib/firebaseApi/firebaseInit';
import FirebaseSearch from '../lib/firebaseApi/FirebaseSearch';
import PearsonApi from '../lib/pearsonApi';
import { FirebaseDatabase } from '../lib/firebaseApi';
import { modelWord } from '../utils/pearsonDataModel.js';

export const searchWords = (text) =>
  (dispatch) =>
  new Promise((resolve, reject) => {
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
          dispatch({
            type: types.WORD_SEARCH_UPDATE,
            entities: wordList,
            meta,
          });
          resolve(true);
        }
        resolve(false);
      })
      .catch(err => reject(err));
  });

export const getWordDetails = (word) =>
    (dispatch) => {
      if (!word || !word.id) {
        return;
      }
      // Get the word from pearson.
      PearsonApi.search(word.name)
        .then(resp => {
          // console.log(resp);
          let result = { word: Object.assign({}, word) };
          result.word.meaningResult = 404;
          if (resp && resp.count > 0 && resp.results && resp.results.length > 0) {
            result = modelWord(resp.results, word);
            result.word.meaningResult = 200;
            // Push info to firebase.
            // FirebaseDatabase.update(`words/${word.id}`, word);
          }
          return dispatch({
            type: types.WORD_UPDATE,
            word: result.word,
            // relatedWords, @to Do something with related w
          });
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

export const getUserWordListByBookId = (bookId, userId) =>
    (dispatch) => {
      const filterValue = `${userId}_${bookId}`;
      const path = 'relations/wordView';
      return new Promise((resolve, reject) => {
        // Check if books exixtes in Firebase.
        FirebaseDatabase.getByFieldValue(path, 'userId_bookId', filterValue).then((values) => {
          if (values) {
            const wordList = {};
            const sortedKeys = Object.keys(values).sort((a, b) =>
              values[b].timestamp - values[a].timestamp);
            const uniqueKeys = uniqBy(sortedKeys, (e) => values[e].wordId);
            const wordIds = uniqueKeys.map((value) => {
              const wordId = values[value].wordId;
              const name = values[value].name;
              wordList[wordId] = {
                name,
                id: wordId,
              };
              return wordId;
            });
            const metaPropName = `book/${bookId}/wordList`;
            dispatch({
              type: types.WORD_META_SET,
              entities: wordList,
              wordIds,
              metaPropName,
            });
            resolve(true);
          }
          resolve(false);
        }).catch(err => reject(err));
      });
    };

export const getDefaultWordList = (bookId, chapter) =>
      (dispatch) =>
        new Promise((resolve, reject) => {
          const wordsPath = `booksWordsTree/${bookId}/${chapter}`;
          firebaseDB.child(wordsPath)
          .orderByChild('count').endAt(1000).once('value', (wordsSnapshot) => {
            if (wordsSnapshot.val()) {
              const values = wordsSnapshot.val();
              const wordList = {};
              const wordIds = [];
              Object.keys(values).map((value) => {
                const id = values[value].id;
                if (id) {
                  const name = values[value].name;
                  const posTag = values[value].partOfSpeech.tag;
                  wordList[id] = {
                    name,
                    id,
                  };
                  wordIds.push({
                    id,
                    partOfSpeech: {
                      tag: posTag,
                    },
                  });
                }
                return null;
              });
              const metaPropName = `book/${bookId}/defaultWordList/${chapter}`;
              dispatch({
                type: types.WORD_META_SET,
                entities: wordList,
                wordIds,
                metaPropName,
              });
              if (wordIds) {
                resolve(true);
              }
              resolve(false);
            }
          })
          .catch(err => reject(err));
        });
