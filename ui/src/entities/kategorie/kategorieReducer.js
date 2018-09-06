export const initialState = {};

const kategorieReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'FETCH_ROCNIKY_SUCCESS':
      return action.response.kategorie;
    case 'SIGN_OUT_SUCCESS':
      return initialState;
    default:
      return state;
  }
};

export default kategorieReducer;
