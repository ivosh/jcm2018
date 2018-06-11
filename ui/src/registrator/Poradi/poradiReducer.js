import { AKTUALNI_ROK } from '../../constants';
import { dokoncenoCasSortMethod, sortForColumn } from '../../sort';
import { getKategorie } from '../../entities/rocniky/rocnikyReducer';
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
      if (state.kategorieSubFilter === action.kategorieSubFilter) {
        return { ...state, kategorieSubFilter: '' };
      }
      return { ...state, kategorieSubFilter: action.kategorieSubFilter };
    default:
      return state;
  }
};

export default poradiReducer;

const computePoradi = ({ data, key }) => {
  const sorted = data.sort(dokoncenoCasSortMethod);

  let index = 0;
  return sorted.map(jeden => {
    const { dokonceno, cas } = jeden;
    if (dokonceno === true && cas) {
      index += 1;
      return { ...jeden, [key]: index };
    }
    return jeden;
  });
};

export const computePoradiOverall = ({ data, kategorieProRocnik }) => {
  const vsichni = [];

  const vsechnyKategorie = Object.keys(kategorieProRocnik.typy);
  vsechnyKategorie.forEach(typ => {
    const proTyp = data.filter(({ kategorie }) => kategorie.typ === typ);
    const sAbsPoradim = computePoradi({ data: proTyp, key: 'absPoradi' });

    const serazeni = [];
    kategorieProRocnik.typy[typ].list.forEach(({ id }) => {
      const proKategorii = sAbsPoradim.filter(({ kategorie }) => kategorie.id === id);
      const sRelPoradim = computePoradi({ data: proKategorii, key: 'relPoradi' });
      serazeni.push(...sRelPoradim);
    });

    vsichni.push(...serazeni.sort(dokoncenoCasSortMethod));
  });

  return vsichni;
};

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
      udaje: { prijmeni, jmeno, narozeni, obec, klub },
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
      obec,
      klub,
      kategorie: jednaKategorie,
      startCislo,
      dokonceno,
      cas
    };
  });
  const filtered = mapped.filter(jeden => jeden);

  const kategorieProRocnik = getKategorie({ rocniky, rok });
  const sPoradim = computePoradiOverall({ data: filtered, kategorieProRocnik });

  const parsed = parseInt(textFilter, 10);
  const startCisloFilter = Number.isNaN(parsed) ? undefined : parsed;
  const afterTextFilter = sPoradim.filter(
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
