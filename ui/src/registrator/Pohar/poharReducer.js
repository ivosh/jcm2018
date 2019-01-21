import { UCASTI_NA_POHAR } from '../../common';
import { AKTUALNI_ROK } from '../../constants';
import { sortForColumn } from '../../sort';
import {
  createFilterableReducer,
  initialState as filterableInitialState
} from '../Filterable/filterableReducer';
import {
  createUcastniciTableReducer,
  initialState as ucastniciTableInitialState
} from '../UcastniciTable/ucastniciTableReducer';

export const initialState = {
  narokovaneFilter: false, // jen potenciální nárok z přihlášky
  neprevzateFilter: false, // jen nepřevzaté
  ...filterableInitialState,
  ...ucastniciTableInitialState
};

const filterableReducer = createFilterableReducer('POHAR');
const ucastniciTableReducer = createUcastniciTableReducer('POHAR');
const poharReducer = (state = initialState, action) => {
  state = filterableReducer(state, action); // eslint-disable-line no-param-reassign
  state = ucastniciTableReducer(state, action); // eslint-disable-line no-param-reassign

  switch (action.type) {
    case 'POHAR_NAROKOVANE_FILTER_CHANGE':
      return { ...state, narokovaneFilter: !state.narokovaneFilter };
    case 'POHAR_NEPREVZATE_FILTER_CHANGE':
      return { ...state, neprevzateFilter: !state.neprevzateFilter };
    default:
      return state;
  }
};

export default poharReducer;

export const getPoharySorted = ({
  narokovaneFilter,
  neprevzateFilter,
  textFilter,
  sortColumn,
  sortDir,
  kategorie,
  ucastnici
}) => {
  const maratonci = ucastnici.allIds
    .map(id => {
      const ucastnik = ucastnici.byIds[id];
      const dokoncene = ucastnik.roky
        .map(rok => {
          const { prihlaska, vykon } = ucastnik[rok];
          const { kategorie: kategorieId } = prihlaska;
          return kategorie[kategorieId].typ === 'maraton' && vykon && vykon.dokonceno === true
            ? rok
            : undefined;
        })
        .filter(rok => rok !== undefined);

      const prihlaseno = ucastnik.roky.reduce((result, rok) => {
        const { prihlaska } = ucastnik[rok];
        const { kategorie: kategorieId } = prihlaska;
        return result || (kategorie[kategorieId].typ === 'maraton' && rok === AKTUALNI_ROK);
      }, false);

      const { prijmeni, jmeno, narozeni } = ucastnik[ucastnik.roky[0]].udaje;
      const predano = (ucastnik.pohar && ucastnik.pohar.predano) || 0;
      const neprevzato = Math.floor(dokoncene.length / UCASTI_NA_POHAR || 0) - predano;
      const narok = prihlaseno && (dokoncene.length + 1) % UCASTI_NA_POHAR === 0;
      return {
        id,
        prijmeni,
        jmeno,
        narozeni,
        pohary: { narok, predano, neprevzato },
        ucasti: { dokoncene, prihlaseno }
      };
    })
    .filter(({ ucasti: { dokoncene, prihlaseno } }) => dokoncene.length > 0 || prihlaseno);

  const afterTextFilter = maratonci.filter(
    ({ jmeno, prijmeni }) =>
      prijmeni.toLowerCase().startsWith(textFilter) || jmeno.toLowerCase().startsWith(textFilter)
  );

  const afterNarokovaneFilter = narokovaneFilter
    ? afterTextFilter.filter(({ pohary: { narok } }) => narok > 0)
    : afterTextFilter;

  const afterNeprevzateFilter = neprevzateFilter
    ? afterNarokovaneFilter.filter(({ pohary: { neprevzato } }) => neprevzato > 0)
    : afterNarokovaneFilter;

  return sortForColumn({ data: afterNeprevzateFilter, sortColumn, sortDir });
};
