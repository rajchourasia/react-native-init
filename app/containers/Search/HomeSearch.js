import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import BookList from '../../components/Books/BookList';
import entitiesSelector from '../../selectors/entitiesSelector';
import { ActionCreators } from '../../actions';

const HomeSearch = (props) =>
  <BookList
    books={props.books}
    navigator={props.navigator}
    selectReadingTab={props.selectReadingTab}
  />;

HomeSearch.propTypes = {
  books: PropTypes.object,
  navigator: PropTypes.object,
  selectReadingTab: PropTypes.func,
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

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeSearch);
