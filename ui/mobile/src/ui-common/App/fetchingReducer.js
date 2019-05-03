const createFetchingReducer = name => (state = 'init', action) => {
  switch (action.type) {
    case `FETCH_${name}_REQUEST`:
      return 'fetching';
    case `FETCH_${name}_SUCCESS`:
    case `FETCH_${name}_ERROR`:
      return 'done';
    default:
      return state;
  }
};

export default createFetchingReducer;
