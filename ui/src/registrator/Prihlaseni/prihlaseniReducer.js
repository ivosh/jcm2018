import { AKTUALNI_ROK } from '../../constants';
import { narozeniToStr, SortDirTypes } from '../../Util';
import {
  csStringSortMethod,
  narozeniSortMethod,
  prijmeniJmenoNarozeniSortMethod
} from '../../entities/ucastnici/ucastniciReducer';
import { predepsaneStartovne, provedenePlatby } from '../platby';
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

const filterableReducer = createFilterableReducer('PRIHLASENI');
const ucastniciTableReducer = createUcastniciTableReducer('PRIHLASENI');

const prihlaseniReducer = (state = initialState, action) => {
  state = filterableReducer(state, action); // eslint-disable-line no-param-reassign
  return ucastniciTableReducer(state, action);
};

export default prihlaseniReducer;

export const getPrihlaseniSorted = ({
  kategorie,
  rocniky,
  ucastnici,
  kategorieFilter,
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
      const predepsano = predepsaneStartovne({ kategorie, prihlaska, rocniky, rok }).suma;
      const zaplaceno = provedenePlatby(platby).suma;

      if (
        prijmeni.toLowerCase().startsWith(textFilter) ||
        jmeno.toLowerCase().startsWith(textFilter)
      ) {
        if (kategorieFilter === '' || kategorieFilter === jednaKategorie.typ) {
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
