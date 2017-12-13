export const SortDirTypes = { NONE: 'none', ASC: 'asc', DESC: 'desc' };

const reverseSortDirType = sortDirType => {
  switch (sortDirType) {
    case SortDirTypes.ASC:
      return SortDirTypes.DESC;
    case SortDirTypes.DESC:
      return SortDirTypes.ASC;
    default:
      return SortDirTypes.ASC;
  }
};

export const initialState = {
  sortColumn: undefined,
  sortDir: SortDirTypes.NONE
};

const ucastniciDigestReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'UCASTNICI_DIGEST_SORT_DIR_CHANGE':
      if (state.sortColumn !== action.sortColumn) {
        return { ...state, sortColumn: action.sortColumn, sortDir: SortDirTypes.ASC };
      }
      return { ...state, sortDir: reverseSortDirType(state.sortDir) };
    default:
      return state;
  }
};

export default ucastniciDigestReducer;
