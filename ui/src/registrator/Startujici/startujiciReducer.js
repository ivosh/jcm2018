import { AKTUALNI_ROK } from '../../constants';

export const initialState = {
  fetching: false
};

const startujiciReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'FETCH_UCASTNICI_REQUEST':
      return { ...state, fetching: true };
    case 'FETCH_UCASTNICI_SUCCESS':
    case 'FETCH_UCASTNICI_ERROR':
      return { ...state, fetching: false };
    default:
      return state;
  }
};

export default startujiciReducer;

export const getTypyStartCisel = (rocniky, rok = AKTUALNI_ROK) => {
  const rocnik = rocniky.byRoky[rok];
  if (!rocnik) {
    return [];
  }
  const { kategorie } = rocnik;

  const typy = Object.keys(kategorie).map(typ => (kategorie[typ].startCisla ? typ : undefined));
  return typy.filter(typ => typ);
};
