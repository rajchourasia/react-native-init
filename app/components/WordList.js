import React, { PropTypes } from 'react';
import { Text, View } from 'react-native';
import Accordion from 'react-native-collapsible/Accordion';

const WordList = (props) => {
  const words = props.words ? props.words : null;
  const renderHeader = (word) => (
    <Text>
      {word.name}
    </Text>
  );
  const renderContent = (word) => (
    <Text>
      Definition
      {word.name}
    </Text>
  );
  const onchange = (index) => {
    if (index !== false) {
      const words = this.sections;
      const clickedWord = words[index];
    }
  };
  if (words) {
    return (
      <Accordion
        sections={Object.keys(words).map((wordKey) => words[wordKey])}
        renderHeader={renderHeader}
        renderContent={renderContent}
        onChange={onchange}
      />
    );
  }
  return <View />;
};

WordList.propTypes = {
  words: PropTypes.object,
  onRowClickReduxAction: PropTypes.func,
};

export default WordList;
