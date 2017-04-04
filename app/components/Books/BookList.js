import React, { PropTypes } from 'react';
import { View, TouchableHighlight } from 'react-native';
import { List, ListItem } from 'react-native-elements';
import isEmpty from 'lodash/isEmpty';

const staticImage = require('../../../static/logo.png');

const BookList = (props) => {
  const books = props.books ? props.books : null;

  function onPress(bookKey) {
    props.onRowClickReduxAction(bookKey);
  }
  function getBookListView() {
    let listView = null;
    if (!isEmpty(books)) {
      listView = (
        <List >
          {
            Object.keys(books).map((bookKey, index) => (
              <ListItem
                onPress={() => onPress(bookKey)}
                component={TouchableHighlight}
                key={books[bookKey].id}
                avatar={!isEmpty(books[bookKey].image)
                  ? { uri: books[bookKey].image.default } : staticImage}
                key={bookKey}
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
