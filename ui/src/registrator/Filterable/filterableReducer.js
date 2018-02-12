export const initialState = {
  kategorieFilter: '',
  textFilter: ''
};

export const createFilterableReducer = actionPrefix => (state = initialState, action) => {
  switch (action.type) {
    case `${actionPrefix}_KATEGORIE_FILTER_CHANGE`:
      if (state.kategorieFilter === action.typKategorie) {
        return { ...state, kategorieFilter: '' };
      }
      return { ...state, kategorieFilter: action.typKategorie };
    case `${actionPrefix}_TEXT_FILTER_CHANGE`:
      return { ...state, textFilter: action.textFilter.toLowerCase() };
    default:
      return state;
  }
};
