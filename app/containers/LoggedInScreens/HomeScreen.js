import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  TouchableHighlight,
  StyleSheet,
  View,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import { SearchBar } from 'react-native-elements';
import { ActionCreators } from '../../actions';
import HomeSearch from '../Search/HomeSearch';
import BookList from '../../components/Books/BookList';
import shelvesBooksSelector from '../../selectors/shelvesBooksSelector';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  centering: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 8,
  },
  searchBarContainer: {
    paddingTop: 65,
    maxHeight: 113,
  },
  bookListContainer: {
    flex: 1,
  },
  name: {
    fontSize: 20,
    color: '#000000',
    fontWeight: 'bold',
    backgroundColor: 'transparent',
    marginTop: 15,
    alignSelf: 'center',
  },
  searchBar: {
    backgroundColor: '#eee',
  },
  inputStyle: {
    backgroundColor: '#fff',
  },
});

class HomeScreen extends Component {
  constructor(props) {
    super(props);

    this.searchFocus = this.searchFocus.bind(this);
  }
  getBodyComponent() {
    if (!this.props.books || (this.props.books && Object.keys(this.props.books).length <= 0)) {
      return (
        <ActivityIndicator
          style={[styles.centering, { height: 80 }]}
          size="small"
          color="grey"
        />
      );
    }
    return (
      <BookList
        books={this.props.books}
        navigator={this.props.navigator}
        selectReadingTab={this.props.selectReadingTab}
        userId={this.props.userId}
      />
    );
  }
  searchFocus() {
    this.props.navigator.push({
      title: 'Books',
      component: HomeSearch,
      passProps: {
        metaPropName: 'homeSearchList',
        navigator: this.props.navigator,
        selectReadingTab: this.props.selectReadingTab,
        userId: this.props.userId,
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
                placeholder="Which Book?"
                containerStyle={styles.searchBar}
                inputStyle={styles.inputStyle}
                clearButtonMode="while-editing"
                editable={false}
              />
            </View>
          </TouchableHighlight>
        </View>
        <ScrollView
          style={{ flex: 1, marginBottom: 50 }}
          contentInset={{ top: 0 }}
          automaticallyAdjustContentInsets={false}
        >
          <View style={styles.bookListContainer}>
            { this.getBodyComponent() }
          </View>
        </ScrollView>
      </View>
    );
  }
}

HomeScreen.propTypes = {
  userId: PropTypes.string,
  books: PropTypes.object,
  searchBooks: PropTypes.func,
  selectReadingTab: PropTypes.func,
  navigator: PropTypes.object,
};

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch);
}

const recordSelector = shelvesBooksSelector();
function mapStateToProps(state) {
  const selectorProps = {
    type: 'books',
  };
  return {
    userId: state.user.id,
    books: recordSelector(state, selectorProps),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);
