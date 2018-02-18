export const initialState = {
  fetching: false
};

const startujiciReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'FETCH_UCASTNICI_REQUEST':
      return { ...state, fetching: true };
    case 'FETCH_UCASTNICI_SUCCESS':
    case 'FETCH_UCASTNICI_ERROR':
      return { ...state, fetching: false };
    default:
      return state;
  }
};

export default startujiciReducer;
