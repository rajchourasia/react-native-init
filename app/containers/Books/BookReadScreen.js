import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { SearchBar } from 'react-native-elements';
import {
  View,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  Text,
  TouchableHighlight,
} from 'react-native';
import { ActionCreators } from '../../actions';
import WordsList from '../../components/Words/WordsList';
import WordSearch from '../Search/WordSearch';
import entitiesSelector from '../../selectors/entitiesSelector';

const styles = StyleSheet.create({
  centering: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 8,
  },
  notFound: {
    height: 80,
  },
  notFoundText: {
    fontStyle: 'italic',
  },
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
  searchBar: {
    backgroundColor: '#eee',
  },
  inputStyle: {
    backgroundColor: '#fff',
  },
});

class BookReadScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      fetchList: props.words ? true : null,
    };
    this.searchFocus = this.searchFocus.bind(this);
  }
  componentWillMount() {
    const { words, book, userId } = this.props;
    if (!words && book) {
      this.props.getWordListByBookId(book.id, userId).then((value) => {
        this.setState({
          fetchList: value,
        });
      });
    }
  }
  getBodyComponent() {
    if (this.state.fetchList === null) {
      return (
        <ActivityIndicator
          style={[styles.centering, { flex: 1 }]}
          size="small"
          color="grey"
        />
      );
    } else if (this.state.fetchList === false) {
      return (
        <View style={[styles.centering, styles.notFound]}>
          <Text style={styles.notFoundText}>Search and Add words</Text>
        </View>
      );
    }
    return (
      <ScrollView
        style={{ flex: 1, marginBottom: 50 }}
        contentInset={{ top: 0 }}
        automaticallyAdjustContentInsets={false}
      >
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
    );
  }
  searchFocus() {
    this.props.navigator.push({
      title: this.props.book.title,
      component: WordSearch,
      passProps: {
        metaPropName: 'wordSearchList',
        getWordDetails: this.props.getWordDetails,
        setWordView: this.props.setWordView,
        userId: this.props.userId,
        book: this.props.book,
      },
    });
  }
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.searchBarContainer}>
          <TouchableHighlight onPress={() => this.searchFocus()} >
            <View>
              <SearchBar
                lightTheme
                placeholder="Type a word"
                containerStyle={styles.searchBar}
                inputStyle={styles.inputStyle}
                clearButtonMode="while-editing"
                autoCapitalize="none"
                editable={false}
              />
            </View>
          </TouchableHighlight>
        </View>
        { this.getBodyComponent() }
      </View>
    );
  }
}

BookReadScreen.propTypes = {
  userId: PropTypes.string,
  book: PropTypes.object,
  words: PropTypes.object,
  navigator: PropTypes.object,
  getWordDetails: PropTypes.func,
  setWordView: PropTypes.func,
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
