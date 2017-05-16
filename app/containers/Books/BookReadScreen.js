import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { List, ListItem, SearchBar } from 'react-native-elements';
import SideMenu from 'react-native-side-menu';
import {
  View,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  Text,
  SegmentedControlIOS,
  TouchableHighlight,
  Dimensions,
} from 'react-native';
import { ActionCreators } from '../../actions';
import WordsList from '../../components/Words/WordsList';
import WordSearch from '../Search/WordSearch';
import entitiesSelector from '../../selectors/entitiesSelector';
import ChapterWordList from './ChapterWordsList';

const window = Dimensions.get('window');

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
    backgroundColor: '#fff',
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

    let chapter = 0;
    if (props.book && props.book.chapters) {
      chapter = Object.keys(props.book.chapters)[0];
    }
    this.state = {
      selectedIndex: 0,
      fetchList: props.words ? true : null,
      chapter,
    };
    this.searchFocus = this.searchFocus.bind(this);
  }
  componentWillMount() {
    const { words, book, userId } = this.props;
    if (!words && book) {
      this.props.getUserWordListByBookId(book.id, userId).then((value) => {
        this.setState({
          fetchList: value,
        });
      });
    }
  }
  getChaptersMenu(thisC, chapters) {
    const chapter = this.state.chapter ? this.state.chapter : Object.keys(chapters)[0];
    return (
      <ScrollView
        style={{ flex: 1, marginBottom: 190 }}
        contentInset={{ top: 0 }}
        automaticallyAdjustContentInsets={false}
      >
        <View style={{ backgroundColor: '#ccc', minHeight: window.height }}>
          <List containerStyle={{ marginTop: 0 }}>
          {
            chapters.map((title, key) => {
              const isCurrentChapter = (parseInt(chapter, 10) === parseInt(key, 10));
              return (
                <View key={key}>
                  <ListItem
                    onPress={() => this.chapterClick(key)}
                    component={TouchableHighlight}
                    title={`${key}. ${title}`}
                    rightIcon={{ name: 'chevron-right' }}
                    containerStyle={[{ paddingTop: 5, paddingBottom: 5, backgroundColor: '#eee' },
                      isCurrentChapter && { backgroundColor: '#ddd' }]}
                  />
                </View>
              );
            })
          }
          </List>
        </View>
      </ScrollView>
    );
  }
  getDefaultWordListComponent(thisC) {
    const props = thisC.props;
    const state = thisC.state;
    const { book } = props;
    const chapters = book.chapters;
    const currentChapter = state.chapter;

    if (chapters) {
      const menu = thisC.getChaptersMenu(thisC, chapters);
      return (
        <View style={{ flex: 1, minHeight: window.height }}>
          <SideMenu
            menu={menu}
            hiddenMenuOffset={30}
            isOpen
          >
            <ScrollView
              style={{ flex: 1, marginBottom: 190 }}
              contentInset={{ top: 0 }}
              automaticallyAdjustContentInsets={false}
            >
              <View style={{ backgroundColor: '#fff', minHeight: window.height }}>
                <ChapterWordList
                  getWordDetails={props.getWordDetails}
                  setWordView={props.setWordView}
                  userId={props.userId}
                  book={book}
                  chapter={currentChapter}
                  key={currentChapter}
                />
              </View>
            </ScrollView>
          </SideMenu>
        </View>
      );
    }
    return null;
  }
  getUserWordListComponent(thisC) {
    const props = thisC.props;
    return (
      <ScrollView
        style={{ flex: 1, marginBottom: 50 }}
        contentInset={{ top: 0 }}
        automaticallyAdjustContentInsets={false}
      >
        <View style={styles.wordListContainer}>
          <WordsList
            words={props.words}
            getWordDetails={props.getWordDetails}
            setWordView={props.setWordView}
            userId={props.userId}
            book={props.book}
          />
        </View>
      </ScrollView>
    );
  }
  chapterClick(chapter) {
    this.setState({
      chapter,
    });
  }
  wrapWordList({ stateFlag, wordListComponentFunction, emptyText }) {
    if (stateFlag === null) {
      return (
        <ActivityIndicator
          style={[styles.centering, { flex: 1 }]}
          size="small"
          color="grey"
        />
      );
    } else if (stateFlag === false) {
      return (
        <View style={[styles.centering, styles.notFound]}>
          <Text style={styles.notFoundText}>{emptyText}</Text>
        </View>
      );
    }
    return (
      <View style={{ flex: 1 }}>
        {wordListComponentFunction(this)}
      </View>
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
          <SegmentedControlIOS
            values={['My List', 'Default']}
            selectedIndex={this.state.selectedIndex}
            onChange={(event) => {
              this.setState({ selectedIndex: event.nativeEvent.selectedSegmentIndex });
            }}
          />
        </View>
        <View style={{ flex: 1 }}>
          {
            !this.state.selectedIndex ?
            this.wrapWordList({
              stateFlag: this.state.fetchList,
              wordListComponentFunction: this.getUserWordListComponent,
              emptyText: 'Search words above!',
            })
            : this.wrapWordList({
              stateFlag: this.props.book && typeof this.props.book.chapters !== 'undefined',
              wordListComponentFunction: this.getDefaultWordListComponent,
              emptyText: 'Default List is Empty :(',
            })
          }
        </View>
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
  getUserWordListByBookId: PropTypes.func,
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
