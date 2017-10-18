export const initialState = [];

const mezicasyReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_MEZICAS':
      let newState = state.slice();
      newState.push({
        id: action.id,
        duration: action.duration
      });
      /* Keep the array sorted, although with a terrible asymptomatic complexity. */
      return newState.sort((a, b) => {
        return a.duration.valueOf() - b.duration.valueOf();
      });
    case 'REMOVE_MEZICAS':
      const idx = state.findIndex(element => {
        return element.id === action.id;
      });
      if (idx !== -1) {
        return [...state.slice(0, idx), ...state.slice(idx + 1)];
      } else {
        return state;
      }
    default:
      return state;
  }
};

export default mezicasyReducer;
