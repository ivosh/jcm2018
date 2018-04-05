import { AKTUALNI_ROK } from '../../constants';

export const initialState = { odstartovani: false };

const startovniCislaReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'STARTOVNI_CISLA_CHANGE_ODSTARTOVANI':
      return { ...state, odstartovani: !state.odstartovani };
    default:
      return state;
  }
};

export default startovniCislaReducer;

export const getTypyStartCisel = (rocniky, rok = AKTUALNI_ROK) => {
  const rocnik = rocniky.byRoky[rok];
  if (!rocnik) {
    return [];
  }
  const { kategorie } = rocnik;

  const typy = Object.keys(kategorie).map(typ => (kategorie[typ].startCisla ? typ : undefined));
  return typy.filter(typ => typ);
};
