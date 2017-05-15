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
import bookDefaultWordsSelector from '../../selectors/bookDefaultWordsSelector';

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

    let fetchDefaultList = null;
    let chapter = 0;
    if (props.book && props.book.chapters) {
      fetchDefaultList = true;
      chapter = Object.keys(props.book.chapters)[0];
    } else {
      fetchDefaultList = false;
    }
    this.state = {
      selectedIndex: 0,
      fetchList: props.words ? true : null,
      fetchDefaultList,
      chapter,
    };
    this.searchFocus = this.searchFocus.bind(this);
  }
  componentWillMount() {
    const { words, defaultWords, book, userId } = this.props;
    if (!defaultWords && book && book.chapters) {
      this.props.getDefaultWordListByBookId(book.id, book.chapters).then((value) => {
        if (this.state.fetchDefaultList !== value) {
          this.setState({
            fetchDefaultList: value,
          });
        }
      });
    }
    if (!words && book) {
      this.props.getUserWordListByBookId(book.id, userId).then((value) => {
        this.setState({
          fetchList: value,
        });
      });
    }
  }
  componentWillReceiveProps(nextProps) {
    if (!this.props.defaultWords && nextProps.defaultWords) {
      this.setState({
        fetchDefaultList: true,
      });
    }
  }
  getChaptersMenu(thisC, chapters) {
    return (
      <ScrollView
        style={{ flex: 1 }}
        contentInset={{ top: 0 }}
        automaticallyAdjustContentInsets={false}
      >
        <View style={{ backgroundColor: '#ccc', minHeight: window.height }}>
          <List containerStyle={{ marginTop: 0 }}>
          {
            chapters.map((title, key) => {
              return (
                <View key={key}>
                  <ListItem
                    onPress={() => this.chapterClick(key)}
                    component={TouchableHighlight}
                    title={`${key}. ${title}`}
                    rightIcon={{ name: 'chevron-right' }}
                    containerStyle={[{ paddingTop: 5, paddingBottom: 5, backgroundColor: '#eee' },
                      (this.state.chapter === key) && { backgroundColor: '#ddd' }]}
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
    const { book, defaultWords } = props;
    const chapters = book.chapters;
    const currentChapter = state.chapter;

    const menu = thisC.getChaptersMenu(thisC, chapters);
    const words = defaultWords && defaultWords[currentChapter];

    if (chapters && words) {
      return (
        <View style={{ flex: 1, minHeight: window.height }}>
          <SideMenu
            menu={menu}
            hiddenMenuOffset={30}
            isOpen
          >
            <ScrollView
              style={{ flex: 1 }}
              contentInset={{ top: 0 }}
              automaticallyAdjustContentInsets={false}
            >
              <View style={{ backgroundColor: '#fff', minHeight: window.height }}>
                <WordsList
                  words={words}
                  getWordDetails={props.getWordDetails}
                  setWordView={props.setWordView}
                  userId={props.userId}
                  book={book}
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
      <View style={{flex:1}}>
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
              stateFlag: this.state.fetchDefaultList,
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
  getDefaultWordListByBookId: PropTypes.func,
  defaultWords: PropTypes.object,
};

const recordsSelector = entitiesSelector();
const bookDefaultWordsRecordsSelector = bookDefaultWordsSelector();

function mapStateToProps(state, props) {
  const book = props.book;
  const metaPropName = `book/${book.id}/wordList`;
  const defaultSelectorPropName = `book/${book.id}/defaultWordList`;
  const selectorProps = {
    metaPropName,
    type: 'words',
  };
  const defaultSelectorProps = {
    metaPropName: defaultSelectorPropName,
    type: 'words',
  };
  return {
    userId: state.user.id,
    words: recordsSelector(state, selectorProps),
    defaultWords: bookDefaultWordsRecordsSelector(state, defaultSelectorProps),
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(BookReadScreen);
