import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import WordList from '../../components/Words/WordsList';
import entitiesSelector from '../../selectors/entitiesSelector';
import { ActionCreators } from '../../actions';

const WordSearch = (props) =>
  <WordList
    words={props.words}
    getWordDetails={props.getWordDetails}
    setWordView={props.setWordView}
    book={props.book}
    userId={props.userId}
  />;

WordSearch.propTypes = {
  words: PropTypes.object,
  getWordDetails: PropTypes.func,
  setWordView: PropTypes.func,
  book: PropTypes.object,
  userId: PropTypes.string,
};

const recordSelector = entitiesSelector();
function mapStateToProps(state, props) {
  const selectorProps = {
    metaPropName: props.metaPropName,
    type: 'words',
  };
  return {
    words: recordSelector(state, selectorProps),
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(WordSearch);