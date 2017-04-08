import { createSelectorCreator, defaultMemoize } from 'reselect';
import isEqual from 'lodash/isEqual';
import pickBy from 'lodash/pickBy';

const getRecordIds = (state, props) => state[props.type]
&& state[props.type].meta[props.metaPropName];
const getEntities = (state, props) => state[props.type] && state[props.type].entities
&& pickBy(state[props.type].entities, (entity) => {
  // Filter only those entities whose records are there in recordIds.
  const records = state[props.type] && state[props.type].meta[props.metaPropName];
  if (records) {
    return records.find((record) =>
      record === entity.id
    );
  }
  return null;
});

// Create a "selector creator" that uses lodash.isEqual instead of ===
const createDeepEqualSelector = createSelectorCreator(
  defaultMemoize,
  isEqual
);

const entitiesSelector = () => createDeepEqualSelector(
    [getEntities, getRecordIds], (records, recordIds) => {
      if (records && recordIds) {
        const entityData = {};
        recordIds.map((id) => {
          const record = records[id];
          if (record) {
            entityData[id] = record;
          }
          return null;
        });
        return entityData;
      }
      return null;
    }
  );

export default entitiesSelector;
