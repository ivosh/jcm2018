import deepFreeze from 'deep-freeze';
import { signOutSuccess } from '../../auth/SignOut/SignOutActions';
import { saveUcastSuccess } from '../../registrator/Prihlaseni/PrihlaseniActions';
import ucastniciReducer, {
  narozeniSortMethod,
  prijmeniJmenoNarozeniSortMethod
} from './ucastniciReducer';
import { fetchUcastniciSuccess } from './ucastniciActions';
import ucastniciTestData from './ucastniciTestData';

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
            pohlavi: 'žena',
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
            pohlavi: 'muž',
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
            pohlavi: 'muž',
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
            pohlavi: 'žena',
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
            pohlavi: 'muž',
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
            pohlavi: 'muž',
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

it('po odhlášení', () => {
  const stateBefore = ucastniciTestData.entities.ucastnici;
  const stateAfter = { allIds: [], byIds: {} };
  deepFreeze(stateBefore);

  expect(ucastniciReducer(stateBefore, signOutSuccess())).toEqual(stateAfter);
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
    { rok: 1978, mesic: 8, den: 7, id: 1 },
    { rok: 1978, id: 2 },
    { rok: 1978, mesic: 10, id: 3 },
    { rok: 1978, mesic: 10, id: 4 },
    { rok: 1978, mesic: 8, den: 6, id: 5 },
    { rok: 1978, mesic: 8, den: 5, id: 6 },
    { rok: 1978, mesic: 9, id: 7 },
    { rok: 1978, mesic: 10, id: 8 }
  ];
  expect(narozeni.sort(narozeniSortMethodDescending)).toEqual([
    { rok: 1978, id: 2 },
    { rok: 1978, mesic: 8, den: 5, id: 6 },
    { rok: 1978, mesic: 8, den: 6, id: 5 },
    { rok: 1978, mesic: 8, den: 7, id: 1 },
    { rok: 1978, mesic: 9, id: 7 },
    { rok: 1978, mesic: 10, id: 3 },
    { rok: 1978, mesic: 10, id: 4 },
    { rok: 1978, mesic: 10, id: 8 }
  ]);
});

it('narozeniSort(desc=true) - prázdný den', () => {
  const narozeni = [{ rok: 1978, mesic: 8 }, { rok: 1978 }, { rok: 1978, mesic: 8, den: 6 }];
  expect(narozeni.sort(narozeniSortMethodDescending)).toEqual([
    { rok: 1978 },
    { rok: 1978, mesic: 8 },
    { rok: 1978, mesic: 8, den: 6 }
  ]);
});

it('prijmeniJmenoNarozeniSortMethod - podle jména', () => {
  const ucastnici = [
    { prijmeni: 'Bubáková', jmeno: 'Milena', narozeni: { rok: 1978, mesic: 8, den: 7 } },
    { prijmeni: 'Bubáková', jmeno: 'Alena', narozeni: { rok: 1999, mesic: 1, den: 23 } }
  ];
  expect(ucastnici.sort(prijmeniJmenoNarozeniSortMethod)).toEqual([
    { prijmeni: 'Bubáková', jmeno: 'Alena', narozeni: { rok: 1999, mesic: 1, den: 23 } },
    { prijmeni: 'Bubáková', jmeno: 'Milena', narozeni: { rok: 1978, mesic: 8, den: 7 } }
  ]);
});

it('prijmeniJmenoNarozeniSortMethod - podle narození', () => {
  const ucastnici = [
    { prijmeni: 'Bubáková', jmeno: 'Milena', narozeni: { rok: 1999, mesic: 8, den: 7 } },
    { prijmeni: 'Bubáková', jmeno: 'Milena', narozeni: { rok: 1968, mesic: 1, den: 23 } }
  ];
  expect(ucastnici.sort(prijmeniJmenoNarozeniSortMethod)).toEqual([
    { prijmeni: 'Bubáková', jmeno: 'Milena', narozeni: { rok: 1968, mesic: 1, den: 23 } },
    { prijmeni: 'Bubáková', jmeno: 'Milena', narozeni: { rok: 1999, mesic: 8, den: 7 } }
  ]);
});

it('saveUcastSuccess() - stávající účastník - nový rok', () => {
  const stateBefore = { ...ucastniciTestData.entities.ucastnici };
  deepFreeze(stateBefore);
  const id = '6f09b1fd371dec1e99b7e1c9';
  const rok = 2018;
  const ucastnik = ucastniciTestData.entities.ucastnici.byIds[id];
  let { udaje } = ucastnik[2016];
  udaje = { ...udaje, klub: 'SK Nudle' };
  const prihlaska = {
    datum: '2018-05-12T00:00:00.000Z',
    kategorie: '5a587e1b051c181132cf83db',
    typ: 'půlmaraton',
    startCislo: 15,
    kod: '===kod===',
    mladistvyPotvrzen: undefined
  };
  const platby = [{ castka: 200, datum: '2018-05-12T00:00:00.000Z', typ: 'převodem' }];

  expect(
    ucastniciReducer(stateBefore, saveUcastSuccess({ id, rok, udaje, prihlaska, platby }))
  ).toMatchSnapshot();
});

it('saveUcastSuccess() - stávající účastník - stávající rok', () => {
  const stateBefore = { ...ucastniciTestData.entities.ucastnici };
  deepFreeze(stateBefore);
  const id = '5a09b1fd371dec1e99b7e1c9';
  const rok = 2018;
  const ucastnik = ucastniciTestData.entities.ucastnici.byIds[id];
  const { udaje } = ucastnik[2018];
  let { prihlaska } = ucastnik[2018];
  prihlaska = { ...prihlaska, startCislo: 18 };

  expect(
    ucastniciReducer(stateBefore, saveUcastSuccess({ id, rok, udaje, prihlaska }))
  ).toMatchSnapshot();
});

it('saveUcastSuccess() - nový účastník', () => {
  const stateBefore = { ...ucastniciTestData.entities.ucastnici };
  deepFreeze(stateBefore);
  const id = '7a09b1fd371dec1e99b79853';
  const rok = 2018;
  const udaje = {
    prijmeni: 'Malá',
    jmeno: 'Bára',
    narozeni: { den: 4, mesic: 10, rok: 1998 },
    pohlavi: 'žena',
    adresa: 'Za elektrárnou 21',
    obec: 'Mieroszow',
    stat: 'Polsko'
  };
  const prihlaska = {
    datum: '2018-05-12T00:00:00.000Z',
    kategorie: '5a587e1b051c181132cf83d9',
    typ: 'půlmaraton',
    startCislo: 15,
    kod: '===kod===',
    mladistvyPotvrzen: undefined
  };
  const platby = [{ castka: 200, datum: '2018-05-12T00:00:00.000Z', typ: 'složenkou' }];

  expect(
    ucastniciReducer(stateBefore, saveUcastSuccess({ id, rok, udaje, prihlaska, platby }))
  ).toMatchSnapshot();
});
