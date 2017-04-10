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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  searchBarContainer: {
    backgroundColor: '#FFF',
    marginTop: 65,
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
  search(text) {
    if (text && !this.state.searchActive) {
      this.setState({ searchActive: true });
    } else if (!text && this.state.searchActive) {
      this.setState({ searchActive: false });
    }
    if (text && typeof text === 'string') {
      this.props.searchWords(text);
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
        <ScrollView style={{ flex: 1 }}>
          <View style={styles.wordListContainer}>
            { this.state.searchActive && <WordSearch
              metaPropName="wordSearchList"
              getWordDetails={this.props.getWordDetails}
            />}
            <WordsList
              words={this.props.words}
              getWordDetails={this.props.getWordDetails}
            />
          </View>
        </ScrollView>
      </View>
    );
  }
}

BookReadScreen.propTypes = {
  book: PropTypes.object,
  words: PropTypes.object,
  navigator: PropTypes.object,
  searchWords: PropTypes.func,
  getWordDetails: PropTypes.func,
};

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch);
}

export default connect(null, mapDispatchToProps)(BookReadScreen);
