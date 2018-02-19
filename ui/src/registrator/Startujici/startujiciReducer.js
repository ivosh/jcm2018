import { AKTUALNI_ROK } from '../../constants';

export const initialState = {};

const startujiciReducer = (state = initialState, action) => {
  switch (action.type) {
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
