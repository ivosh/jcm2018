import moment from 'moment';

const initialState = [];

const mezicasyReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_MEZICAS': {
      const newState = state.slice();
      newState.push({
        id: action.id,
        duration: action.duration
      });

      /* Keep the array sorted, although with a terrible asymptomatic complexity. */
      return newState.sort(
        (a, b) => moment.duration(a.duration).valueOf() - moment.duration(b.duration).valueOf()
      );
    }
    case 'REMOVE_MEZICAS': {
      const idx = state.findIndex(element => element.id === action.id);
      if (idx !== -1) {
        return [...state.slice(0, idx), ...state.slice(idx + 1)];
      }
      return state;
    }
    default:
      return state;
  }
};

export default mezicasyReducer;

export const getMezicasyWithCisloClass = (state, cisloClass) =>
  state.map(mezicas => ({
    ...mezicas,
    duration: moment.duration(mezicas.duration),
    cisloClass
  }));
