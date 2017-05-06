import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  StyleSheet,
  View,
  ScrollView,
  Text,
} from 'react-native';
import { SearchBar } from 'react-native-elements';
import { ActionCreators } from '../../actions';
import HomeSearch from '../Search/HomeSearch';
import BookList from '../../components/Books/BookList';
import entitiesSelector from '../../selectors/entitiesSelector';

const styles = StyleSheet.create({
  container: {
    flex: 1,
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

    this.state = {
      searchActive: false,
    };
  }
  search(text) {
    if (text && !this.state.searchActive) {
      this.setState({ searchActive: true });
    } else if (!text && this.state.searchActive) {
      this.setState({ searchActive: false });
    }
    if (typeof text === 'string') {
      this.props.searchBooks(text);
    }
  }
  getBodyComponent() {
    const searchActive = this.state.searchActive;
    if (searchActive) {
      return (
        <HomeSearch
          metaPropName="homeSearchList"
          navigator={this.props.navigator}
          selectReadingTab={this.props.selectReadingTab}
        />
      );
    }
    return (
      <BookList
        books={this.props.books}
        navigator={this.props.navigator}
        selectReadingTab={this.props.selectReadingTab}
      />
    );
  }
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.searchBarContainer}>
          <SearchBar
            lightTheme
            onChangeText={(text) => this.search(text)}
            placeholder="Which book?"
            containerStyle={styles.searchBar}
            inputStyle={styles.inputStyle}
            clearButtonMode="while-editing"
          />
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

const recordSelector = entitiesSelector();
function mapStateToProps(state) {
  const selectorProps = {
    metaPropName: 'homeList',
    type: 'books',
  };
  return {
    userId: state.user.id,
    books: recordSelector(state, selectorProps),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);
