import { AKTUALNI_ROK } from '../../constants';
import { narozeniToStr, reverseSortDirType, SortDirTypes } from '../../Util';
import {
  csStringSortMethod,
  narozeniSortMethod,
  prijmeniJmenoNarozeniSortMethod
} from '../../entities/ucastnici/ucastniciReducer';
import { predepsaneStartovneCommon, provedenePlatby } from '../platby';

export const initialState = {
  fetching: false,
  kategorieVykonuFilter: '',
  textFilter: '',
  sortColumn: undefined,
  sortDir: SortDirTypes.NONE
};

const prihlaseniReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'FETCH_UCASTNICI_REQUEST':
      return { ...state, fetching: true };
    case 'FETCH_UCASTNICI_SUCCESS':
    case 'FETCH_UCASTNICI_ERROR':
      return { ...state, fetching: false };
    case 'PRIHLASENI_KATEGORIE_VYKONU_FILTER_CHANGE':
      if (state.kategorieVykonuFilter === action.typKategorie) {
        return { ...state, kategorieVykonuFilter: '' };
      }
      return { ...state, kategorieVykonuFilter: action.typKategorie };
    case 'PRIHLASENI_TEXT_FILTER_CHANGE':
      return { ...state, textFilter: action.textFilter.toLowerCase() };
    case 'PRIHLASENI_SORT_DIR_CHANGE':
      if (state.sortColumn !== action.sortColumn) {
        return { ...state, sortColumn: action.sortColumn, sortDir: SortDirTypes.ASC };
      }
      return { ...state, sortDir: reverseSortDirType(state.sortDir) };
    default:
      return state;
  }
};

export default prihlaseniReducer;

export const getPrihlaseniSorted = ({
  kategorie,
  rocniky,
  ucastnici,
  kategorieVykonuFilter,
  textFilter,
  sortColumn,
  sortDir
}) => {
  const rok = AKTUALNI_ROK;
  const result = [];
  ucastnici.allIds.forEach(id => {
    const ucastnik = ucastnici.byIds[id];
    if (ucastnik.roky[0] === rok) {
      const ucast = ucastnik[rok];
      const { udaje: { prijmeni, jmeno, narozeni, obec }, prihlaska, platby } = ucast;
      const { datum, kategorie: kategorieId, startCislo, kod } = prihlaska;
      const jednaKategorie = kategorie[kategorieId];
      const predepsano = predepsaneStartovneCommon({ kategorie, prihlaska, rocniky, rok }).suma;
      const zaplaceno = provedenePlatby(platby).suma;

      if (
        prijmeni.toLowerCase().startsWith(textFilter) ||
        jmeno.toLowerCase().startsWith(textFilter)
      ) {
        if (kategorieVykonuFilter === '' || kategorieVykonuFilter === jednaKategorie.typ) {
          result.push({
            id,
            prijmeni,
            jmeno,
            narozeni,
            obec,
            datum,
            kategorie: jednaKategorie,
            startCislo,
            kod,
            predepsano,
            zaplaceno
          });
        }
      }
    }
  });

  const sortMethods = {
    prijmeni: (a, b) => csStringSortMethod(a.prijmeni, b.prijmeni),
    jmeno: (a, b) => csStringSortMethod(a.jmeno, b.jmeno),
    narozeni: (a, b) => narozeniSortMethod(a.narozeni, b.narozeni)
  };

  const sortMethod = sortMethods[sortColumn] || prijmeniJmenoNarozeniSortMethod;
  const sorted = result.sort(sortMethod);
  if (sortDir === SortDirTypes.DESC) {
    sorted.reverse();
  }

  return sorted.map(ucastnik => {
    const { narozeni, ...ostatek } = ucastnik;
    return { ...ostatek, narozeni: narozeniToStr(narozeni) };
  });
};
