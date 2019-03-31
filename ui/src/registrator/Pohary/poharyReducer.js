import { UCASTI_NA_POHAR } from '../../common';
import { AKTUALNI_ROK } from '../../constants';
import { numberAndUndefinedSortMethod, SortDirTypes, sortForColumn } from '../../sort';
import {
  createFilterableReducer,
  initialState as filterableInitialState
} from '../Filterable/filterableReducer';
import {
  createUcastniciTableReducer,
  initialState as ucastniciTableInitialState
} from '../UcastniciTable/ucastniciTableReducer';

/* Note: První tři filtry fungují inkluzivně; z vybraných účastníků se udělá union.
   Pokud není ani jeden filtr zapnutý, vezmou se všichni maratonci s alespoň jednou
   dokončenou účastí, aktuální přihláškou nebo startem. */
export const initialState = {
  narokovanePrihlaskouFilter: false, // potenciální nárok z přihlášky
  narokovaneStartemFilter: false, // nárok z toho, že přišel na start
  neprevzateFilter: false, // jen nepřevzaté
  ...filterableInitialState,
  ...ucastniciTableInitialState
};

export const createPoharyReducer = actionPrefix => {
  const filterableReducer = createFilterableReducer(actionPrefix);
  const ucastniciTableReducer = createUcastniciTableReducer(actionPrefix);

  return (state = initialState, action) => {
    state = filterableReducer(state, action); // eslint-disable-line no-param-reassign
    state = ucastniciTableReducer(state, action); // eslint-disable-line no-param-reassign

    switch (action.type) {
      case `${actionPrefix}_NAROKOVANE_PRIHLASKOU_FILTER_CHANGE`:
        return { ...state, narokovanePrihlaskouFilter: !state.narokovanePrihlaskouFilter };
      case `${actionPrefix}_NAROKOVANE_STARTEM_FILTER_CHANGE`:
        return { ...state, narokovaneStartemFilter: !state.narokovaneStartemFilter };
      case `${actionPrefix}_NEPREVZATE_FILTER_CHANGE`:
        return { ...state, neprevzateFilter: !state.neprevzateFilter };
      default:
        return state;
    }
  };
};

function ucastnikUnion(arr1, arr2) {
  const union = arr1.concat(arr2);

  for (let i = 0; i < union.length; i += 1) {
    for (let j = i + 1; j < union.length; j += 1) {
      if (union[i].id === union[j].id) {
        union.splice(j, 1);
        j -= 1;
      }
    }
  }

  return union;
}

export const getPoharySorted = ({
  narokovanePrihlaskouFilter,
  narokovaneStartemFilter,
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
          const { vykon } = ucastnik[rok];
          return vykon && kategorie[vykon.kategorie].typ === 'maraton' && vykon.dokonceno === true
            ? rok
            : undefined;
        })
        .filter(rok => rok !== undefined);

      let prihlaseno = false;
      let odstartovano = false;
      const ucast = ucastnik[AKTUALNI_ROK];
      if (ucast) {
        const { prihlaska, vykon } = ucast;
        if (kategorie[prihlaska.kategorie].typ === 'maraton') {
          prihlaseno = true;
        }
        if (vykon && kategorie[vykon.kategorie].typ === 'maraton') {
          odstartovano = true;
        }
      }

      const { prijmeni, jmeno, narozeni } = ucastnik[ucastnik.roky[0]].udaje;
      const predano = (ucastnik.pohar && ucastnik.pohar.predano) || 0;
      const neprevzato = Math.floor(dokoncene.length / UCASTI_NA_POHAR || 0) - predano;
      const narokPrihlaskou = prihlaseno && (dokoncene.length + 1) % UCASTI_NA_POHAR === 0;
      const narokStartem = odstartovano && (dokoncene.length + 1) % UCASTI_NA_POHAR === 0;
      return {
        id,
        prijmeni,
        jmeno,
        narozeni,
        pohary: { narokPrihlaskou, narokStartem, predano, neprevzato },
        ucasti: { dokoncene, prihlaseno, odstartovano }
      };
    })
    .filter(
      ({ ucasti: { dokoncene, prihlaseno, odstartovano } }) =>
        dokoncene.length > 0 || prihlaseno || odstartovano
    );

  const afterTextFilter = maratonci.filter(
    ({ jmeno, prijmeni }) =>
      prijmeni.toLowerCase().startsWith(textFilter) || jmeno.toLowerCase().startsWith(textFilter)
  );

  // Následující filtry jsou inkluzivní, čili pak uděláme union.
  let filteredData = afterTextFilter;
  if (narokovanePrihlaskouFilter || narokovaneStartemFilter || neprevzateFilter) {
    const narokovaniPrihlaskou = narokovanePrihlaskouFilter
      ? afterTextFilter.filter(({ pohary: { narokPrihlaskou } }) => narokPrihlaskou)
      : [];
    const narokovaniStartem = narokovaneStartemFilter
      ? afterTextFilter.filter(({ pohary: { narokStartem } }) => narokStartem)
      : [];
    const neprevzati = neprevzateFilter
      ? afterTextFilter.filter(({ pohary: { neprevzato } }) => neprevzato)
      : [];

    filteredData = ucastnikUnion(
      ucastnikUnion(narokovaniPrihlaskou, narokovaniStartem),
      neprevzati
    );
  }

  const desc = sortDir === SortDirTypes.DESC;
  const extraSortMethods = {
    narok: (a, b) =>
      numberAndUndefinedSortMethod(
        a.pohary.narokPrihlaskou || a.pohary.narokStartem ? 1 : 0,
        b.pohary.narokPrihlaskou || b.pohary.narokStartem ? 1 : 0
      ),
    neprevzato: (a, b) =>
      numberAndUndefinedSortMethod(a.pohary.neprevzato, b.pohary.neprevzato, desc),
    predano: (a, b) => numberAndUndefinedSortMethod(a.pohary.predano, b.pohary.predano, desc),
    ucasti: (a, b) =>
      numberAndUndefinedSortMethod(a.ucasti.dokoncene.length, b.ucasti.dokoncene.length, desc)
  };

  return sortForColumn({ data: filteredData, sortColumn, sortDir, extraSortMethods });
};
