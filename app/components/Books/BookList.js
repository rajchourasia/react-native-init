import React, { PropTypes } from 'react';
import { View, TouchableHighlight } from 'react-native';
import { List, ListItem } from 'react-native-elements';
import isEmpty from 'lodash/isEmpty';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '../../actions';

const staticImage = require('../../../static/logo.png');

const BookList = (props) => {
  const books = props.books ? props.books : null;
  const userId = props.userId;

  function onPress(book) {
    // Set Reading.
    props.appSetReadingStatus(book.grid, userId);
    props.selectReadingTab();
  }
  function getBookListView() {
    let listView = null;
    if (!isEmpty(books)) {
      listView = (
        <List containerStyle={{ marginTop: 0 }}>
          {
            Object.keys(books).map((bookKey, index) => (
              <ListItem
                onPress={() => onPress(books[bookKey])}
                component={TouchableHighlight}
                key={books[bookKey].grid}
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
  userId: PropTypes.string,
  onRowClickReduxAction: PropTypes.func,
  appSetReadingStatus: PropTypes.func,
};

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch);
}

export default connect(null, mapDispatchToProps)(BookList);
