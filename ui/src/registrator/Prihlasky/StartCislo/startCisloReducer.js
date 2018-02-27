const initialState = { showing: false };

const startCisloReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'PRIHLASKY_RESET':
      return initialState;
    case 'PRIHLASKY_HIDE_START_CISLO':
      return { ...state, showing: false };
    case 'PRIHLASKY_SHOW_START_CISLO':
      return { ...state, showing: true };
    default:
      return state;
  }
};

export default startCisloReducer;
