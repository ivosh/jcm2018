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
