import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  StyleSheet,
  ListView,
  View,
  ScrollView,
} from 'react-native';
import { SearchBar, List, ListItem } from 'react-native-elements';
import isEmpty from 'lodash/isEmpty';
import { ActionCreators } from '../../actions';

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

const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });

class HomeScreen extends Component {
  search() {
    return;
  }
  render() {
    const books = this.props.books;
    let listView = null;
    if (!isEmpty(books)) {
      listView = (
        <List >
          {
            Object.keys(books).map((bookKey, index) => (
              <ListItem
                key={books[bookKey].id}
                avatar={{ uri: books[bookKey].image.default }}
                key={bookKey}
                title={books[bookKey].title}
              />
            ))
          }
        </List>
      );
    }
    return (
      <View style={styles.container}>
        <View style={styles.searchBarContainer}>
          <SearchBar
            lightTheme
            onChangeText={this.search()}
            placeholder="Which book?"
            containerStyle={styles.searchBar}
            clearButtonMode="while-editing"
          />
        </View>
        <ScrollView style={{ flex:1 }}>
          <View style={styles.bookListContainer}>
            { listView  && listView }
          </View>
        </ScrollView>
      </View>
    );
  }
}

HomeScreen.propTypes = {
  userId: PropTypes.string,
  books: PropTypes.object,
};

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch);
}

function mapStateToProps(state) {
  return {
    userId: state.user.id,
    books: state.books,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);
