import {
  csStringSortMethod,
  narozeniSortMethod,
  prijmeniJmenoNarozeniSortMethod,
  SortDirTypes
} from '../../Util';
import {
  createFilterableReducer,
  initialState as filterableInitialState
} from '../Filterable/filterableReducer';
import {
  createUcastniciTableReducer,
  initialState as ucastniciTableInitialState
} from '../UcastniciTable/ucastniciTableReducer';

export const initialState = {
  ...filterableInitialState,
  ...ucastniciTableInitialState
};

const filterableReducer = createFilterableReducer('UCASTNICI_DIGEST');
const ucastniciTableReducer = createUcastniciTableReducer('UCASTNICI_DIGEST');

const ucastniciDigestReducer = (state = initialState, action) => {
  state = filterableReducer(state, action); // eslint-disable-line no-param-reassign
  return ucastniciTableReducer(state, action);
};

export default ucastniciDigestReducer;

export const getVykony = (kategorie, ucastnik) => {
  const vykony = {};
  const typyKategorie = {};

  ucastnik.roky.forEach(rok => {
    const { vykon } = ucastnik[rok];
    if (vykon) {
      const typKategorie = kategorie[vykon.kategorie].typ;
      vykony[rok] = {
        kategorie: typKategorie,
        dokonceno: vykon.dokonceno
      };
      // Mark this particular typKategorie in typyKategorie dictionary.
      typyKategorie[typKategorie] = typKategorie;
    }
  });

  return { vykony, typyKategorie };
};

export const getUcastniciDigestSorted = ({
  kategorie,
  ucastnici,
  kategorieFilter,
  textFilter,
  sortColumn,
  sortDir
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
      const { vykony, typyKategorie } = getVykony(kategorie, ucastnik);
      typyKategorie[''] = true; // empty filter means a match as well
      if (typyKategorie[kategorieFilter]) {
        result.push({
          id,
          prijmeni: udaje.prijmeni,
          jmeno: udaje.jmeno,
          narozeni: udaje.narozeni,
          ...vykony
        });
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

  return sorted;
};
