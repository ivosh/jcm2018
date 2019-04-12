const startovniCislaReducer = (state, action) => {
  switch (action.type) {
    case 'START_CISLO_DOKONCENO': {
      const { cas } = action;
      return { ...state, dokonceno: true, cas };
    }
    case 'START_CISLO_NEDOKONCENO': {
      const { cas, ...rest } = state;
      return { ...rest, dokonceno: false };
    }
    case 'START_CISLO_NA_TRASE': {
      const { cas, ...rest } = state;
      return { ...rest, dokonceno: null };
    }
    default:
      return state;
  }
};

export default startovniCislaReducer;
