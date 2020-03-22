import deepFreeze from 'deep-freeze';
import { ActionPrefixes, ReduxNames } from '../../constants';
import { SortDirTypes } from '../../sort';
import ucastniciTestData from '../../entities/ucastnici/ucastniciTestData';
import { createTextFilterChange } from '../Filterable/FilterableActions';
import { createSortDirChange } from '../UcastniciTable/UcastniciTableActions';
import {
  createNarokovanePrihlaskouFilterChange,
  createNarokovaneStartemFilterChange,
  createNeprevzateFilterChange,
} from './PoharyActions';
import { createPoharyReducer, getPoharySorted } from './poharyReducer';

const actionPrefix = ActionPrefixes.POHARY;
const narokovanePrihlaskouFilterChange = createNarokovanePrihlaskouFilterChange(actionPrefix);
const narokovaneStartemFilterChange = createNarokovaneStartemFilterChange(actionPrefix);
const neprevzateFilterChange = createNeprevzateFilterChange(actionPrefix);
const poharyReducer = createPoharyReducer(actionPrefix);
const reduxName = ReduxNames.pohary;
const sortDirChange = createSortDirChange(actionPrefix);
const textFilterChange = createTextFilterChange(actionPrefix);

it('na začátku', () => {
  const stateBefore = undefined;

  const stateAfter = poharyReducer(stateBefore, {});
  expect(stateAfter.narokovanePrihlaskouFilter).toBe(false);
  expect(stateAfter.narokovaneStartemFilter).toBe(false);
  expect(stateAfter.neprevzateFilter).toBe(false);
  expect(stateAfter.textFilter).toEqual('');
  expect(stateAfter.sortColumn).toBe(undefined);
  expect(stateAfter.sortDir).toEqual(SortDirTypes.NONE);
});

it('přepínání narokovanePrihlaskouFilter - tam', () => {
  const stateBefore = { narokovanePrihlaskouFilter: false };
  const stateAfter = { narokovanePrihlaskouFilter: true };
  deepFreeze(stateBefore);

  expect(poharyReducer(stateBefore, narokovanePrihlaskouFilterChange())).toEqual(stateAfter);
});

it('přepínání narokovanePrihlaskouFilter - a zase zpět', () => {
  const stateBefore = { narokovanePrihlaskouFilter: true };
  const stateAfter = { narokovanePrihlaskouFilter: false };
  deepFreeze(stateBefore);

  expect(poharyReducer(stateBefore, narokovanePrihlaskouFilterChange())).toEqual(stateAfter);
});

it('přepínání narokovaneStartemFilter - tam', () => {
  const stateBefore = { narokovaneStartemFilter: false };
  const stateAfter = { narokovaneStartemFilter: true };
  deepFreeze(stateBefore);

  expect(poharyReducer(stateBefore, narokovaneStartemFilterChange())).toEqual(stateAfter);
});

it('přepínání narokovaneStartemFilter - a zase zpět', () => {
  const stateBefore = { narokovaneStartemFilter: true };
  const stateAfter = { narokovaneStartemFilter: false };
  deepFreeze(stateBefore);

  expect(poharyReducer(stateBefore, narokovaneStartemFilterChange())).toEqual(stateAfter);
});

it('přepínání neprevzateFilter - tam', () => {
  const stateBefore = { neprevzateFilter: true };
  const stateAfter = { neprevzateFilter: false };
  deepFreeze(stateBefore);

  expect(poharyReducer(stateBefore, neprevzateFilterChange())).toEqual(stateAfter);
});

it('přepínání neprevzateFilter - a zase zpět', () => {
  const stateBefore = { neprevzateFilter: false };
  const stateAfter = { neprevzateFilter: true };
  deepFreeze(stateBefore);

  expect(poharyReducer(stateBefore, neprevzateFilterChange())).toEqual(stateAfter);
});

it('řadit dle příjmení vzestupně', () => {
  const stateBefore = { sortColumn: undefined, sortDir: SortDirTypes.NONE };
  const stateAfter = { ...stateBefore, sortColumn: 'prijmeni', sortDir: SortDirTypes.ASC };
  deepFreeze(stateBefore);

  expect(poharyReducer(stateBefore, sortDirChange('prijmeni'))).toEqual(stateAfter);
});

it('řadit dle příjmení sestupně', () => {
  const stateBefore = { sortColumn: 'prijmeni', sortDir: SortDirTypes.ASC };
  const stateAfter = { ...stateBefore, sortColumn: 'prijmeni', sortDir: SortDirTypes.DESC };
  deepFreeze(stateBefore);

  expect(poharyReducer(stateBefore, sortDirChange('prijmeni'))).toEqual(stateAfter);
});

it('řadit dle příjmení zase vzestupně', () => {
  const stateBefore = { sortColumn: 'prijmeni', sortDir: SortDirTypes.DESC };
  const stateAfter = { ...stateBefore, sortColumn: 'prijmeni', sortDir: SortDirTypes.ASC };
  deepFreeze(stateBefore);

  expect(poharyReducer(stateBefore, sortDirChange('prijmeni'))).toEqual(stateAfter);
});

it('filtrovat na dvě písmena', () => {
  const stateBefore = {
    sortColumn: 'prijmeni',
    sortDir: SortDirTypes.ASC,
    kategorieFilter: '',
    textFilter: '',
  };
  const stateAfter = { ...stateBefore, textFilter: 'kl' };
  deepFreeze(stateBefore);

  expect(poharyReducer(stateBefore, textFilterChange('Kl'))).toEqual(stateAfter);
});

it('getPoharySorted() by default - všichni', () => {
  const state = {
    ...ucastniciTestData,
    registrator: {
      [reduxName]: {
        narokovanePrihlaskouFilter: false,
        narokovaneStartemFilter: false,
        neprevzateFilter: false,
        sortColumn: undefined,
        sortDir: undefined,
        textFilter: '',
      },
    },
  };
  const selected = [
    {
      id: '5a09b1fd371dec1e99b7e1c9',
      prijmeni: 'Balabák',
      jmeno: 'Roman',
      narozeni: { rok: 1956 },
      pohary: { narokPrihlaskou: false, narokStartem: false, neprevzato: 0, predano: 0 },
      ucasti: { dokoncene: [2017], prihlaseno: false, odstartovano: false },
    },
    {
      id: 'f5c88400190a4bed88c76736',
      prijmeni: 'Smalt',
      jmeno: 'Josef',
      narozeni: { den: 25, mesic: 7, rok: 2001 },
      pohary: { narokPrihlaskou: true, narokStartem: false, neprevzato: 0, predano: 0 },
      ucasti: { dokoncene: [2018, 2017, 2015, 2014], prihlaseno: true, odstartovano: false },
    },
    {
      id: '6f09b1fd371dec1e99b7e1c9',
      prijmeni: 'Sukdoláková',
      jmeno: 'Martina',
      narozeni: { den: 7, mesic: 12, rok: 1963 },
      pohary: { narokPrihlaskou: false, narokStartem: false, neprevzato: 1, predano: 0 },
      ucasti: { dokoncene: [2016, 2013, 2012, 2011, 2010], prihlaseno: false, odstartovano: false },
    },
  ];
  deepFreeze(state);

  const {
    entities,
    registrator: { [reduxName]: pohary },
  } = state;
  expect(getPoharySorted({ ...entities, ...pohary })).toEqual(selected);
});

it('getPoharySorted() filtrováno na s', () => {
  const state = {
    ...ucastniciTestData,
    registrator: {
      [reduxName]: {
        narokovanePrihlaskouFilter: false,
        narokovaneStartemFilter: false,
        neprevzateFilter: false,
        sortColumn: undefined,
        sortDir: undefined,
        textFilter: 's',
      },
    },
  };
  const selected = [
    {
      id: 'f5c88400190a4bed88c76736',
      prijmeni: 'Smalt',
      jmeno: 'Josef',
      narozeni: { den: 25, mesic: 7, rok: 2001 },
      pohary: { narokPrihlaskou: true, narokStartem: false, neprevzato: 0, predano: 0 },
      ucasti: { dokoncene: [2018, 2017, 2015, 2014], prihlaseno: true, odstartovano: false },
    },
    {
      id: '6f09b1fd371dec1e99b7e1c9',
      prijmeni: 'Sukdoláková',
      jmeno: 'Martina',
      narozeni: { den: 7, mesic: 12, rok: 1963 },
      pohary: { narokPrihlaskou: false, narokStartem: false, neprevzato: 1, predano: 0 },
      ucasti: { dokoncene: [2016, 2013, 2012, 2011, 2010], prihlaseno: false, odstartovano: false },
    },
  ];
  deepFreeze(state);

  const {
    entities,
    registrator: { [reduxName]: pohary },
  } = state;
  expect(getPoharySorted({ ...entities, ...pohary })).toEqual(selected);
});

it('getPoharySorted() by default - jen s nárokem z přihlášky', () => {
  const state = {
    ...ucastniciTestData,
    registrator: {
      [reduxName]: {
        narokovanePrihlaskouFilter: true,
        narokovaneStartemFilter: false,
        neprevzateFilter: false,
        sortColumn: undefined,
        sortDir: undefined,
        textFilter: '',
      },
    },
  };
  const selected = [
    {
      id: 'f5c88400190a4bed88c76736',
      prijmeni: 'Smalt',
      jmeno: 'Josef',
      narozeni: { den: 25, mesic: 7, rok: 2001 },
      pohary: { narokPrihlaskou: true, narokStartem: false, neprevzato: 0, predano: 0 },
      ucasti: { dokoncene: [2018, 2017, 2015, 2014], prihlaseno: true, odstartovano: false },
    },
  ];
  deepFreeze(state);

  const {
    entities,
    registrator: { [reduxName]: pohary },
  } = state;
  expect(getPoharySorted({ ...entities, ...pohary })).toEqual(selected);
});

it('getPoharySorted() by default - jen s nepřevzatým pohárem', () => {
  const state = {
    ...ucastniciTestData,
    registrator: {
      [reduxName]: {
        narokovanePrihlaskouFilter: false,
        narokovaneStartemFilter: false,
        neprevzateFilter: true,
        sortColumn: undefined,
        sortDir: undefined,
        textFilter: '',
      },
    },
  };
  const selected = [
    {
      id: '6f09b1fd371dec1e99b7e1c9',
      prijmeni: 'Sukdoláková',
      jmeno: 'Martina',
      narozeni: { den: 7, mesic: 12, rok: 1963 },
      pohary: { narokPrihlaskou: false, narokStartem: false, neprevzato: 1, predano: 0 },
      ucasti: { dokoncene: [2016, 2013, 2012, 2011, 2010], prihlaseno: false, odstartovano: false },
    },
  ];
  deepFreeze(state);

  const {
    entities,
    registrator: { [reduxName]: pohary },
  } = state;
  expect(getPoharySorted({ ...entities, ...pohary })).toEqual(selected);
});

it('getPoharySorted() by default - s nárokem z přihlášky + nepřevzatým pohárem', () => {
  const state = {
    ...ucastniciTestData,
    registrator: {
      [reduxName]: {
        narokovanePrihlaskouFilter: true,
        narokovaneStartemFilter: false,
        neprevzateFilter: true,
        sortColumn: undefined,
        sortDir: undefined,
        textFilter: '',
      },
    },
  };
  const selected = [
    {
      id: 'f5c88400190a4bed88c76736',
      prijmeni: 'Smalt',
      jmeno: 'Josef',
      narozeni: { den: 25, mesic: 7, rok: 2001 },
      pohary: { narokPrihlaskou: true, narokStartem: false, neprevzato: 0, predano: 0 },
      ucasti: { dokoncene: [2018, 2017, 2015, 2014], prihlaseno: true, odstartovano: false },
    },
    {
      id: '6f09b1fd371dec1e99b7e1c9',
      prijmeni: 'Sukdoláková',
      jmeno: 'Martina',
      narozeni: { den: 7, mesic: 12, rok: 1963 },
      pohary: { narokPrihlaskou: false, narokStartem: false, neprevzato: 1, predano: 0 },
      ucasti: { dokoncene: [2016, 2013, 2012, 2011, 2010], prihlaseno: false, odstartovano: false },
    },
  ];
  deepFreeze(state);

  const {
    entities,
    registrator: { [reduxName]: pohary },
  } = state;
  expect(getPoharySorted({ ...entities, ...pohary })).toEqual(selected);
});
