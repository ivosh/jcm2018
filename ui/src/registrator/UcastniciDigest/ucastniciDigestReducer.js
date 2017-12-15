import {
  csStringSortMethod,
  narozeniSortMethod,
  prijmeniJmenoNarozeniSortMethod
} from '../../Ucastnici/ucastniciReducer';

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
  sortColumn: undefined,
  sortDir: SortDirTypes.NONE,
  filter: ''
};

const ucastniciDigestReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'UCASTNICI_DIGEST_SORT_DIR_CHANGE':
      if (state.sortColumn !== action.sortColumn) {
        return { ...state, sortColumn: action.sortColumn, sortDir: SortDirTypes.ASC };
      }
      return { ...state, sortDir: reverseSortDirType(state.sortDir) };
    case 'UCASTNICI_DIGEST_FILTER_CHANGE':
      return { ...state, filter: action.filter.toLowerCase() };
    default:
      return state;
  }
};

export default ucastniciDigestReducer;

export const getUcastniciDigestSorted = ({ allIds, byIds, sortColumn, sortDir, filter }) => {
  const ucastnici = [];
  allIds.forEach(id => {
    const ucastnik = byIds[id];
    const posledniUcast = ucastnik[ucastnik.roky[0]];
    const { udaje } = posledniUcast;

    if (
      udaje.prijmeni.toLowerCase().startsWith(filter) ||
      udaje.jmeno.toLowerCase().startsWith(filter)
    ) {
      ucastnici.push({
        id,
        prijmeni: udaje.prijmeni,
        jmeno: udaje.jmeno,
        narozeni: udaje.narozeni
      });
    }
  });

  const sortMethods = {
    prijmeni: (a, b) => csStringSortMethod(a.prijmeni, b.prijmeni),
    jmeno: (a, b) => csStringSortMethod(a.jmeno, b.jmeno),
    narozeni: (a, b) => narozeniSortMethod(a.narozeni, b.narozeni)
  };

  const sortMethod = sortMethods[sortColumn] || prijmeniJmenoNarozeniSortMethod;
  const sorted = ucastnici.sort(sortMethod);
  if (sortDir === SortDirTypes.DESC) {
    sorted.reverse();
  }

  return sorted.map(ucastnik => {
    const { narozeni, ...ostatek } = ucastnik;
    const { den, mesic, rok } = narozeni;
    return { ...ostatek, narozeni: mesic && den ? `${den}. ${mesic}. ${rok}` : `${rok}` };
  });
};
