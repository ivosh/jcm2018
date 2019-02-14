import deepFreeze from 'deep-freeze';
import { SortDirTypes } from '../../sort';
import ucastniciTestData from '../../entities/ucastnici/ucastniciTestData';
import { createTextFilterChange } from '../Filterable/FilterableActions';
import { createSortDirChange } from '../UcastniciTable/UcastniciTableActions';
import { narokovaneFilterChange, neprevzateFilterChange } from './PoharyActions';
import poharyReducer, { getPoharySorted } from './poharyReducer';

const actionPrefix = 'POHARY';
const sortDirChange = createSortDirChange(actionPrefix);
const textFilterChange = createTextFilterChange(actionPrefix);

it('na začátku', () => {
  const stateBefore = undefined;

  const stateAfter = poharyReducer(stateBefore, {});
  expect(stateAfter.narokovaneFilter).toBe(false);
  expect(stateAfter.neprevzateFilter).toBe(false);
  expect(stateAfter.textFilter).toEqual('');
  expect(stateAfter.sortColumn).toBe(undefined);
  expect(stateAfter.sortDir).toEqual(SortDirTypes.NONE);
});

it('přepínání narokovaneFilter - tam', () => {
  const stateBefore = { narokovaneFilter: false };
  const stateAfter = { narokovaneFilter: true };
  deepFreeze(stateBefore);

  expect(poharyReducer(stateBefore, narokovaneFilterChange())).toEqual(stateAfter);
});

it('přepínání narokovaneFilter - a zase zpět', () => {
  const stateBefore = { narokovaneFilter: true };
  const stateAfter = { narokovaneFilter: false };
  deepFreeze(stateBefore);

  expect(poharyReducer(stateBefore, narokovaneFilterChange())).toEqual(stateAfter);
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
    textFilter: ''
  };
  const stateAfter = { ...stateBefore, textFilter: 'kl' };
  deepFreeze(stateBefore);

  expect(poharyReducer(stateBefore, textFilterChange('Kl'))).toEqual(stateAfter);
});

it('getPoharySorted() by default - nárokované i nepřevzaté', () => {
  const state = {
    ...ucastniciTestData,
    registrator: {
      pohary: {
        narokovaneFilter: false,
        neprevzateFilter: false,
        sortColumn: undefined,
        sortDir: undefined,
        textFilter: ''
      }
    }
  };
  const selected = [
    {
      id: '5a09b1fd371dec1e99b7e1c9',
      prijmeni: 'Balabák',
      jmeno: 'Roman',
      narozeni: { rok: 1956 },
      pohary: { narok: false, neprevzato: 0, predano: 0 },
      ucasti: { dokoncene: [2017], prihlaseno: false }
    },
    {
      id: 'f5c88400190a4bed88c76736',
      prijmeni: 'Smalt',
      jmeno: 'Josef',
      narozeni: { den: 25, mesic: 7, rok: 2001 },
      pohary: { narok: true, neprevzato: 0, predano: 0 },
      ucasti: { dokoncene: [2018, 2017, 2015, 2014], prihlaseno: true }
    },
    {
      id: '6f09b1fd371dec1e99b7e1c9',
      prijmeni: 'Sukdoláková',
      jmeno: 'Martina',
      narozeni: { den: 7, mesic: 12, rok: 1963 },
      pohary: { narok: false, neprevzato: 1, predano: 0 },
      ucasti: { dokoncene: [2016, 2013, 2012, 2011, 2010], prihlaseno: false }
    }
  ];
  deepFreeze(state);

  const {
    entities,
    registrator: { pohary }
  } = state;
  expect(getPoharySorted({ ...entities, ...pohary })).toEqual(selected);
});

it('getPoharySorted() filtrováno na s', () => {
  const state = {
    ...ucastniciTestData,
    registrator: {
      pohary: {
        narokovaneFilter: false,
        neprevzateFilter: false,
        sortColumn: undefined,
        sortDir: undefined,
        textFilter: 's'
      }
    }
  };
  const selected = [
    {
      id: 'f5c88400190a4bed88c76736',
      prijmeni: 'Smalt',
      jmeno: 'Josef',
      narozeni: { den: 25, mesic: 7, rok: 2001 },
      pohary: { narok: true, neprevzato: 0, predano: 0 },
      ucasti: { dokoncene: [2018, 2017, 2015, 2014], prihlaseno: true }
    },
    {
      id: '6f09b1fd371dec1e99b7e1c9',
      prijmeni: 'Sukdoláková',
      jmeno: 'Martina',
      narozeni: { den: 7, mesic: 12, rok: 1963 },
      pohary: { narok: false, neprevzato: 1, predano: 0 },
      ucasti: { dokoncene: [2016, 2013, 2012, 2011, 2010], prihlaseno: false }
    }
  ];
  deepFreeze(state);

  const {
    entities,
    registrator: { pohary }
  } = state;
  expect(getPoharySorted({ ...entities, ...pohary })).toEqual(selected);
});

it('getPoharySorted() by default - jen s nárokem', () => {
  const state = {
    ...ucastniciTestData,
    registrator: {
      pohary: {
        narokovaneFilter: true,
        neprevzateFilter: false,
        sortColumn: undefined,
        sortDir: undefined,
        textFilter: ''
      }
    }
  };
  const selected = [
    {
      id: 'f5c88400190a4bed88c76736',
      prijmeni: 'Smalt',
      jmeno: 'Josef',
      narozeni: { den: 25, mesic: 7, rok: 2001 },
      pohary: { narok: true, neprevzato: 0, predano: 0 },
      ucasti: { dokoncene: [2018, 2017, 2015, 2014], prihlaseno: true }
    }
  ];
  deepFreeze(state);

  const {
    entities,
    registrator: { pohary }
  } = state;
  expect(getPoharySorted({ ...entities, ...pohary })).toEqual(selected);
});

it('getPoharySorted() by default - jen s nepřevzatým pohárem', () => {
  const state = {
    ...ucastniciTestData,
    registrator: {
      pohary: {
        narokovaneFilter: false,
        neprevzateFilter: true,
        sortColumn: undefined,
        sortDir: undefined,
        textFilter: ''
      }
    }
  };
  const selected = [
    {
      id: '6f09b1fd371dec1e99b7e1c9',
      prijmeni: 'Sukdoláková',
      jmeno: 'Martina',
      narozeni: { den: 7, mesic: 12, rok: 1963 },
      pohary: { narok: false, neprevzato: 1, predano: 0 },
      ucasti: { dokoncene: [2016, 2013, 2012, 2011, 2010], prihlaseno: false }
    }
  ];
  deepFreeze(state);

  const {
    entities,
    registrator: { pohary }
  } = state;
  expect(getPoharySorted({ ...entities, ...pohary })).toEqual(selected);
});
