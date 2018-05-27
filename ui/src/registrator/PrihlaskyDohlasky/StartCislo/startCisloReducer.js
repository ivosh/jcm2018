const initialState = { showing: false };

// eslint-disable-next-line import/prefer-default-export
export const createStartCisloReducer = actionPrefix => (state = initialState, action) => {
  switch (action.type) {
    case `${actionPrefix}_RESET`:
      return initialState;
    case `${actionPrefix}_HIDE_START_CISLO`:
      return { ...state, showing: false };
    case `${actionPrefix}_SHOW_START_CISLO`:
      return { ...state, showing: true };
    default:
      return state;
  }
};
