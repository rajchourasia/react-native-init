import * as types from './types';
import GoodreadsApi from '../lib/goodreadsApi';
import { modelShelfItem, modelBook } from '../utils/goodreadsDataModel.js';

export const getBooksFromShelf = (uid, shelfName, pageNumber) => {
  const page = pageNumber || 0;
  const perPage = 5;
  return (dispatch) => {
    const url = `http://www.goodreads.com/review/list/${uid}.xml?v=2&shelf=${shelfName}&page=${page}&per_page=${perPage}`;
    return GoodreadsApi.get(url)
      .then(resp => {
        // console.log(resp);
        const shelfObject = resp.data.GoodreadsResponse.reviews;
        const shelfObjectReviews = shelfObject.review;
        const shelf = {};
        const books = {};
        const meta = {
          homeList: [],
        };
        const total = parseInt(shelfObject.total, 10);
        if (total === 1) {
          const item = shelfObjectReviews;
          const book = item.book;
          shelf[book.id.text] = modelShelfItem(item);
          books[book.id.text] = modelBook(book);
          meta.homeList.push(book.id.text);
        } else if (total > 1) {
          for (const item of shelfObjectReviews) {
            const book = item.book;
            shelf[book.id.text] = modelShelfItem(item);
            books[book.id.text] = modelBook(book);
            meta.homeList.push(book.id.text);
          }
        }
        return dispatch({
          type: types.SHELF_UPDATE,
          shelfName,
          shelf,
          entities: books,
          meta,
        });
      })
      .catch(err => console.log(err));
  };
};

export const getBooksFromAllShelves = (user) =>
  (dispatch) => {
    user.shelves.map((value) => dispatch(getBooksFromShelf(user.id, value)));
  };
