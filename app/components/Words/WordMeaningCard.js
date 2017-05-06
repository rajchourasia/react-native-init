import React, { PropTypes } from 'react';
import { StyleSheet, TouchableHighlight, View, Text } from 'react-native';
import RNAudioStreamer from 'react-native-audio-streamer';
import pearsonConfig from '../../../config/pearson';

const pearsonBasePath = pearsonConfig.basePath;

const styles = StyleSheet.create({
  container: {
    paddingTop: 8,
    paddingBottom: 8,
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  audio: {
    marginTop: 8,
  },
  partOfSpeech: {
    fontSize: 12,
    fontStyle: 'italic',
    marginTop: 16,
  },
  definition: {
    marginTop: 8,
  },
  example: {
    marginTop: 8,
    color: 'grey',
  },
});

const WordMeaningCard = ({ word, style }) => {
  const play = (url) => {
    if (url) {
      const audiopath = `${pearsonBasePath}${url}`;
      RNAudioStreamer.setUrl(audiopath);
      RNAudioStreamer.play();
    }
  };

  const getAudioHtml = (audioUrl) => (
    <TouchableHighlight
      style={styles.audio}
      onPress={() => play(audioUrl)}
    >
      <Text>Audio</Text>
    </TouchableHighlight>
  );

  const getMeaningHtml = (name, meaning, key = 0) => {
    const audioUrl = meaning.pronunciations && meaning.pronunciations[0]
                    && meaning.pronunciations[0].audio
                    && meaning.pronunciations[0].audio[0]
                    ? meaning.pronunciations[0].audio[0].url : null;
    const partOfSpeech = meaning.partOfSpeech ? meaning.partOfSpeech : null;
    const details = meaning.details && meaning.details[0] ? meaning.details[0] : null;
    const definition = details ? details.definition[0] : null;
    const example = details && details.examples && details.examples[0]
    ? details.examples[0].text : null;

    return (
      <View style={[style, styles.container]} key={key}>
        <Text style={styles.name}>{name}</Text>
        { audioUrl && getAudioHtml(audioUrl) }
        { partOfSpeech && <Text style={styles.partOfSpeech}>{ partOfSpeech }</Text> }
        { definition && <Text style={styles.definition}>{ definition }</Text> }
        { example && <Text style={styles.example}>"{ example }"</Text> }
      </View>
    );
  };

  return (
    <View>
      {word.meanings && word.meanings.map((meaning, key) =>
        getMeaningHtml(word.name, meaning, key))
      }
      {(!word.meanings || (word.meanings && word.meanings.length <= 0))
        && word.relatedWords && word.relatedWords[0]
        && getMeaningHtml(word.relatedWords[0].name, word.relatedWords[0])
      }
    </View>
  );
};

WordMeaningCard.propTypes = {
  word: PropTypes.object,
  style: PropTypes.object,
};

export default WordMeaningCard;
