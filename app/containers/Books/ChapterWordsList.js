import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import { ActionCreators } from '../../actions';
import WordsList from '../../components/Words/WordsList';
import bookDefaultWordsSelector from '../../selectors/bookDefaultWordsSelector';

const styles = StyleSheet.create({
  centering: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 8,
  },
});

class ChapterWordList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      fetchDefaultList: props.words ? true : null,
    };
  }
  componentWillMount() {
    const { words, book, chapter } = this.props;
    if (!words && book && book.chapters) {
      this.props.getDefaultWordList(book.id, chapter).then((value) => {
        if (this.state.fetchDefaultList !== value) {
          this.setState({
            fetchDefaultList: value,
          });
        }
      });
    }
  }
  render() {
    const props = this.props;
    if (!this.props.words) {
      return (
        <ActivityIndicator
          style={[styles.centering, { flex: 1 }]}
          size="small"
          color="grey"
        />
      );
    }
    return (
      <WordsList
        words={props.words}
        getWordDetails={props.getWordDetails}
        setWordView={props.setWordView}
        userId={props.userId}
        book={props.book}
      />
    );
  }
}

ChapterWordList.propTypes = {
  words: PropTypes.object,
  book: PropTypes.object,
  userId: PropTypes.string,
  getWordDetails: PropTypes.func,
  setWordView: PropTypes.func,
  getDefaultWordList: PropTypes.func,
  chapter: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
};


const recordsSelector = bookDefaultWordsSelector();

function mapStateToProps(state, props) {
  const book = props.book;
  const chapter = props.chapter;
  const metaPropName = `book/${book.id}/defaultWordList/${chapter}`;
  const selectorProps = {
    metaPropName,
    type: 'words',
  };
  return {
    userId: state.user.id,
    words: recordsSelector(state, selectorProps),
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ChapterWordList);
