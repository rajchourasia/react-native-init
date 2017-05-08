import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  View,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  Text,
} from 'react-native';
import { SearchBar } from 'react-native-elements';
import BookList from '../../components/Books/BookList';
import entitiesSelector from '../../selectors/entitiesSelector';
import { ActionCreators } from '../../actions';

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

// Init a timeout variable to be used below
let timeout = null;

class HomeSearch extends Component {
  constructor(props) {
    super(props);

    this.state = {
      searchResult: null,
      searchActive: false,
    };
  }
  componentWillUnmount() {
    this.props.clearSearchBooks();
  }
  getBodyComponent() {
    if (!this.state.searchActive) {
      return (
        <View style={[styles.centering, styles.notFound]}>
          <Text style={styles.notFoundText}>Lookup Books</Text>
        </View>
      );
    } else if (this.state.searchActive && typeof this.state.searchResult !== 'boolean') {
      return (
        <ActivityIndicator
          style={[styles.centering, { height: 80 }]}
          size="small"
          color="grey"
        />
      );
    } else if (this.state.searchActive && this.state.searchResult === false) {
      return (
        <View style={[styles.centering, styles.notFound]}>
          <Text style={styles.notFoundText}>Book Not Found</Text>
        </View>
      );
    }
    return (
      <ScrollView
        style={{ flex: 1, marginBottom: 50 }}
        contentInset={{ top: 0 }}
        automaticallyAdjustContentInsets={false}
        keyboardShouldPersistTaps="always"
      >
        <View style={styles.wordListContainer}>
          <BookList
            books={this.props.books}
            navigator={this.props.navigator}
            selectReadingTab={this.props.selectReadingTab}
            userId={this.props.userId}
          />
        </View>
      </ScrollView>
    );
  }
  search(text) {
    if (text && typeof text === 'string') {
      if (!this.state.searchActive) {
        this.setState({ searchActive: true });
      }

      // Clear the timeout if it has already been set.
      // This will prevent the previous task from executing
      // if it has been less than <MILLISECONDS>
      clearTimeout(timeout);

      // Make a new timeout set to go off in 800ms
      timeout = setTimeout(() => {
        this.setState({ searchResult: null });
        this.props.searchBooks(text).then((value) => {
          this.setState({ searchResult: value });
        });
      }, 500);
    } else {
      if (this.state.searchActive) {
        this.setState({ searchActive: false, searchResult: null });
      }
      this.props.clearSearchBooks();
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
            inputStyle={styles.inputStyle}
            clearButtonMode="while-editing"
            autoCapitalize="none"
            autoFocus
          />
        </View>
        { this.getBodyComponent() }
      </View>
    );
  }
}

HomeSearch.propTypes = {
  books: PropTypes.object,
  navigator: PropTypes.object,
  selectReadingTab: PropTypes.func,
  searchBooks: PropTypes.func,
  clearSearchBooks: PropTypes.func,
  userId: PropTypes.string,
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
