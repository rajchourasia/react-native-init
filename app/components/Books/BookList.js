import React, { PropTypes } from 'react';
import { View, TouchableHighlight } from 'react-native';
import { List, ListItem } from 'react-native-elements';
import isEmpty from 'lodash/isEmpty';
import BookPreviewScreen from '../../containers/Books/BookPreviewScreen';

const staticImage = require('../../../static/logo.png');

const BookList = (props) => {
  const books = props.books ? props.books : null;

  function onPress(book) {
    props.navigator.push({
      title: book.title,
      component: BookPreviewScreen,
      passProps: {
        book,
        navigator: props.navigator,
      },
    });
  }
  function getBookListView() {
    let listView = null;
    if (!isEmpty(books)) {
      listView = (
        <List >
          {
            Object.keys(books).map((bookKey, index) => (
              <ListItem
                onPress={() => onPress(books[bookKey])}
                component={TouchableHighlight}
                key={books[bookKey].id}
                avatar={!isEmpty(books[bookKey].image)
                  ? { uri: books[bookKey].image.default } : staticImage}
                title={books[bookKey].title}
              />
            ))
          }
        </List>
      );
    }
    return listView;
  }

  const bookListView = getBookListView();
  if (bookListView) {
    return bookListView;
  }
  return <View />;
};

BookList.propTypes = {
  books: PropTypes.object,
  onRowClickReduxAction: PropTypes.func,
};

export default BookList;
