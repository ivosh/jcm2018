export const initialState = {};

const kategorieReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'FETCH_KATEGORIE_SUCCESS':
      return action.data;
    case 'SIGN_OUT_SUCCESS':
      return initialState;
    default:
      return state;
  }
};

export default kategorieReducer;
