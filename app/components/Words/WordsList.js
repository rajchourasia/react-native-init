import React, { PropTypes } from 'react';
import { View } from 'react-native';
import { List } from 'react-native-elements';
import isEmpty from 'lodash/isEmpty';

import WordsListItem from './WordsListItem';


const WordsList = (props) => {
  const words = props.words ? props.words : null;

  const getWordListView = () => {
    let listView = null;
    if (!isEmpty(words)) {
      listView = (
        <List containerStyle={{ marginTop: 0 }}>
          {
            Object.keys(words).map((wordKey) => {
              const word = words[wordKey];
              const key = word.id ? word.id : wordKey;
              return (
                <WordsListItem
                  key={key}
                  word={word}
                  getWordDetails={props.getWordDetails}
                  setWordView={props.setWordView}
                  book={props.book}
                  userId={props.userId}
                />
              );
            })
          }
        </List>
      );
    }
    return listView;
  };

  const wordListView = getWordListView();
  if (wordListView) {
    return wordListView;
  }
  return <View />;
};

WordsList.propTypes = {
  words: PropTypes.object,
  book: PropTypes.object,
  userId: PropTypes.string,
  getWordDetails: PropTypes.func,
  setWordView: PropTypes.func,
};

export default WordsList;
