import React, { PropTypes, Component } from 'react';
import { ListItem } from 'react-native-elements';
import Collapsible from 'react-native-collapsible';
import {
  View,
  Text,
  TouchableHighlight,
  ActivityIndicator,
  Keyboard,
  StyleSheet }
from 'react-native';

import WordMeaningCard from './WordMeaningCard';

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
});

class WordsListItem extends Component {
  constructor(props) {
    super(props);

    this.state = {
      collapsed: true,
    };
  }
  onPress(word, book, userId) {
    // Hide the keyboard on click.
    Keyboard.dismiss();
    if (this.state.collapsed) {
      // Get word details.
      this.props.getWordDetails(word);
      // update hit.
      this.props.setWordView(word, book, userId);
    }
    this.setState({
      collapsed: !this.state.collapsed,
    });
  }
  getCollapsible(word) {
    switch (word.meaningResult) {
      case 404:
        return (
          <View style={[styles.centering, styles.notFound]}>
            <Text style={styles.notFoundText}>Sorry, word meaning not found</Text>
          </View>
        );

      case 200:
        return <WordMeaningCard style={{ paddingLeft: 20, paddingRight: 20 }} word={word} />;

      default:
        return (
          <ActivityIndicator
            style={[styles.centering, { height: 80 }]}
            size="small"
            color="grey"
          />
        );
    }
  }
  render() {
    const { word, book, userId } = this.props;
    const collapsed = this.state.collapsed;
    if (!word) {
      return <View />;
    }
    return (
      <View>
        <ListItem
          onPress={() => this.onPress(word, book, userId)}
          component={TouchableHighlight}
          title={word.name}
        />
        <Collapsible collapsed={collapsed}>
          { this.getCollapsible(word) }
        </Collapsible>
      </View>
    );
  }
}

WordsListItem.propTypes = {
  book: PropTypes.object,
  userId: PropTypes.string,
  word: PropTypes.object,
  getWordDetails: PropTypes.func,
  setWordView: PropTypes.func,
};

export default WordsListItem;
