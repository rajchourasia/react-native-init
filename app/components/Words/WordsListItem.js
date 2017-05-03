import React, { PropTypes, Component } from 'react';
import { View, TouchableHighlight, Text, Keyboard } from 'react-native';
import { ListItem } from 'react-native-elements';
import Collapsible from 'react-native-collapsible';
import RNAudioStreamer from 'react-native-audio-streamer';
import pearsonConfig from '../../../config/pearson';

const pearsonBasePath = pearsonConfig.basePath;

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
  play(url) {
    if (url) {
      const audiopath = `${pearsonBasePath}${url}`;
      RNAudioStreamer.setUrl(audiopath);
      RNAudioStreamer.play();
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
          <Text>Meaning</Text>
          {word.meanings && word.meanings.map((meaning, key) => (
            <View key={key}>
              <Text>
                {meaning.details && meaning.details[0] ? meaning.details[0].definition[0] : ''}
              </Text>
              {
                meaning.pronunciations && meaning.pronunciations[0]
                && meaning.pronunciations[0].audio
                && meaning.pronunciations[0].audio[0]
                && <TouchableHighlight
                  onPress={() => this.play(meaning.pronunciations[0].audio[0].url)}
                >
                  <Text>Audio</Text>
                </TouchableHighlight>
              }
            </View>
          ))}
          {(!word.meanings || (word.meanings && word.meanings.length <= 0))
            && word.relatedWords && word.relatedWords[0] &&
            <View>
              <Text>
                Name : {word.relatedWords[0].details
                  && word.relatedWords[0].name ? word.relatedWords[0].name : ''}
              </Text>
              <Text>
                {word.relatedWords[0].details
                  && word.relatedWords[0].details[0]
                  ? word.relatedWords[0].details[0].definition[0] : ''}
              </Text>
              {word.relatedWords && word.relatedWords[0]
                && word.relatedWords[0].pronunciations
                && word.relatedWords[0].pronunciations[0]
                && word.relatedWords[0].pronunciations[0].audio
                && word.relatedWords[0].pronunciations[0].audio[0]
                && <TouchableHighlight
                  onPress={() => this.play(word.relatedWords[0].pronunciations[0].audio[0].url)}
                >
                  <Text>Audio</Text>
                </TouchableHighlight>
               }
            </View>
          }
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
