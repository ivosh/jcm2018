import { reverseSortDirType, SortDirTypes } from '../../Util';

export const initialState = {
  sortColumn: undefined,
  sortDir: SortDirTypes.NONE
};

export const createUcastniciTableReducer = actionPrefix => (state = initialState, action) => {
  switch (action.type) {
    case `${actionPrefix}_SORT_DIR_CHANGE`:
      if (state.sortColumn !== action.sortColumn) {
        return { ...state, sortColumn: action.sortColumn, sortDir: SortDirTypes.ASC };
      }
      return { ...state, sortDir: reverseSortDirType(state.sortDir) };
    default:
      return state;
  }
};
