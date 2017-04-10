export const modelWord = (results, oldWord) => {
  const word = {
    meanings: [],
    relatedWords: [],
  };

  results.map((item) => {
    const obj = {
      partOfSpeech: item.part_of_speech,
      pronunciations: item.pronunciations,
      details: item.senses,
    };
    if (oldWord.name === item.headword.toLowerCase()) {
      // meaning.
      word.meanings.push(obj);
    } else {
      obj.name = item.headword;
      // related words.
      word.relatedWords.push(obj);
    }
    return null;
  });
  return {
    word: Object.assign(word, oldWord),
  };
};
