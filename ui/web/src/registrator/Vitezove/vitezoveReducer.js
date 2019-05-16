import { AKTUALNI_ROK } from '../../constants';
import { getKategorie } from '../../entities/rocniky/rocnikyReducer';
import { getUcastiProRok } from '../../entities/ucastnici/ucastniciReducer';
import { computePoradiProTyp } from '../poradi';

export const initialState = {
  kategorieFilter: '',
  kategorieSubFilter: '' // kategorie.id
};

const vitezoveReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'VITEZOVE_KATEGORIE_FILTER_CHANGE':
      if (state.kategorieFilter === action.kategorieFilter) {
        return { ...state, kategorieFilter: '', kategorieSubFilter: '' };
      }
      return { ...state, kategorieFilter: action.kategorieFilter, kategorieSubFilter: '' };
    case 'VITEZOVE_KATEGORIE_SUB_FILTER_CHANGE':
      if (state.kategorieSubFilter === action.kategorieSubFilter) {
        return { ...state, kategorieSubFilter: '' };
      }
      return { ...state, kategorieSubFilter: action.kategorieSubFilter };
    default:
      return state;
  }
};

export default vitezoveReducer;

export const getVitezove = ({
  kategorieFilter = '',
  kategorieSubFilter = '',
  rocniky,
  ucastnici,
  rok = AKTUALNI_ROK
}) => {
  if (kategorieFilter === '' || kategorieSubFilter === '') {
    return [];
  }

  const kategorieProRocnik = getKategorie({ rocniky, rok });

  const ucasti = getUcastiProRok({ rok, ucastnici });
  const mapped = ucasti.map(jeden => {
    const {
      id,
      ucast: { udaje, vykon }
    } = jeden;
    const { prijmeni, jmeno, narozeni } = udaje;
    if (!vykon) {
      return undefined;
    }
    const { kategorie: kategorieId, startCislo, dokonceno, cas } = vykon;
    if (dokonceno !== true || !cas) {
      return undefined;
    }

    return {
      id,
      prijmeni,
      jmeno,
      narozeni,
      kategorie: kategorieProRocnik.kategorie[kategorieId], // will contain 'zkratka' as well
      startCislo,
      dokonceno, // nutné pro computePoradi
      cas
    };
  });
  const filtered = mapped.filter(jeden => jeden);

  const sPoradim = computePoradiProTyp({
    data: filtered,
    kategorieProRocnik,
    typ: kategorieFilter
  });

  const vJedneKategorii = sPoradim.filter(
    ({ kategorie: jednaKategorie }) =>
      kategorieFilter === jednaKategorie.typ && kategorieSubFilter === jednaKategorie.id
  );

  return vJedneKategorii.sort((a, b) => a.relPoradi - b.relPoradi).slice(0, 3);
};
