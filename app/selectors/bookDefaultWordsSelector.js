import { createSelectorCreator, defaultMemoize } from 'reselect';
import isEqual from 'lodash/isEqual';
import pickBy from 'lodash/pickBy';

const getRecordIds = (state, props) => state[props.type]
&& state[props.type].meta[props.metaPropName];

const getEntities = (state, props) => pickBy(state[props.type].entities, (entity) => {
  const records = getRecordIds(state, props);
  if (records) {
    return records.find((record) =>
      (entity.grid && (record.id === entity.grid)) || (entity.id && (record.id === entity.id))
    );
  }
  return null;
});

// Create a "selector creator" that uses lodash.isEqual instead of ===
const createDeepEqualSelector = createSelectorCreator(
  defaultMemoize,
  isEqual
);

const bookDefaultWordsSelector = () => createDeepEqualSelector(
  [getEntities, getRecordIds], (records, recordIds) => {
    if (records && recordIds) {
      const entityData = {};
      recordIds.map((value, key) => {
        const id = value.id;
        const record = records[id];
        if (record) {
          entityData[id] = Object.assign({}, value, record);
          entityData[id].weight = Object.keys(entityData).length;
        }
        return null;
      });
      return entityData;
    }
    return null;
  }
);

export default bookDefaultWordsSelector;
