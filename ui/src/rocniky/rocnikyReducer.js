export const initialState = { rocniky: {}, roky: [] };

const rocnikyReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'RECEIVE_ROCNIKY':
      return action.data;
    default:
      return state;
  }
};

export default rocnikyReducer;
