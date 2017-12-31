import {
  csStringSortMethod,
  narozeniSortMethod,
  prijmeniJmenoNarozeniSortMethod
} from '../../entities/ucastnici/ucastniciReducer';

export const SortDirTypes = { NONE: 'none', ASC: 'asc', DESC: 'desc' };

const reverseSortDirType = sortDirType => {
  switch (sortDirType) {
    case SortDirTypes.ASC:
      return SortDirTypes.DESC;
    case SortDirTypes.DESC:
      return SortDirTypes.ASC;
    default:
      return SortDirTypes.ASC;
  }
};

export const initialState = {
  textFilter: '',
  isFetching: false,
  sortColumn: undefined,
  sortDir: SortDirTypes.NONE
};

const ucastniciDigestReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'FETCH_UCASTNICI_REQUEST':
      return { ...state, isFetching: true };
    case 'FETCH_UCASTNICI_SUCCESS':
    case 'FETCH_UCASTNICI_ERROR':
      return { ...state, isFetching: false };
    case 'UCASTNICI_DIGEST_SORT_DIR_CHANGE':
      if (state.sortColumn !== action.sortColumn) {
        return { ...state, sortColumn: action.sortColumn, sortDir: SortDirTypes.ASC };
      }
      return { ...state, sortDir: reverseSortDirType(state.sortDir) };
    case 'UCASTNICI_DIGEST_TEXT_FILTER_CHANGE':
      return { ...state, textFilter: action.textFilter.toLowerCase() };
    default:
      return state;
  }
};

export default ucastniciDigestReducer;

export const getVykony = (kategorie, ucastnik) => {
  const result = {};

  ucastnik.roky.forEach(rok => {
    const { vykon } = ucastnik[rok];
    if (vykon) {
      result[rok] = {
        kategorie: kategorie[vykon.kategorie].typ,
        dokonceno: vykon.dokonceno
      };
    }
  });

  return result;
};

export const getUcastniciDigestSorted = ({
  kategorie,
  ucastnici,
  sortColumn,
  sortDir,
  textFilter
}) => {
  const result = [];
  ucastnici.allIds.forEach(id => {
    const ucastnik = ucastnici.byIds[id];
    const posledniUcast = ucastnik[ucastnik.roky[0]];
    const { udaje } = posledniUcast;

    if (
      udaje.prijmeni.toLowerCase().startsWith(textFilter) ||
      udaje.jmeno.toLowerCase().startsWith(textFilter)
    ) {
      result.push({
        id,
        prijmeni: udaje.prijmeni,
        jmeno: udaje.jmeno,
        narozeni: udaje.narozeni,
        ...getVykony(kategorie, ucastnik)
      });
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
    const { den, mesic, rok } = narozeni;
    return { ...ostatek, narozeni: mesic && den ? `${den}. ${mesic}. ${rok}` : `${rok}` };
  });
};
