export const initialState = {};

const kategorieReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'RECEIVE_KATEGORIE':
      return action.data;
    default:
      return state;
  }
};

export default kategorieReducer;
