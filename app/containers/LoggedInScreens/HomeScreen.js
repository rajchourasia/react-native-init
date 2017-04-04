import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  StyleSheet,
  View,
  ScrollView,
} from 'react-native';
import { SearchBar } from 'react-native-elements';
import { ActionCreators } from '../../actions';
import SearchActiveScreen from './SearchActiveScreen';
import BookList from '../../components/Books/BookList';
import entitiesSelector from '../../selectors/entitiesSelector';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  },
  searchBarContainer: {
    backgroundColor: '#FFF',
    paddingTop: 20,
  },
  bookListContainer: {
    flex: 1,
    marginTop: 0,
  },
  name: {
    fontSize: 20,
    color: '#000000',
    fontWeight: 'bold',
    backgroundColor: 'transparent',
    marginTop: 15,
    alignSelf: 'center',
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
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.searchBarContainer}>
          <SearchBar
            lightTheme
            onChangeText={(text) => this.search(text)}
            placeholder="Which book?"
            containerStyle={styles.searchBar}
            clearButtonMode="while-editing"
          />
        </View>
        <ScrollView style={{ flex: 1 }}>
          <View style={styles.bookListContainer}>
            { this.state.searchActive ?
              <SearchActiveScreen
                onRowClickReduxAction={this.props.getBookDetails}
                metaPropName="homeSearchList"
              /> :
              <BookList
                books={this.props.books}
                onRowClickReduxAction={this.props.getBookDetails}
              />
            }
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
  getBookDetails: PropTypes.func,
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
