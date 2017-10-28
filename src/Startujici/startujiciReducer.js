import moment from 'moment';

export const initialState = [];

const updateItemInArray = (array, itemId, updateItemCallback) => {
  const updatedItems = array.map(item => {
    if (item.id !== itemId) {
      // Since we only want to update one item, preserve all others as they are now
      return item;
    }

    // Use the provided callback to create an updated item
    const updatedItem = updateItemCallback(item);
    return updatedItem;
  });

  return updatedItems;
};

const startujiciReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'DOKONCENO':
      return updateItemInArray(state, action.id, startujici => {
        return { ...startujici, dokonceno: true, duration: action.duration };
      });
    case 'NA_TRASE':
      return updateItemInArray(state, action.id, startujici => {
        return { ...startujici, dokonceno: null, duration: undefined };
      });
    case 'NEDOKONCENO':
      return updateItemInArray(state, action.id, startujici => {
        return { ...startujici, dokonceno: false, duration: null };
      });
    default:
      return state;
  }
};

export default startujiciReducer;

export const getDokoncenoWithCisloClass = (state, cisloClass) => {
  const na_trase = state.filter(startujici => {
    return startujici.dokonceno === true;
  });

  return na_trase.map(startujici => {
    return {
      id: startujici.id,
      duration: moment.duration(startujici.duration),
      cislo: startujici.cislo,
      cisloClass: cisloClass
    };
  });
};

export const getStartujiciWithoutDuration = state => {
  return state.map(startujici => {
    return { id: startujici.id, cislo: startujici.cislo, dokonceno: startujici.dokonceno };
  });
};
