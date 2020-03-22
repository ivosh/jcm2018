import deepFreeze from 'deep-freeze';
import { ActionPrefixes, ReduxNames } from '../../constants';
import ucastniciTestData from '../../entities/ucastnici/ucastniciTestData';
import { SortDirTypes } from '../../sort';
import {
  createKategorieFilterChange,
  createTextFilterChange,
} from '../Filterable/FilterableActions';
import { createSortDirChange } from '../UcastniciTable/UcastniciTableActions';
import { kategorieSubFilterChange } from './PoradiActions';
import poradiReducer, { getPoradiSorted } from './poradiReducer';

const actionPrefix = ActionPrefixes.PORADI;
const kategorieFilterChange = createKategorieFilterChange(actionPrefix);
const reduxName = ReduxNames.poradi;
const sortDirChange = createSortDirChange(actionPrefix);
const textFilterChange = createTextFilterChange(actionPrefix);

it('na začátku', () => {
  const stateBefore = undefined;

  const stateAfter = poradiReducer(stateBefore, {});
  expect(stateAfter.kategorieFilter).toEqual('');
  expect(stateAfter.kategorieSubFilter).toEqual('');
  expect(stateAfter.textFilter).toEqual('');
  expect(stateAfter.sortColumn).toBe(undefined);
  expect(stateAfter.sortDir).toEqual(SortDirTypes.NONE);
});

it('přepínání kategorieSubFilter', () => {
  const stateBefore = { kategorieFilter: 'maraton' };
  const stateAfter = { ...stateBefore, kategorieSubFilter: '5a587e1a051c181132cf83ba' };
  deepFreeze(stateBefore);

  expect(poradiReducer(stateBefore, kategorieSubFilterChange('5a587e1a051c181132cf83ba'))).toEqual(
    stateAfter
  );
});

it('přepínání kategorieSubFilter - vypnout', () => {
  const stateBefore = {
    kategorieFilter: 'maraton',
    kategorieSubFilter: '5a587e1a051c181132cf83ba',
  };
  const stateAfter = { ...stateBefore, kategorieSubFilter: '' };
  deepFreeze(stateBefore);

  expect(poradiReducer(stateBefore, kategorieSubFilterChange('5a587e1a051c181132cf83ba'))).toEqual(
    stateAfter
  );
});

it('přepínání kategorieFilter - vypnout', () => {
  const stateBefore = {
    kategorieFilter: 'maraton',
    kategorieSubFilter: '5a587e1a051c181132cf83ba',
  };
  const stateAfter = { kategorieFilter: '', kategorieSubFilter: '' };
  deepFreeze(stateBefore);

  expect(poradiReducer(stateBefore, kategorieFilterChange(''))).toEqual(stateAfter);
});

it('přepínání kategorieFilter - přepnout', () => {
  const stateBefore = {
    kategorieFilter: 'maraton',
    kategorieSubFilter: '5a587e1a051c181132cf83ba',
  };
  const stateAfter = { kategorieFilter: 'cyklo', kategorieSubFilter: '' };
  deepFreeze(stateBefore);

  expect(poradiReducer(stateBefore, kategorieFilterChange('cyklo'))).toEqual(stateAfter);
});

it('řadit dle příjmení vzestupně', () => {
  const stateBefore = { sortColumn: undefined, sortDir: SortDirTypes.NONE };
  const stateAfter = { sortColumn: 'prijmeni', sortDir: SortDirTypes.ASC };
  deepFreeze(stateBefore);

  expect(poradiReducer(stateBefore, sortDirChange('prijmeni'))).toEqual(stateAfter);
});

it('řadit dle příjmení sestupně', () => {
  const stateBefore = { sortColumn: 'prijmeni', sortDir: SortDirTypes.ASC };
  const stateAfter = { sortColumn: 'prijmeni', sortDir: SortDirTypes.DESC };
  deepFreeze(stateBefore);

  expect(poradiReducer(stateBefore, sortDirChange('prijmeni'))).toEqual(stateAfter);
});

it('řadit dle příjmení zase vzestupně', () => {
  const stateBefore = { sortColumn: 'prijmeni', sortDir: SortDirTypes.DESC };
  const stateAfter = { ...stateBefore, sortColumn: 'prijmeni', sortDir: SortDirTypes.ASC };
  deepFreeze(stateBefore);

  expect(poradiReducer(stateBefore, sortDirChange('prijmeni'))).toEqual(stateAfter);
});

it('filtrovat na dvě písmena', () => {
  const stateBefore = { textFilter: '' };
  const stateAfter = { textFilter: 'kl' };
  deepFreeze(stateBefore);

  expect(poradiReducer(stateBefore, textFilterChange('Kl'))).toEqual(stateAfter);
});

it('getPoradiSorted() by default', () => {
  const state = {
    ...ucastniciTestData,
    registrator: {
      [reduxName]: {
        sortColumn: undefined,
        sortDir: undefined,
        kategorieFilter: '',
        kategorieSubFilter: '',
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
      obec: 'Ostrava 2',
      stat: 'Česká republika',
      kategorie: {
        id: '5a587e1b051c181132cf83d7',
        pohlavi: 'muž',
        typ: 'půlmaraton',
        vek: { min: 60, max: 150 },
        zkratka: '4M',
      },
      startCislo: 15,
      dokonceno: false,
    },
    {
      id: '9ccbc71dedc1e99b7e1d671',
      prijmeni: 'Půlmaratonka',
      jmeno: 'Božena',
      narozeni: { den: 25, mesic: 7, rok: 2001 },
      obec: 'Velhartice',
      stat: 'Česká republika',
      klub: 'Bor',
      kategorie: {
        id: '5a587e1b051c181132cf83d9',
        typ: 'půlmaraton',
        pohlavi: 'žena',
        vek: { min: 18, max: 39 },
        zkratka: '1Ž',
      },
      startCislo: 8,
      dokonceno: true,
      cas: 'PT3H15M32.6S',
      absPoradi: 2,
      relPoradi: 2,
    },
    {
      id: '7a09b1fd371dec1e99b7e142',
      prijmeni: 'Zralá',
      jmeno: 'Hana',
      narozeni: { den: 25, mesic: 7, rok: 1999 },
      obec: 'Bučovice',
      stat: 'Česká republika',
      klub: 'SK Nudle',
      kategorie: {
        id: '5a587e1b051c181132cf83d9',
        typ: 'půlmaraton',
        pohlavi: 'žena',
        vek: { min: 18, max: 39 },
        zkratka: '1Ž',
      },
      startCislo: 11,
      dokonceno: true,
      cas: 'PT2H06M32.6S',
      absPoradi: 1,
      relPoradi: 1,
    },
  ];
  deepFreeze(state);

  const {
    entities,
    registrator: { [reduxName]: props },
  } = state;
  expect(getPoradiSorted({ ...entities, ...props })).toEqual(selected);
});

it('getPoradiSorted() - filter for startovní číslo 11', () => {
  const state = {
    ...ucastniciTestData,
    registrator: {
      [reduxName]: {
        sortColumn: undefined,
        sortDir: undefined,
        kategorieFilter: '',
        kategorieSubFilter: '',
        textFilter: '11',
      },
    },
  };
  const selected = [
    {
      id: '7a09b1fd371dec1e99b7e142',
      prijmeni: 'Zralá',
      jmeno: 'Hana',
      narozeni: { den: 25, mesic: 7, rok: 1999 },
      obec: 'Bučovice',
      stat: 'Česká republika',
      klub: 'SK Nudle',
      kategorie: {
        id: '5a587e1b051c181132cf83d9',
        typ: 'půlmaraton',
        pohlavi: 'žena',
        vek: { min: 18, max: 39 },
        zkratka: '1Ž',
      },
      startCislo: 11,
      dokonceno: true,
      cas: 'PT2H06M32.6S',
      absPoradi: 1,
      relPoradi: 1,
    },
  ];
  deepFreeze(state);

  const {
    entities,
    registrator: { [reduxName]: props },
  } = state;
  expect(getPoradiSorted({ ...entities, ...props })).toEqual(selected);
});

it('getPoradiSorted() - filter for kategorie půlmaraton/žena/18-39', () => {
  const state = {
    ...ucastniciTestData,
    registrator: {
      [reduxName]: {
        sortColumn: undefined,
        sortDir: undefined,
        kategorieFilter: 'půlmaraton',
        kategorieSubFilter: '5a587e1b051c181132cf83d9',
        textFilter: '',
      },
    },
  };
  const selected = [
    {
      id: '9ccbc71dedc1e99b7e1d671',
      prijmeni: 'Půlmaratonka',
      jmeno: 'Božena',
      narozeni: { den: 25, mesic: 7, rok: 2001 },
      obec: 'Velhartice',
      stat: 'Česká republika',
      klub: 'Bor',
      kategorie: {
        id: '5a587e1b051c181132cf83d9',
        typ: 'půlmaraton',
        pohlavi: 'žena',
        vek: { min: 18, max: 39 },
        zkratka: '1Ž',
      },
      startCislo: 8,
      dokonceno: true,
      cas: 'PT3H15M32.6S',
      absPoradi: 2,
      relPoradi: 2,
    },
    {
      id: '7a09b1fd371dec1e99b7e142',
      prijmeni: 'Zralá',
      jmeno: 'Hana',
      narozeni: { den: 25, mesic: 7, rok: 1999 },
      obec: 'Bučovice',
      stat: 'Česká republika',
      klub: 'SK Nudle',
      kategorie: {
        id: '5a587e1b051c181132cf83d9',
        typ: 'půlmaraton',
        pohlavi: 'žena',
        vek: { min: 18, max: 39 },
        zkratka: '1Ž',
      },
      startCislo: 11,
      dokonceno: true,
      cas: 'PT2H06M32.6S',
      absPoradi: 1,
      relPoradi: 1,
    },
  ];
  deepFreeze(state);

  const {
    entities,
    registrator: { [reduxName]: props },
  } = state;
  expect(getPoradiSorted({ ...entities, ...props })).toEqual(selected);
});
