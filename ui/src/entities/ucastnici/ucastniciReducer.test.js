import deepFreeze from 'deep-freeze';
import ucastniciReducer, { narozeniSortMethod } from './ucastniciReducer';
import { fetchUcastniciSuccess } from './ucastniciActions';

const narozeniSortMethodDescending = (a, b) => narozeniSortMethod(a, b, true);

it('nic se nestalo 1', () => {
  const stateBefore = undefined;

  const stateAfter = ucastniciReducer(stateBefore, {});
  expect(stateAfter).toEqual({ allIds: [], byIds: {} });
});

it('nic se nestalo 2', () => {
  const stateBefore = { allIds: [1], byIds: { 1: { 2017: { udaje: null } } } };
  const stateAfter = { ...stateBefore };
  deepFreeze(stateBefore);

  expect(ucastniciReducer(stateBefore, {})).toEqual(stateAfter);
});

it('po načtení účastníků', () => {
  const json = {
    code: 'ok',
    response: {
      '6f09b1fd371dec1e99b7e1c9': {
        roky: [2016],
        2016: {
          udaje: {
            prijmeni: 'Sukdoláková',
            jmeno: 'Martina',
            narozeni: { rok: 1963 },
            pohlavi: 'zena',
            obec: 'Zlín',
            stat: 'Česká republika'
          },
          vykon: {
            kategorie: '5a71b1fd45754c1e99b7e1bc',
            startCislo: 11,
            dokonceno: true,
            cas: 'PT3H42M32.6S'
          }
        }
      },
      '5a09b1fd371dec1e99b7e1c9': {
        roky: [2018, 2017],
        2017: {
          udaje: {
            prijmeni: 'Balabák',
            jmeno: 'Roman',
            narozeni: { rok: 1956 },
            pohlavi: 'muz',
            obec: 'Ostrava 1',
            stat: 'Česká republika'
          },
          vykon: {
            kategorie: '5a71b1fd371dec1e99b7e1bc',
            startCislo: 34,
            dokonceno: true,
            cas: 'PT1H25M32.6S'
          }
        },
        2018: {
          udaje: {
            prijmeni: 'Balabák',
            jmeno: 'Roman',
            narozeni: { rok: 1956 },
            pohlavi: 'muz',
            obec: 'Ostrava 2',
            stat: 'Česká republika'
          },
          vykon: {
            kategorie: '5a71b1fd371dec1e99b7e1bc',
            startCislo: 15,
            dokonceno: false
          }
        }
      }
    },
    requestId: '0.9310306652587377'
  };

  const stateBefore = { allIds: [1], byIds: { 1: { 2017: { udaje: null } } } };
  const stateAfter = {
    allIds: ['6f09b1fd371dec1e99b7e1c9', '5a09b1fd371dec1e99b7e1c9'],
    byIds: {
      '6f09b1fd371dec1e99b7e1c9': {
        roky: [2016],
        2016: {
          udaje: {
            prijmeni: 'Sukdoláková',
            jmeno: 'Martina',
            narozeni: { rok: 1963 },
            pohlavi: 'zena',
            obec: 'Zlín',
            stat: 'Česká republika'
          },
          vykon: {
            kategorie: '5a71b1fd45754c1e99b7e1bc',
            startCislo: 11,
            dokonceno: true,
            cas: 'PT3H42M32.6S'
          }
        }
      },
      '5a09b1fd371dec1e99b7e1c9': {
        roky: [2018, 2017],
        2018: {
          udaje: {
            prijmeni: 'Balabák',
            jmeno: 'Roman',
            narozeni: { rok: 1956 },
            pohlavi: 'muz',
            obec: 'Ostrava 2',
            stat: 'Česká republika'
          },
          vykon: {
            kategorie: '5a71b1fd371dec1e99b7e1bc',
            startCislo: 15,
            dokonceno: false
          }
        },
        2017: {
          udaje: {
            prijmeni: 'Balabák',
            jmeno: 'Roman',
            narozeni: { rok: 1956 },
            pohlavi: 'muz',
            obec: 'Ostrava 1',
            stat: 'Česká republika'
          },
          vykon: {
            kategorie: '5a71b1fd371dec1e99b7e1bc',
            startCislo: 34,
            dokonceno: true,
            cas: 'PT1H25M32.6S'
          }
        }
      }
    }
  };
  deepFreeze(stateBefore);

  expect(ucastniciReducer(stateBefore, fetchUcastniciSuccess(json))).toEqual(stateAfter);
});

it('narozeniSort(desc=false) - nulls', () => {
  const narozeni = [null, { rok: 1978, mesic: 8, den: 7 }, null];
  expect(narozeni.sort(narozeniSortMethod)).toEqual([{ rok: 1978, mesic: 8, den: 7 }, null, null]);
});

it('narozeniSort(desc=false) - jen roky', () => {
  const narozeni = [{ rok: 1978 }, { rok: 1956 }, { rok: 2001 }];
  expect(narozeni.sort(narozeniSortMethod)).toEqual([{ rok: 1956 }, { rok: 1978 }, { rok: 2001 }]);
});

it('narozeniSort(desc=false) - roky, dny, měsíce', () => {
  const narozeni = [
    { rok: 1978, mesic: 4, den: 7 },
    { rok: 1956, mesic: 2, den: 25 },
    { rok: 2001, mesic: 4, den: 13 },
    { rok: 1956, mesic: 1, den: 26 },
    { rok: 2001, mesic: 4, den: 12 },
    { rok: 1956, mesic: 2, den: 25 }
  ];
  expect(narozeni.sort(narozeniSortMethod)).toEqual([
    { rok: 1956, mesic: 1, den: 26 },
    { rok: 1956, mesic: 2, den: 25 },
    { rok: 1956, mesic: 2, den: 25 },
    { rok: 1978, mesic: 4, den: 7 },
    { rok: 2001, mesic: 4, den: 12 },
    { rok: 2001, mesic: 4, den: 13 }
  ]);
});

it('narozeniSort(desc=false) - prázdný měsíc a den', () => {
  const narozeni = [
    { rok: 1978, mesic: 8, den: 7 },
    { rok: 1978 },
    { rok: 1978, mesic: 8, den: 6 }
  ];
  expect(narozeni.sort(narozeniSortMethod)).toEqual([
    { rok: 1978, mesic: 8, den: 6 },
    { rok: 1978, mesic: 8, den: 7 },
    { rok: 1978 }
  ]);
});

it('narozeniSort(desc=true) - nulls', () => {
  const narozeni = [null, { rok: 1978, mesic: 8, den: 7 }, null];
  expect(narozeni.sort(narozeniSortMethodDescending)).toEqual([
    null,
    null,
    { rok: 1978, mesic: 8, den: 7 }
  ]);
});

it('narozeniSort(desc=true) - jen roky', () => {
  const narozeni = [{ rok: 1978 }, { rok: 1956 }, { rok: 2001 }];
  expect(narozeni.sort(narozeniSortMethodDescending)).toEqual([
    { rok: 1956 },
    { rok: 1978 },
    { rok: 2001 }
  ]);
});

it('narozeniSort(desc=true) - roky, dny, měsíce', () => {
  const narozeni = [
    { rok: 1978, mesic: 4, den: 7 },
    { rok: 1956, mesic: 2, den: 25 },
    { rok: 2001, mesic: 4, den: 13 },
    { rok: 1956, mesic: 1, den: 26 },
    { rok: 2001, mesic: 4, den: 12 },
    { rok: 1956, mesic: 2, den: 25 }
  ];
  expect(narozeni.sort(narozeniSortMethodDescending)).toEqual([
    { rok: 1956, mesic: 1, den: 26 },
    { rok: 1956, mesic: 2, den: 25 },
    { rok: 1956, mesic: 2, den: 25 },
    { rok: 1978, mesic: 4, den: 7 },
    { rok: 2001, mesic: 4, den: 12 },
    { rok: 2001, mesic: 4, den: 13 }
  ]);
});

it('narozeniSort(desc=true) - prázdný měsíc a den', () => {
  const narozeni = [
    { rok: 1978, mesic: 8, den: 7 },
    { rok: 1978 },
    { rok: 1978, mesic: 8, den: 6 }
  ];
  expect(narozeni.sort(narozeniSortMethodDescending)).toEqual([
    { rok: 1978 },
    { rok: 1978, mesic: 8, den: 6 },
    { rok: 1978, mesic: 8, den: 7 }
  ]);
});
