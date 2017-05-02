import { AsyncStorage } from 'react-native';
import * as types from './types';
import GoodreadsApi from '../lib/goodreadsApi';
import { FirebaseDatabase } from '../lib/firebaseApi';
import { modelBook } from '../utils/goodreadsDataModel.js';

export const searchBooks = (string) =>
  (dispatch) => {
    const url = `http://www.goodreads.com/search/index.xml?q=${encodeURIComponent(string)}`;
    return GoodreadsApi.get(url)
      .then(resp => {
        // console.log(resp);
        const searchResultObject = resp.data.GoodreadsResponse.search;
        const searchResultObjectBooks = searchResultObject.results.work;
        const books = {};
        const meta = {
          homeSearchList: [],
        };
        const fields = {
          author: 'author.name',
        };
        if (searchResultObjectBooks && searchResultObjectBooks.length > 0) {
          searchResultObjectBooks.map((bookObject) => {
            const book = bookObject.best_book;
            books[book.id.text] = modelBook(book, fields);
            meta.homeSearchList.push(book.id.text);
            return null;
          });
        }
        return dispatch({
          type: types.BOOK_SEARCH_UPDATE,
          entities: books,
          meta,
        });
      })
      .catch(err => console.log(err));
  };

export const getBookDetails = (bookId) =>
    (dispatch) =>
      // Check if books exixtes in Firebase.
      FirebaseDatabase.getByFieldValue('books', 'grid', bookId).then((value) => {
        // Return if books exists.
        if (value) {
          const id = Object.keys(value)[0];
          const book = value[id];
          book.id = id;
          return dispatch({
            type: types.BOOK_UPDATE,
            book,
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
              FirebaseDatabase.push('books', book).then((bookvalue) => {
                if (bookvalue) {
                  book.id = bookvalue;
                }
                return dispatch({
                  type: types.BOOK_UPDATE,
                  book,
                });
              });
            });
        });
      })
      .catch(err => console.log(err));
