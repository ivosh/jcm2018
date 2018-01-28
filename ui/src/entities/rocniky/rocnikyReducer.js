export const initialState = { byRoky: {}, roky: [] };

const rocnikyReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'FETCH_ROCNIKY_SUCCESS':
      return action.data;
    case 'SIGN_OUT_SUCCESS':
      return initialState;
    default:
      return state;
  }
};

export default rocnikyReducer;

export const getTypKategorie = (rok, typ, rocniky) => {
  const rocnik = rocniky.byRoky[rok];
  return rocnik.kategorie[typ];
};
