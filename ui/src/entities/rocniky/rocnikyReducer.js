import { AKTUALNI_ROK, TYPY_KATEGORII } from '../../constants';

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

export const getDatumKonani = ({ rocniky, rok = AKTUALNI_ROK }) => rocniky.byRoky[rok].datum;

export const getTypKategorie = ({ rok, typ, rocniky }) => {
  const rocnik = rocniky.byRoky[rok];
  return rocnik.kategorie[typ];
};

export const getKategorieProTyp = ({ typ, rocniky, rok = AKTUALNI_ROK }) => {
  const typKategorie = getTypKategorie({ rok, typ, rocniky });

  // :TODO: juniorská kategorie cyklo je v současnosti nevybratelná
  if (!typKategorie['muž'] && !typKategorie['žena']) {
    return [typKategorie]; // jediná kategorie
  }

  return [...typKategorie['muž'], ...typKategorie['žena']];
};

export const getKategorie = ({ rocniky, rok = AKTUALNI_ROK }) => {
  const result = {};
  TYPY_KATEGORII.forEach(typ => {
    result[typ] = getKategorieProTyp({ typ, rocniky, rok });
  });

  return result;
};
