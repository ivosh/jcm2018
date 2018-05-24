const initialState = { cas: '', showing: false };

export const createNovyMezicasReducer = typ => (state = initialState, action) => {
  switch (action.type) {
    case `NOVY_MEZICAS_INPUT_CHANGED_${typ}`:
      return { ...state, cas: action.cas };
    case `NOVY_MEZICAS_HIDE_${typ}`:
      return { ...state, cas: '', showing: false };
    case `NOVY_MEZICAS_SHOW_${typ}`:
      return { ...state, showing: true };
    default:
      return state;
  }
};

export const casValid = state => {
  if (state.cas === '') {
    return undefined;
  }
  if (/^\d+:\d+:\d+([.,]\d+)?$/.test(state.cas)) {
    return 'success';
  }
  return 'error';
};
