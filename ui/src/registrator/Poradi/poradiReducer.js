import { AKTUALNI_ROK } from '../../constants';
import { sortForColumn } from '../../sort';
import { getUcastiProRok } from '../../entities/ucastnici/ucastniciReducer';
import {
  createFilterableReducer,
  initialState as filterableInitialState
} from '../Filterable/filterableReducer';
import {
  createUcastniciTableReducer,
  initialState as ucastniciTableInitialState
} from '../UcastniciTable/ucastniciTableReducer';

export const initialState = {
  kategorieSubFilter: '', // kategorie.id
  ...filterableInitialState,
  ...ucastniciTableInitialState
};

const filterableReducer = createFilterableReducer('PORADI');
const ucastniciTableReducer = createUcastniciTableReducer('PORADI');
const poradiReducer = (state = initialState, action) => {
  state = filterableReducer(state, action); // eslint-disable-line no-param-reassign
  state = ucastniciTableReducer(state, action); // eslint-disable-line no-param-reassign

  switch (action.type) {
    case 'PORADI_KATEGORIE_FILTER_CHANGE':
      return { ...state, kategorieSubFilter: '' };
    case 'PORADI_KATEGORIE_SUB_FILTER_CHANGE':
      return { ...state, kategorieSubFilter: action.kategorieSubFilter };
    default:
      return state;
  }
};

export default poradiReducer;

export const getPoradiSorted = ({
  kategorieFilter,
  kategorieSubFilter,
  textFilter,
  sortColumn,
  sortDir,
  kategorie,
  rocniky,
  ucastnici,
  rok = AKTUALNI_ROK
}) => {
  const ucasti = getUcastiProRok({ rok, ucastnici });
  const mapped = ucasti.map(jeden => {
    const { id, ucast } = jeden;
    const {
      udaje: { prijmeni, jmeno, narozeni },
      vykon
    } = ucast;
    if (!vykon) {
      return undefined;
    }
    const { kategorie: kategorieId, startCislo, dokonceno, cas } = vykon;
    const jednaKategorie = kategorie[kategorieId];

    return {
      id,
      prijmeni,
      jmeno,
      narozeni,
      kategorie: jednaKategorie,
      startCislo,
      dokonceno,
      cas
    };
  });

  const filtered = mapped.filter(jeden => jeden);

  const parsed = parseInt(textFilter, 10);
  const startCisloFilter = Number.isNaN(parsed) ? undefined : parsed;
  const afterTextFilter = filtered.filter(
    ({ jmeno, prijmeni, startCislo }) =>
      prijmeni.toLowerCase().startsWith(textFilter) ||
      jmeno.toLowerCase().startsWith(textFilter) ||
      (startCislo && startCislo === startCisloFilter)
  );

  const afterKategorieFilter = afterTextFilter.filter(
    ({ kategorie: jednaKategorie }) =>
      kategorieFilter === '' || kategorieFilter === jednaKategorie.typ
  );

  const afterKategorieSubFilter = afterKategorieFilter.filter(
    ({ kategorie: jednaKategorie }) =>
      kategorieSubFilter === '' || kategorieSubFilter === jednaKategorie.id
  );

  return sortForColumn({ data: afterKategorieSubFilter, sortColumn, sortDir });
};
