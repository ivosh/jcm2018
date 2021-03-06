import deepFreeze from 'deep-freeze';
import ucastniciTestData from '../../entities/ucastnici/ucastniciTestData';
import { SortDirTypes } from '../../sort';
import ucastniciDigestReducer, { getUcastniciDigestSorted } from './ucastniciDigestReducer';
import {
  createKategorieFilterChange,
  createTextFilterChange,
} from '../Filterable/FilterableActions';
import { createSortDirChange } from '../UcastniciTable/UcastniciTableActions';

const kategorieFilterChange = createKategorieFilterChange('UCASTNICI_DIGEST');
const sortDirChange = createSortDirChange('UCASTNICI_DIGEST');
const textFilterChange = createTextFilterChange('UCASTNICI_DIGEST');

it('na začátku', () => {
  const stateBefore = undefined;

  const stateAfter = ucastniciDigestReducer(stateBefore, {});
  expect(stateAfter.kategorieFilter).toEqual('');
  expect(stateAfter.textFilter).toEqual('');
  expect(stateAfter.sortColumn).toBe(undefined);
  expect(stateAfter.sortDir).toEqual(SortDirTypes.NONE);
});

it('řadit dle příjmení vzestupně', () => {
  const stateBefore = {
    sortColumn: undefined,
    sortDir: SortDirTypes.NONE,
    kategorieFilter: '',
    textFilter: '',
  };
  const stateAfter = { ...stateBefore, sortColumn: 'prijmeni', sortDir: SortDirTypes.ASC };
  deepFreeze(stateBefore);

  expect(ucastniciDigestReducer(stateBefore, sortDirChange('prijmeni'))).toEqual(stateAfter);
});

it('řadit dle příjmení sestupně', () => {
  const stateBefore = {
    sortColumn: 'prijmeni',
    sortDir: SortDirTypes.ASC,
    kategorieFilter: '',
    textFilter: '',
  };
  const stateAfter = { ...stateBefore, sortColumn: 'prijmeni', sortDir: SortDirTypes.DESC };
  deepFreeze(stateBefore);

  expect(ucastniciDigestReducer(stateBefore, sortDirChange('prijmeni'))).toEqual(stateAfter);
});

it('řadit dle příjmení zase vzestupně', () => {
  const stateBefore = {
    sortColumn: 'prijmeni',
    sortDir: SortDirTypes.DESC,
    kategorieFilter: '',
    textFilter: '',
  };
  const stateAfter = { ...stateBefore, sortColumn: 'prijmeni', sortDir: SortDirTypes.ASC };
  deepFreeze(stateBefore);

  expect(ucastniciDigestReducer(stateBefore, sortDirChange('prijmeni'))).toEqual(stateAfter);
});

it('řadit dle jména vzestupně', () => {
  const stateBefore = {
    sortColumn: 'prijmeni',
    sortDir: SortDirTypes.ASC,
    kategorieFilter: '',
    textFilter: '',
  };
  const stateAfter = { ...stateBefore, sortColumn: 'jmeno', sortDir: SortDirTypes.ASC };
  deepFreeze(stateBefore);

  expect(ucastniciDigestReducer(stateBefore, sortDirChange('jmeno'))).toEqual(stateAfter);
});

it('zapnout filtrování podle kategorie výkonu', () => {
  const stateBefore = {
    sortColumn: 'prijmeni',
    sortDir: SortDirTypes.ASC,
    kategorieFilter: '',
    textFilter: '',
  };
  const stateAfter = { ...stateBefore, kategorieFilter: 'půlmaraton' };
  deepFreeze(stateBefore);

  expect(ucastniciDigestReducer(stateBefore, kategorieFilterChange('půlmaraton'))).toEqual(
    stateAfter
  );
});

it('vypnout filtrování podle kategorie výkonu', () => {
  const stateBefore = {
    sortColumn: 'prijmeni',
    sortDir: SortDirTypes.ASC,
    kategorieFilter: 'půlmaraton',
    textFilter: '',
  };
  const stateAfter = { ...stateBefore, kategorieFilter: '' };
  deepFreeze(stateBefore);

  expect(ucastniciDigestReducer(stateBefore, kategorieFilterChange('půlmaraton'))).toEqual(
    stateAfter
  );
});

it('přepnout filtrování podle kategorie výkonu', () => {
  const stateBefore = {
    sortColumn: 'prijmeni',
    sortDir: SortDirTypes.ASC,
    kategorieFilter: 'půlmaraton',
    textFilter: '',
  };
  const stateAfter = { ...stateBefore, kategorieFilter: 'pěší' };
  deepFreeze(stateBefore);

  expect(ucastniciDigestReducer(stateBefore, kategorieFilterChange('pěší'))).toEqual(stateAfter);
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

  expect(ucastniciDigestReducer(stateBefore, textFilterChange('Kl'))).toEqual(stateAfter);
});

it('getUcastniciDigestSorted() by default', () => {
  const state = {
    ...ucastniciTestData,
    registrator: {
      ucastniciDigest: {
        sortColumn: undefined,
        sortDir: undefined,
        kategorieFilter: '',
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
      2017: { dokonceno: true, cas: 'PT1H25M32.6S', kategorie: 'maraton' },
      2018: { dokonceno: false, kategorie: 'půlmaraton' },
      2019: { dokonceno: false, kategorie: 'půlmaraton' },
      2020: { dokonceno: false, kategorie: 'půlmaraton' },
    },
    {
      id: '8344bc71dec1e99b7e1d01e',
      prijmeni: 'Kyselová',
      jmeno: 'Slavěna',
      narozeni: { den: 13, mesic: 8, rok: 2001 },
    },
    {
      id: '9ccbc71dedc1e99b7e1d671',
      prijmeni: 'Půlmaratonka',
      jmeno: 'Božena',
      narozeni: { den: 25, mesic: 7, rok: 2001 },
      2019: { dokonceno: true, cas: 'PT3H15M32.6S', kategorie: 'půlmaraton' },
      2020: { dokonceno: true, cas: 'PT3H15M32.6S', kategorie: 'půlmaraton' },
    },
    {
      id: 'f5c88400190a4bed88c76736',
      prijmeni: 'Smalt',
      jmeno: 'Josef',
      narozeni: { rok: 2001, mesic: 7, den: 25 },
      2018: { dokonceno: true, cas: 'PT2H06M32.6S', kategorie: 'maraton' },
      2017: { dokonceno: true, cas: 'PT2H06M32.6S', kategorie: 'maraton' },
      2015: { dokonceno: true, cas: 'PT2H06M32.6S', kategorie: 'maraton' },
      2014: { dokonceno: true, cas: 'PT2H06M32.6S', kategorie: 'maraton' },
    },
    {
      id: '6f09b1fd371dec1e99b7e1c9',
      prijmeni: 'Sukdoláková',
      jmeno: 'Martina',
      narozeni: { den: 7, mesic: 12, rok: 1963 },
      2010: { dokonceno: true, cas: 'PT3H42M32.6S', kategorie: 'maraton' },
      2011: { dokonceno: true, cas: 'PT3H42M32.6S', kategorie: 'maraton' },
      2012: { dokonceno: true, cas: 'PT3H42M32.6S', kategorie: 'maraton' },
      2013: { dokonceno: true, cas: 'PT3H42M32.6S', kategorie: 'maraton' },
      2014: { dokonceno: false, kategorie: 'maraton' },
      2016: { dokonceno: true, cas: 'PT3H42M32.6S', kategorie: 'maraton' },
    },
    {
      id: '7a09b1fd371dec1e99b7e142',
      prijmeni: 'Zralá',
      jmeno: 'Hana',
      narozeni: { den: 25, mesic: 7, rok: 1999 },
      2018: { dokonceno: true, cas: 'PT2H06M32.6S', kategorie: 'půlmaraton' },
      2019: { dokonceno: true, cas: 'PT2H06M32.6S', kategorie: 'půlmaraton' },
      2020: { dokonceno: true, cas: 'PT2H06M32.6S', kategorie: 'půlmaraton' },
    },
  ];
  deepFreeze(state);

  const { entities, registrator } = state;
  expect(getUcastniciDigestSorted({ ...entities, ...registrator.ucastniciDigest })).toEqual(
    selected
  );
});

it('getUcastniciDigestSorted() podle příjmení sestupně', () => {
  const state = {
    ...ucastniciTestData,
    registrator: {
      ucastniciDigest: {
        sortColumn: 'prijmeni',
        sortDir: SortDirTypes.DESC,
        kategorieFilter: '',
        textFilter: '',
      },
    },
  };
  const selected = [
    {
      id: '7a09b1fd371dec1e99b7e142',
      prijmeni: 'Zralá',
      jmeno: 'Hana',
      narozeni: { den: 25, mesic: 7, rok: 1999 },
      2018: { dokonceno: true, cas: 'PT2H06M32.6S', kategorie: 'půlmaraton' },
      2019: { dokonceno: true, cas: 'PT2H06M32.6S', kategorie: 'půlmaraton' },
      2020: { dokonceno: true, cas: 'PT2H06M32.6S', kategorie: 'půlmaraton' },
    },
    {
      id: '6f09b1fd371dec1e99b7e1c9',
      prijmeni: 'Sukdoláková',
      jmeno: 'Martina',
      narozeni: { den: 7, mesic: 12, rok: 1963 },
      2010: { dokonceno: true, cas: 'PT3H42M32.6S', kategorie: 'maraton' },
      2011: { dokonceno: true, cas: 'PT3H42M32.6S', kategorie: 'maraton' },
      2012: { dokonceno: true, cas: 'PT3H42M32.6S', kategorie: 'maraton' },
      2013: { dokonceno: true, cas: 'PT3H42M32.6S', kategorie: 'maraton' },
      2014: { dokonceno: false, kategorie: 'maraton' },
      2016: { dokonceno: true, cas: 'PT3H42M32.6S', kategorie: 'maraton' },
    },
    {
      id: 'f5c88400190a4bed88c76736',
      prijmeni: 'Smalt',
      jmeno: 'Josef',
      narozeni: { rok: 2001, mesic: 7, den: 25 },
      2018: { dokonceno: true, cas: 'PT2H06M32.6S', kategorie: 'maraton' },
      2017: { dokonceno: true, cas: 'PT2H06M32.6S', kategorie: 'maraton' },
      2015: { dokonceno: true, cas: 'PT2H06M32.6S', kategorie: 'maraton' },
      2014: { dokonceno: true, cas: 'PT2H06M32.6S', kategorie: 'maraton' },
    },
    {
      id: '9ccbc71dedc1e99b7e1d671',
      prijmeni: 'Půlmaratonka',
      jmeno: 'Božena',
      narozeni: { den: 25, mesic: 7, rok: 2001 },
      2019: { dokonceno: true, cas: 'PT3H15M32.6S', kategorie: 'půlmaraton' },
      2020: { dokonceno: true, cas: 'PT3H15M32.6S', kategorie: 'půlmaraton' },
    },
    {
      id: '8344bc71dec1e99b7e1d01e',
      prijmeni: 'Kyselová',
      jmeno: 'Slavěna',
      narozeni: { den: 13, mesic: 8, rok: 2001 },
    },
    {
      id: '5a09b1fd371dec1e99b7e1c9',
      prijmeni: 'Balabák',
      jmeno: 'Roman',
      narozeni: { rok: 1956 },
      2017: { dokonceno: true, cas: 'PT1H25M32.6S', kategorie: 'maraton' },
      2018: { dokonceno: false, kategorie: 'půlmaraton' },
      2019: { dokonceno: false, kategorie: 'půlmaraton' },
      2020: { dokonceno: false, kategorie: 'půlmaraton' },
    },
  ];
  deepFreeze(state);

  const { entities, registrator } = state;
  expect(getUcastniciDigestSorted({ ...entities, ...registrator.ucastniciDigest })).toEqual(
    selected
  );
});

it('getUcastniciDigestSorted() podle jména vzestupně', () => {
  const state = {
    ...ucastniciTestData,
    registrator: {
      ucastniciDigest: {
        sortColumn: 'jmeno',
        sortDir: SortDirTypes.ASC,
        kategorieFilter: '',
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
      2019: { dokonceno: true, cas: 'PT3H15M32.6S', kategorie: 'půlmaraton' },
      2020: { dokonceno: true, cas: 'PT3H15M32.6S', kategorie: 'půlmaraton' },
    },
    {
      id: '7a09b1fd371dec1e99b7e142',
      prijmeni: 'Zralá',
      jmeno: 'Hana',
      narozeni: { den: 25, mesic: 7, rok: 1999 },
      2018: { dokonceno: true, cas: 'PT2H06M32.6S', kategorie: 'půlmaraton' },
      2019: { dokonceno: true, cas: 'PT2H06M32.6S', kategorie: 'půlmaraton' },
      2020: { dokonceno: true, cas: 'PT2H06M32.6S', kategorie: 'půlmaraton' },
    },
    {
      id: 'f5c88400190a4bed88c76736',
      prijmeni: 'Smalt',
      jmeno: 'Josef',
      narozeni: { rok: 2001, mesic: 7, den: 25 },
      2018: { dokonceno: true, cas: 'PT2H06M32.6S', kategorie: 'maraton' },
      2017: { dokonceno: true, cas: 'PT2H06M32.6S', kategorie: 'maraton' },
      2015: { dokonceno: true, cas: 'PT2H06M32.6S', kategorie: 'maraton' },
      2014: { dokonceno: true, cas: 'PT2H06M32.6S', kategorie: 'maraton' },
    },
    {
      id: '6f09b1fd371dec1e99b7e1c9',
      prijmeni: 'Sukdoláková',
      jmeno: 'Martina',
      narozeni: { den: 7, mesic: 12, rok: 1963 },
      2010: { dokonceno: true, cas: 'PT3H42M32.6S', kategorie: 'maraton' },
      2011: { dokonceno: true, cas: 'PT3H42M32.6S', kategorie: 'maraton' },
      2012: { dokonceno: true, cas: 'PT3H42M32.6S', kategorie: 'maraton' },
      2013: { dokonceno: true, cas: 'PT3H42M32.6S', kategorie: 'maraton' },
      2014: { dokonceno: false, kategorie: 'maraton' },
      2016: { dokonceno: true, cas: 'PT3H42M32.6S', kategorie: 'maraton' },
    },
    {
      id: '5a09b1fd371dec1e99b7e1c9',
      prijmeni: 'Balabák',
      jmeno: 'Roman',
      narozeni: { rok: 1956 },
      2017: { dokonceno: true, cas: 'PT1H25M32.6S', kategorie: 'maraton' },
      2018: { dokonceno: false, kategorie: 'půlmaraton' },
      2019: { dokonceno: false, kategorie: 'půlmaraton' },
      2020: { dokonceno: false, kategorie: 'půlmaraton' },
    },
    {
      id: '8344bc71dec1e99b7e1d01e',
      prijmeni: 'Kyselová',
      jmeno: 'Slavěna',
      narozeni: { den: 13, mesic: 8, rok: 2001 },
    },
  ];
  deepFreeze(state);

  const { entities, registrator } = state;
  expect(getUcastniciDigestSorted({ ...entities, ...registrator.ucastniciDigest })).toEqual(
    selected
  );
});

it('getUcastniciDigestSorted() podle narození sestupně', () => {
  const state = {
    ...ucastniciTestData,
    registrator: {
      ucastniciDigest: {
        sortColumn: 'narozeni',
        sortDir: SortDirTypes.DESC,
        kategorieFilter: '',
        textFilter: '',
      },
    },
  };
  const selected = [
    {
      id: '8344bc71dec1e99b7e1d01e',
      prijmeni: 'Kyselová',
      jmeno: 'Slavěna',
      narozeni: { den: 13, mesic: 8, rok: 2001 },
    },
    {
      id: 'f5c88400190a4bed88c76736',
      prijmeni: 'Smalt',
      jmeno: 'Josef',
      narozeni: { rok: 2001, mesic: 7, den: 25 },
      2018: { dokonceno: true, cas: 'PT2H06M32.6S', kategorie: 'maraton' },
      2017: { dokonceno: true, cas: 'PT2H06M32.6S', kategorie: 'maraton' },
      2015: { dokonceno: true, cas: 'PT2H06M32.6S', kategorie: 'maraton' },
      2014: { dokonceno: true, cas: 'PT2H06M32.6S', kategorie: 'maraton' },
    },
    {
      id: '9ccbc71dedc1e99b7e1d671',
      prijmeni: 'Půlmaratonka',
      jmeno: 'Božena',
      narozeni: { den: 25, mesic: 7, rok: 2001 },
      2019: { dokonceno: true, cas: 'PT3H15M32.6S', kategorie: 'půlmaraton' },
      2020: { dokonceno: true, cas: 'PT3H15M32.6S', kategorie: 'půlmaraton' },
    },
    {
      id: '7a09b1fd371dec1e99b7e142',
      prijmeni: 'Zralá',
      jmeno: 'Hana',
      narozeni: { den: 25, mesic: 7, rok: 1999 },
      2018: { dokonceno: true, cas: 'PT2H06M32.6S', kategorie: 'půlmaraton' },
      2019: { dokonceno: true, cas: 'PT2H06M32.6S', kategorie: 'půlmaraton' },
      2020: { dokonceno: true, cas: 'PT2H06M32.6S', kategorie: 'půlmaraton' },
    },
    {
      id: '6f09b1fd371dec1e99b7e1c9',
      prijmeni: 'Sukdoláková',
      jmeno: 'Martina',
      narozeni: { den: 7, mesic: 12, rok: 1963 },
      2010: { dokonceno: true, cas: 'PT3H42M32.6S', kategorie: 'maraton' },
      2011: { dokonceno: true, cas: 'PT3H42M32.6S', kategorie: 'maraton' },
      2012: { dokonceno: true, cas: 'PT3H42M32.6S', kategorie: 'maraton' },
      2013: { dokonceno: true, cas: 'PT3H42M32.6S', kategorie: 'maraton' },
      2014: { dokonceno: false, kategorie: 'maraton' },
      2016: { dokonceno: true, cas: 'PT3H42M32.6S', kategorie: 'maraton' },
    },
    {
      id: '5a09b1fd371dec1e99b7e1c9',
      prijmeni: 'Balabák',
      jmeno: 'Roman',
      narozeni: { rok: 1956 },
      2017: { dokonceno: true, cas: 'PT1H25M32.6S', kategorie: 'maraton' },
      2018: { dokonceno: false, kategorie: 'půlmaraton' },
      2019: { dokonceno: false, kategorie: 'půlmaraton' },
      2020: { dokonceno: false, kategorie: 'půlmaraton' },
    },
  ];
  deepFreeze(state);

  const { entities, registrator } = state;
  expect(getUcastniciDigestSorted({ ...entities, ...registrator.ucastniciDigest })).toEqual(
    selected
  );
});

it('getUcastniciDigestSorted() filtrováno na r', () => {
  const state = {
    ...ucastniciTestData,
    registrator: {
      ucastniciDigest: {
        sortColumn: undefined,
        sortDir: undefined,
        kategorieFilter: '',
        textFilter: 'r',
      },
    },
  };
  const selected = [
    {
      id: '5a09b1fd371dec1e99b7e1c9',
      prijmeni: 'Balabák',
      jmeno: 'Roman',
      narozeni: { rok: 1956 },
      2017: { dokonceno: true, cas: 'PT1H25M32.6S', kategorie: 'maraton' },
      2018: { dokonceno: false, kategorie: 'půlmaraton' },
      2019: { dokonceno: false, kategorie: 'půlmaraton' },
      2020: { dokonceno: false, kategorie: 'půlmaraton' },
    },
  ];
  deepFreeze(state);

  const { entities, registrator } = state;
  expect(getUcastniciDigestSorted({ ...entities, ...registrator.ucastniciDigest })).toEqual(
    selected
  );
});

it('getUcastniciDigestSorted() filtrováno na kategorii výkonu půlmaraton', () => {
  const state = {
    ...ucastniciTestData,
    registrator: {
      ucastniciDigest: {
        sortColumn: undefined,
        sortDir: undefined,
        kategorieFilter: 'půlmaraton',
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
      2017: { dokonceno: true, cas: 'PT1H25M32.6S', kategorie: 'maraton' },
      2018: { dokonceno: false, kategorie: 'půlmaraton' },
      2019: { dokonceno: false, kategorie: 'půlmaraton' },
      2020: { dokonceno: false, kategorie: 'půlmaraton' },
    },
    {
      id: '9ccbc71dedc1e99b7e1d671',
      prijmeni: 'Půlmaratonka',
      jmeno: 'Božena',
      narozeni: { den: 25, mesic: 7, rok: 2001 },
      2019: { dokonceno: true, cas: 'PT3H15M32.6S', kategorie: 'půlmaraton' },
      2020: { dokonceno: true, cas: 'PT3H15M32.6S', kategorie: 'půlmaraton' },
    },
    {
      id: '7a09b1fd371dec1e99b7e142',
      prijmeni: 'Zralá',
      jmeno: 'Hana',
      narozeni: { den: 25, mesic: 7, rok: 1999 },
      2018: { dokonceno: true, cas: 'PT2H06M32.6S', kategorie: 'půlmaraton' },
      2019: { dokonceno: true, cas: 'PT2H06M32.6S', kategorie: 'půlmaraton' },
      2020: { dokonceno: true, cas: 'PT2H06M32.6S', kategorie: 'půlmaraton' },
    },
  ];
  deepFreeze(state);

  const { entities, registrator } = state;
  expect(getUcastniciDigestSorted({ ...entities, ...registrator.ucastniciDigest })).toEqual(
    selected
  );
});
