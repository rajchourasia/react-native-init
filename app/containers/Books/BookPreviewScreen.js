import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Text as RNEText, Button } from 'react-native-elements';
import {
  View,
  Text,
  Image,
  StyleSheet,
} from 'react-native';
import { ActionCreators } from '../../actions';
import BookReadScreen from '../Books/BookReadScreen.js';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFF',
    paddingLeft: 16,
    paddingRight: 16,
  },
  image: {
    width: 300,
    height: 200,
  },
  commonMargin: {
    marginTop: 16,
  },
});

class BookPreviewScreen extends Component {
  componentWillMount() {
    const book = this.props.book;
    if (book && !book.id) {
      this.props.getBookDetails(book.grid);
    }
  }
  openBook(props) {
    const book = props.book;
    props.navigator.push({
      title: book.title,
      component: BookReadScreen,
      passProps: {
        book,
        navigator: props.navigator,
      },
    });
  }
  render() {
    const book = this.props.book;
    if (!book) {
      return <View />;
    }
    return (
      <View style={styles.container}>
        <Image style={styles.image} resizeMode={'contain'} source={{ uri: book.image.default }} />
        <RNEText h4 style={[styles.commonMargin, { textAlign: 'center' }]} >
          { book.title }
        </RNEText>
        <Text>
          by { book.author }
        </Text>
        {
          book.description &&
            <Text numberOfLines={3} style={[styles.commonMargin, { textAlign: 'center' }]}>
              { book.description.replace(/<[^>]+>/ig, '') }
            </Text>
        }
        <Button
          title="Start"
          onPress={() => this.openBook(this.props)}
          buttonStyle={[styles.commonMargin, { borderRadius: 4, backgroundColor: 'red' }]}
        />
      </View>
    );
  }
}

BookPreviewScreen.propTypes = {
  book: PropTypes.object,
  getBookDetails: PropTypes.func,
  appSetReadingStatus: PropTypes.func,
};

function mapStateToProps(state, props) {
  const bookGrid = props.bookGrid;
  const book = state.books.entities[bookGrid];
  return {
    book,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(BookPreviewScreen);
