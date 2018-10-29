import {
  UBYTOVANI_ODHLASIT,
  UBYTOVANI_PRIHLASIT,
  UBYTOVANI_PRESPANO,
  UBYTOVANI_NEPRESPANO
} from '../../common';
import { AKTUALNI_ROK } from '../../constants';
import { sortForColumn } from '../../sort';
import { getUcastiProRok } from '../../entities/ucastnici/ucastniciReducer';
import { createFilterableReducer } from '../Filterable/filterableReducer';
import {
  createUcastniciTableReducer,
  initialState as ucastniciTableInitialState
} from '../UcastniciTable/ucastniciTableReducer';
import { SAVE_UBYTOVANI } from './UbytovaniActions';

export const initialState = {
  loading: {},
  jenUbytovani: true,
  textFilter: '',
  ...ucastniciTableInitialState
};

const filterableReducer = createFilterableReducer('UBYTOVANI');
const ucastniciTableReducer = createUcastniciTableReducer('UBYTOVANI');

const ubytovaniReducer = (state = initialState, action) => {
  state = filterableReducer(state, action); // eslint-disable-line no-param-reassign
  state = ucastniciTableReducer(state, action); // eslint-disable-line no-param-reassign

  switch (action.type) {
    case 'UBYTOVANI_CHANGE_UBYTOVANI':
      return { ...state, jenUbytovani: !state.jenUbytovani };
    case `${SAVE_UBYTOVANI}_REQUEST`:
      return { ...state, loading: { ...state.loading, [action.request.id]: true } };
    case `${SAVE_UBYTOVANI}_SUCCESS`:
    case `${SAVE_UBYTOVANI}_ERROR`: {
      const { [action.request.id]: remove, ...rest } = state.loading;
      return { ...state, loading: rest };
    }
    default:
      return state;
  }
};

export default ubytovaniReducer;

export const getUbytovaniSorted = ({
  ucastnici,
  loading,
  jenUbytovani,
  rok = AKTUALNI_ROK,
  textFilter,
  sortColumn,
  sortDir
}) => {
  const ucasti = getUcastiProRok({ rok, ucastnici });
  const mapped = ucasti.map(jeden => {
    const { id, ucast } = jeden;
    const {
      udaje: { prijmeni, jmeno, narozeni, obec, email },
      prihlaska: { datum }
    } = ucast;
    const ubytovani = ucast.ubytovani || {};

    if (
      prijmeni.toLowerCase().startsWith(textFilter) ||
      jmeno.toLowerCase().startsWith(textFilter)
    ) {
      if (!jenUbytovani || ubytovani.pátek) {
        const prihlaseno = ubytovani.pátek && ubytovani.pátek.prihlaseno;
        const prespano = ubytovani.pátek && ubytovani.pátek.prespano;

        const akceOptions = ['<vyber>'];
        akceOptions.push(prihlaseno ? UBYTOVANI_ODHLASIT : UBYTOVANI_PRIHLASIT);
        if (!prespano) {
          akceOptions.push(UBYTOVANI_PRESPANO);
        }
        if (prespano === true || prespano === undefined) {
          akceOptions.push(UBYTOVANI_NEPRESPANO);
        }

        return {
          id,
          prijmeni,
          jmeno,
          narozeni,
          obec,
          email: email || '',
          datum: new Date(datum),
          prihlaseno,
          prespano,
          akce: { loading: !!loading[id], options: akceOptions }
        };
      }
    }

    return undefined;
  });
  const filtered = mapped.filter(jeden => jeden !== undefined);

  return sortForColumn({ data: filtered, sortColumn, sortDir });
};
