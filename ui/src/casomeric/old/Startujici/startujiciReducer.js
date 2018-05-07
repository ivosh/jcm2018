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
    case 'STARTUJICI_DOKONCENO':
      return updateItemInArray(state, action.id, startujici => ({
        ...startujici,
        dokonceno: true,
        duration: action.duration
      }));
    case 'STARTUJICI_NA_TRASE':
      return updateItemInArray(state, action.id, startujici => ({
        ...startujici,
        dokonceno: null,
        duration: undefined
      }));
    case 'STARTUJICI_NEDOKONCENO':
      return updateItemInArray(state, action.id, startujici => ({
        ...startujici,
        dokonceno: false,
        duration: null
      }));
    default:
      return state;
  }
};

export default startujiciReducer;

export const getDokoncenoWithCisloClass = (state, cisloClass) => {
  const naTrase = state.filter(startujici => startujici.dokonceno === true);

  return naTrase.map(startujici => ({
    id: startujici.id,
    duration: moment.duration(startujici.duration),
    cislo: startujici.cislo,
    cisloClass
  }));
};

export const getStartujiciWithoutDuration = state =>
  state.map(startujici => ({
    id: startujici.id,
    cislo: startujici.cislo,
    dokonceno: startujici.dokonceno
  }));

export const getStartujiciSorted = state => {
  const serazeni = state.slice().sort((a, b) => a.cislo - b.cislo);

  return serazeni.map(startujici => {
    if (startujici.duration) {
      return { ...startujici, duration: moment.duration(startujici.duration) };
    }
    return startujici;
  });
};
