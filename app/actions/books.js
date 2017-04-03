import * as types from './types';
import GoodreadsApi from '../lib/goodreadsApi';
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
