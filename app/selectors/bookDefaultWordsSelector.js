import { createSelectorCreator, defaultMemoize } from 'reselect';
import isEqual from 'lodash/isEqual';
import pickBy from 'lodash/pickBy';

const getRecordIds = (state, props) => state[props.type]
&& state[props.type].meta[props.metaPropName];

const getEntities = (state, props, records) => pickBy(state[props.type].entities, (entity) => {
  if (records) {
    return records.find((record) =>
      (entity.grid && (record.id === entity.grid)) || (entity.id && (record.id === entity.id))
    );
  }
  return null;
});

const getChapEntities = (state, props) => {
  const entities = [];
  if (state[props.type] && state[props.type].entities) {
    const records = getRecordIds(state, props);
    if (records) {
      Object.keys(records).map((chapter) => {
        const words = records[chapter];
        entities[chapter] = getEntities(state, props, words);
        return null;
      });
    }
  }
  return entities;
};

// Create a "selector creator" that uses lodash.isEqual instead of ===
const createDeepEqualSelector = createSelectorCreator(
  defaultMemoize,
  isEqual
);

const bookDefaultWordsSelector = () => createDeepEqualSelector(
    [getChapEntities, getRecordIds], (records, recordIds) => {
      if (records && recordIds) {
        const entityData = {};
        Object.keys(recordIds).map((chapter) => {
          const words = recordIds[chapter];
          entityData[chapter] = {};
          if (words && words.length) {
            words.map((word, key) => {
              entityData[chapter][key] = Object.assign({}, word, records[chapter][word.id]);
              return key;
            });
          }
          return null;
        });
        return entityData;
      }
      return null;
    }
  );

export default bookDefaultWordsSelector;
