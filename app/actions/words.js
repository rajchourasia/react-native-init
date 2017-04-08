import { AsyncStorage } from 'react-native';
import * as types from './types';
import FirebaseSearch from '../lib/firebaseApi/FirebaseSearch';
import { FirebaseDatabase } from '../lib/firebaseApi';
import { modelBook } from '../utils/goodreadsDataModel.js';

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

export const getWordDetails = (bookId) =>
    (dispatch) =>
      // Check if books exixtes in Firebase.
      FirebaseDatabase.getByFieldValue('books', 'id', bookId).then((value) => {
        // Return if books exists.
        if (value) {
          return dispatch({
            type: types.BOOK_UPDATE,
            book: value[Object.keys(value)[0]],
          });
        }
        // If book does not exist in firebase.
        // Get Goodreads Key from AsyncStorage/
        return AsyncStorage.getItem('@Goodreads:key').then((key) => {
          const url = `http://www.goodreads.com/book/show/${bookId}.xml?key=${key}`;
          // Get the book details from Goodreads.
          return GoodreadsApi.get(url)
            .then(resp => {
              // console.log(resp);
              const searchResultObject = resp.data.GoodreadsResponse.book;
              const book = modelBook(searchResultObject);
              // Push info to firebase.
              FirebaseDatabase.push('books', book);
              return dispatch({
                type: types.BOOK_UPDATE,
                book,
              });
            });
        });
      })
      .catch(err => console.log(err));
