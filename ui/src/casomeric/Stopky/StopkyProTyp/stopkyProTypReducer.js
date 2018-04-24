const initialState = { base: null, running: false };

const stopkyProTypReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'STOPKY_START':
      if (!state.running) {
        return { ...state, running: true, base: action.base };
      }
      return state;
    case 'STOPKY_STOP':
      return { ...state, running: false };
    default:
      return state;
  }
};

export const createStopkyProTypReducer = typ => (state = initialState, action) => {
  if (typ !== action.typ) {
    return state;
  }
  return stopkyProTypReducer(state, action);
};

export default stopkyProTypReducer;
