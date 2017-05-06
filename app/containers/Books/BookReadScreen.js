import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { SearchBar } from 'react-native-elements';
import {
  View,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { ActionCreators } from '../../actions';
import WordsList from '../../components/Words/WordsList';
import WordSearch from '../Search/WordSearch';
import entitiesSelector from '../../selectors/entitiesSelector';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  searchBarContainer: {
    zIndex: 10,
    paddingTop: 65,
    maxHeight: 113,
  },
  wordListContainer: {
    flex: 1,
    marginTop: 0,
  },
});

class BookReadScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      searchActive: false,
    };
  }
  componentWillMount() {
    const { words, book, userId } = this.props;
    if (!words && book) {
      this.props.getWordListByBookId(book.id, userId);
    }
  }
  search(text) {
    if (text && !this.state.searchActive) {
      this.setState({ searchActive: true });
    } else if (!text && this.state.searchActive) {
      this.setState({ searchActive: false });
    }
    if (text && typeof text === 'string') {
      this.props.searchWords(text);
    } else {
      this.props.clearSearchWords();
    }
  }
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.searchBarContainer}>
          <SearchBar
            lightTheme
            onChangeText={(text) => this.search(text)}
            placeholder="Type a word"
            containerStyle={styles.searchBar}
            clearButtonMode="while-editing"
          />
        </View>
        <ScrollView
          style={{ flex: 1, marginBottom: 50 }}
          contentInset={{ top: 0 }}
          automaticallyAdjustContentInsets={false}
        >
        { this.state.searchActive &&
          <View style={{ flex: 1 }}>
            <WordSearch
              metaPropName="wordSearchList"
              getWordDetails={this.props.getWordDetails}
              setWordView={this.props.setWordView}
              userId={this.props.userId}
              book={this.props.book}
            />
          </View>
          }
          <View style={styles.wordListContainer}>
            <WordsList
              words={this.props.words}
              getWordDetails={this.props.getWordDetails}
              setWordView={this.props.setWordView}
              userId={this.props.userId}
              book={this.props.book}
            />
          </View>
        </ScrollView>
      </View>
    );
  }
}

BookReadScreen.propTypes = {
  userId: PropTypes.string,
  book: PropTypes.object,
  words: PropTypes.object,
  navigator: PropTypes.object,
  searchWords: PropTypes.func,
  getWordDetails: PropTypes.func,
  setWordView: PropTypes.func,
  clearSearchWords: PropTypes.func,
  getWordListByBookId: PropTypes.func,
};

const recordsSelector = entitiesSelector();

function mapStateToProps(state, props) {
  const book = props.book;
  const metaPropName = `book/${book.id}/wordList`;
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

export default connect(mapStateToProps, mapDispatchToProps)(BookReadScreen);
