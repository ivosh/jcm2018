import deepFreeze from 'deep-freeze';
import { websocketDisconnected } from '../../App/AppActions';
import { signOutSuccess } from '../../auth/SignOut/SignOutActions';
import { saveUcastSuccess } from '../../registrator/Prihlasky/PrihlaskyForm/PrihlaskyFormActions';
import ucastniciReducer from './ucastniciReducer';
import { broadcastUcastnik, fetchUcastniciSuccess } from './ucastniciActions';
import ucastniciTestData from './ucastniciTestData';

it('nic se nestalo 1', () => {
  const stateBefore = undefined;

  const stateAfter = ucastniciReducer(stateBefore, {});
  expect(stateAfter).toEqual({ allIds: [], byIds: {}, invalidated: false });
});

it('nic se nestalo 2', () => {
  const stateBefore = { allIds: [1], byIds: { 1: { 2017: { udaje: null } } }, invalidated: false };
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

  const stateBefore = { allIds: [1], byIds: { 1: { 2017: { udaje: null } } }, invalidated: true };
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
    },
    invalidated: false
  };
  deepFreeze(stateBefore);

  expect(ucastniciReducer(stateBefore, fetchUcastniciSuccess(json))).toEqual(stateAfter);
});

it('po odhlášení', () => {
  const stateBefore = ucastniciTestData.entities.ucastnici;
  const stateAfter = { allIds: [], byIds: {}, invalidated: false };
  deepFreeze(stateBefore);

  expect(ucastniciReducer(stateBefore, signOutSuccess())).toEqual(stateAfter);
});

it('after disconnect', () => {
  const stateBefore = { invalidated: false };
  const stateAfter = { invalidated: true };
  deepFreeze(stateBefore);

  expect(ucastniciReducer(stateBefore, websocketDisconnected())).toEqual(stateAfter);
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
  const ubytovani = { pátek: { prihlaseno: true } };

  expect(
    ucastniciReducer(
      stateBefore,
      saveUcastSuccess({ id, rok, udaje, prihlaska, platby, ubytovani })
    )
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
  const ubytovani = { pátek: { prihlaseno: true, prespano: true } };

  expect(
    ucastniciReducer(
      stateBefore,
      saveUcastSuccess({ id, rok, udaje, prihlaska, platby, ubytovani })
    )
  ).toMatchSnapshot();
});

it('broadcastUcastnik - změna', () => {
  const stateBefore = { ...ucastniciTestData.entities.ucastnici };
  deepFreeze(stateBefore);
  const id = '7a09b1fd371dec1e99b7e142';
  const roky = [2018];
  const ucasti = {
    2018: {
      udaje: {
        prijmeni: 'Zralá',
        jmeno: 'Hana',
        narozeni: { rok: 1999, mesic: 7, den: 25 },
        pohlavi: 'žena',
        obec: 'Luhačovice',
        psc: '654 21',
        stat: 'Česká republika',
        klub: 'SK Nudle',
        email: 'zrala.kl@s.cz'
      },
      platby: [{ castka: 100, datum: '2018-06-09T00:00:00.000Z', typ: 'hotově' }],
      prihlaska: {
        datum: '2018-06-08T00:00:00.000Z',
        kategorie: '5a587e1b051c181132cf83d9', // půlmaraton
        startCislo: 9,
        kod: 'abc023skd204mvs345'
      },
      vykon: {
        kategorie: '5a587e1b051c181132cf83d9', // půlmaraton
        startCislo: 9,
        dokonceno: true,
        cas: 'PT2H06M32.6S'
      }
    }
  };

  expect(
    ucastniciReducer(stateBefore, broadcastUcastnik({ id, roky, ...ucasti }))
  ).toMatchSnapshot();
});
