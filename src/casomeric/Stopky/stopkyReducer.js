export const initialState = {
  running: false,
  base: null
};

const stopkyReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'STOPKY_START':
      if (!state.running) {
        return {
          ...state,
          running: true,
          base: action.base
        };
      } else {
        return state;
      }
    case 'STOPKY_STOP':
      return {
        ...state,
        running: false
      };
    default:
      return state;
  }
};

export default stopkyReducer;
