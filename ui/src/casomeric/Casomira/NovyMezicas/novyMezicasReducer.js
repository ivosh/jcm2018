const initialState = { showing: false };

// eslint-disable-next-line import/prefer-default-export
export const createNovyMezicasReducer = typ => (state = initialState, action) => {
  switch (action.type) {
    case `NOVY_MEZICAS_HIDE_${typ}`:
      return { ...state, showing: false };
    case `NOVY_MEZICAS_SHOW_${typ}`:
      return { ...state, showing: true };
    default:
      return state;
  }
};
