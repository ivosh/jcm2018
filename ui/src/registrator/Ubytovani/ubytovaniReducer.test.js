import deepFreeze from 'deep-freeze';
import ucastniciTestData from '../../entities/ucastnici/ucastniciTestData';
import { SortDirTypes } from '../../sort';
import { textFilterChange } from '../Filterable/FilterableActions';
import { sortDirChange } from '../UcastniciTable/UcastniciTableActions';
import { changeUbytovani, saveUbytovaniRequest, saveUbytovaniSuccess } from './UbytovaniActions';
import ubytovaniReducer, { getUbytovaniSorted } from './ubytovaniReducer';

const actionPrefix = 'UBYTOVANI';

it('na začátku', () => {
  const stateBefore = undefined;

  const stateAfter = ubytovaniReducer(stateBefore, {});
  expect(stateAfter.loading).toEqual({});
  expect(stateAfter.jenUbytovani).toBe(true);
  expect(stateAfter.textFilter).toEqual('');
  expect(stateAfter.sortColumn).toBe(undefined);
  expect(stateAfter.sortDir).toEqual(SortDirTypes.NONE);
});

it('přepínání jenUbytovani - tam', () => {
  const stateBefore = { jenUbytovani: true };
  const stateAfter = { jenUbytovani: false };

  expect(ubytovaniReducer(stateBefore, changeUbytovani())).toEqual(stateAfter);
});

it('přepínání jenUbytovani - a zpět', () => {
  const stateBefore = { jenUbytovani: false };
  const stateAfter = { jenUbytovani: true };
  deepFreeze(stateBefore);

  expect(ubytovaniReducer(stateBefore, changeUbytovani())).toEqual(stateAfter);
});

it('loading - zapnutí', () => {
  const stateBefore = { loading: {} };
  const stateAfter = { loading: { '5a09b1fd371dec1e99b7e1c9': true } };
  deepFreeze(stateBefore);

  expect(
    ubytovaniReducer(
      stateBefore,
      saveUbytovaniRequest({ id: '5a09b1fd371dec1e99b7e1c9', rok: 2018 })
    )
  ).toEqual(stateAfter);
});

it('loading - vypnutí', () => {
  const stateBefore = { loading: { '5a09b1fd371dec1e99b7e1c9': true } };
  const stateAfter = { loading: {} };
  deepFreeze(stateBefore);

  expect(
    ubytovaniReducer(
      stateBefore,
      saveUbytovaniSuccess({ id: '5a09b1fd371dec1e99b7e1c9', rok: 2018 })
    )
  ).toEqual(stateAfter);
});

it('řadit dle příjmení vzestupně', () => {
  const stateBefore = {
    jenUbytovani: true,
    sortColumn: undefined,
    sortDir: SortDirTypes.NONE,
    textFilter: ''
  };
  const stateAfter = { ...stateBefore, sortColumn: 'prijmeni', sortDir: SortDirTypes.ASC };
  deepFreeze(stateBefore);

  expect(ubytovaniReducer(stateBefore, sortDirChange(actionPrefix, 'prijmeni'))).toEqual(
    stateAfter
  );
});

it('řadit dle příjmení sestupně', () => {
  const stateBefore = {
    jenUbytovani: true,
    sortColumn: 'prijmeni',
    sortDir: SortDirTypes.ASC,
    textFilter: ''
  };
  const stateAfter = { ...stateBefore, sortColumn: 'prijmeni', sortDir: SortDirTypes.DESC };
  deepFreeze(stateBefore);

  expect(ubytovaniReducer(stateBefore, sortDirChange(actionPrefix, 'prijmeni'))).toEqual(
    stateAfter
  );
});

it('řadit dle příjmení zase vzestupně', () => {
  const stateBefore = {
    jenUbytovani: true,
    sortColumn: 'prijmeni',
    sortDir: SortDirTypes.DESC,
    textFilter: ''
  };
  const stateAfter = { ...stateBefore, sortColumn: 'prijmeni', sortDir: SortDirTypes.ASC };
  deepFreeze(stateBefore);

  expect(ubytovaniReducer(stateBefore, sortDirChange(actionPrefix, 'prijmeni'))).toEqual(
    stateAfter
  );
});

it('řadit dle jména vzestupně', () => {
  const stateBefore = {
    jenUbytovani: true,
    sortColumn: 'prijmeni',
    sortDir: SortDirTypes.ASC,
    textFilter: ''
  };
  const stateAfter = { ...stateBefore, sortColumn: 'jmeno', sortDir: SortDirTypes.ASC };
  deepFreeze(stateBefore);

  expect(ubytovaniReducer(stateBefore, sortDirChange(actionPrefix, 'jmeno'))).toEqual(stateAfter);
});

it('filtrovat na dvě písmena', () => {
  const stateBefore = {
    jenUbytovani: true,
    sortColumn: 'prijmeni',
    sortDir: SortDirTypes.ASC,
    textFilter: ''
  };
  const stateAfter = { ...stateBefore, textFilter: 'kl' };
  deepFreeze(stateBefore);

  expect(ubytovaniReducer(stateBefore, textFilterChange(actionPrefix, 'Kl'))).toEqual(stateAfter);
});

it('getUbytovaniSorted() by default', () => {
  const state = {
    ...ucastniciTestData,
    registrator: {
      prihlaseni: {
        jenUbytovani: true,
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
      obec: 'Ostrava 2',
      email: '',
      datum: new Date('2018-06-09T00:00:00.000Z'),
      prihlaseno: true,
      prespano: true
    },
    {
      id: '7a09b1fd371dec1e99b7e142',
      prijmeni: 'Zralá',
      jmeno: 'Hana',
      narozeni: { den: 25, mesic: 7, rok: 1999 },
      obec: 'Bučovice',
      email: 'zrala.kl@s.cz',
      datum: new Date('2018-06-09T00:00:00.000Z'),
      prihlaseno: true
    }
  ];
  deepFreeze(state);

  const { entities, registrator: { prihlaseni } } = state;
  expect(getUbytovaniSorted({ ...entities, ...prihlaseni })).toEqual(selected);
});

it('getUbytovaniSorted() filtrováno na z', () => {
  const state = {
    ...ucastniciTestData,
    registrator: {
      prihlaseni: {
        jenUbytovani: true,
        sortColumn: undefined,
        sortDir: undefined,
        textFilter: 'z'
      }
    }
  };
  const selected = [
    {
      id: '7a09b1fd371dec1e99b7e142',
      prijmeni: 'Zralá',
      jmeno: 'Hana',
      narozeni: { den: 25, mesic: 7, rok: 1999 },
      obec: 'Bučovice',
      email: 'zrala.kl@s.cz',
      datum: new Date('2018-06-09T00:00:00.000Z'),
      prihlaseno: true
    }
  ];
  deepFreeze(state);

  const { entities, registrator: { prihlaseni } } = state;
  expect(getUbytovaniSorted({ ...entities, ...prihlaseni })).toEqual(selected);
});
