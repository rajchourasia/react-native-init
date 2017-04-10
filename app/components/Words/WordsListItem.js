import React, { PropTypes, Component } from 'react';
import { View, TouchableHighlight, Text } from 'react-native';
import { ListItem } from 'react-native-elements';
import Collapsible from 'react-native-collapsible';

class WordsListItem extends Component {
  constructor(props) {
    super(props);

    this.state = {
      collapsed: true,
    };
  }
  onPress(word) {
    this.setState({
      collapsed: !this.state.collapsed,
    });
    this.props.getWordDetails(word);
  }
  render() {
    const word = this.props.word ? this.props.word : '';
    const collapsed = this.state.collapsed;
    if (!word) {
      return <View />;
    }
    return (
      <View>
        <ListItem
          onPress={() => this.onPress(word)}
          component={TouchableHighlight}
          title={word.name}
        />
        <Collapsible collapsed={collapsed}>
          <Text>THis</Text>
          {word.meanings && word.meanings.map((meaning, key) => (
            <View key={key}>
              <Text>
                {meaning.details && meaning.details[0] ? meaning.details[0].definition[0] : ''}
              </Text>
            </View>
          ))}
        </Collapsible>
      </View>
    );
  }
}

WordsListItem.propTypes = {
  word: PropTypes.object,
  getWordDetails: PropTypes.func,
};

export default WordsListItem;
