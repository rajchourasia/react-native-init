import { createSelectorCreator, defaultMemoize } from 'reselect';
import isEqual from 'lodash/isEqual';
import pickBy from 'lodash/pickBy';

const getRecordIds = (state, props) => {
  let items = [];
  let shelfBooks = {};
  const shelves = state.user && state.user.shelves ? state.user.shelves : null;
  if (shelves && shelves.length > 0) {
    shelves.map((shelf) => {
      if (state.shelves && state.shelves[shelf]) {
        shelfBooks = Object.assign({}, shelfBooks, state.shelves[shelf]);
      }
      return null;
    });
    items = Object.keys(shelfBooks).sort((a, b) =>
      (new Date(shelfBooks[b].dateUpdated).getTime() / 1000)
      - (new Date(shelfBooks[a].dateUpdated).getTime() / 1000));
  }
  return items;
};
const getEntities = (state, props) => state[props.type] && state[props.type].entities
&& pickBy(state[props.type].entities, (entity) => {
  // Filter only those entities whose records are there in recordIds.
  const records = getRecordIds(state, props);
  if (records) {
    return records.find((record) =>
      (entity.grid && (record === entity.grid)) || (entity.id && (record === entity.id))
    );
  }
  return null;
});

// Create a "selector creator" that uses lodash.isEqual instead of ===
const createDeepEqualSelector = createSelectorCreator(
  defaultMemoize,
  isEqual
);

const shelvesBooksSelector = () => createDeepEqualSelector(
    [getEntities, getRecordIds], (records, recordIds) => {
      if (records && recordIds) {
        const entityData = {};
        recordIds.map((id) => {
          const record = records[id];
          if (record) {
            entityData[id] = record;
            entityData[id].weight = Object.keys(entityData).length;
          }
          return null;
        });
        return entityData;
      }
      return null;
    }
  );

export default shelvesBooksSelector;
