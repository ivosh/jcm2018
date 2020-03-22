import { AKTUALNI_ROK, TYPY_KATEGORII } from '../../constants';

export const initialState = { byRoky: {}, roky: [] };

const rocnikyReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'FETCH_ROCNIKY_SUCCESS':
      return action.response.rocniky;
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

const buildLookup = (list) => {
  const lookup = {};
  list.forEach((kategorie) => {
    lookup[kategorie.id] = kategorie;
  });
  return lookup;
};

export const getKategorieProTyp = ({ typ, rocniky, rok = AKTUALNI_ROK }) => {
  const typKategorie = getTypKategorie({ rok, typ, rocniky });

  let list;
  // :TODO: juniorská kategorie cyklo je v současnosti nevybratelná
  if (!typKategorie['muž'] && !typKategorie['žena']) {
    list = [typKategorie]; // jediná kategorie
  } else {
    list = [...typKategorie['muž'], ...typKategorie['žena']];
  }
  return { list, lookup: buildLookup(list) };
};

export const getKategorie = ({ rocniky, rok = AKTUALNI_ROK }) => {
  const result = { kategorie: {}, typy: {} };
  TYPY_KATEGORII.forEach((typ) => {
    result.typy[typ] = getKategorieProTyp({ typ, rocniky, rok });
    result.kategorie = { ...result.kategorie, ...buildLookup(result.typy[typ].list) };
  });

  return result;
};
