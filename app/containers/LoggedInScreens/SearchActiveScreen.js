import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import BookList from '../../components/Books/BookList';
import entitiesSelector from '../../selectors/entitiesSelector';

const SearchActiveScreen = (props) =>
  <BookList books={props.books} onRowClickReduxAction={props.onRowClickReduxAction} />;

SearchActiveScreen.propTypes = {
  books: PropTypes.object,
  onRowClickReduxAction: PropTypes.func,
};

const recordSelector = entitiesSelector();
function mapStateToProps(state, props) {
  const selectorProps = {
    metaPropName: props.metaPropName,
    type: 'books',
  };
  return {
    books: recordSelector(state, selectorProps),
  };
}

export default connect(mapStateToProps)(SearchActiveScreen);
