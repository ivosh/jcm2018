import deepFreeze from 'deep-freeze';
import { UBYTOVANI_NEPRESPANO, ubytovaniModifications } from 'ui-common/common';
import { websocketDisconnected } from 'ui-common/App/connectedActions';
import { createSuccessFromAction } from 'ui-common/store/wsAPI';
import { signOut } from 'ui-common/auth/SignOut/SignOutActions';
import { AKTUALNI_ROK, ActionPrefixes } from '../../constants';
import {
  addPoznamka,
  deletePoznamka,
  modifyPoznamka
} from '../../registrator/Poznamky/PoznamkyActions';
import { createPrihlaskySave } from '../../registrator/PrihlaskyDohlasky/PrihlaskyForm/PrihlaskyFormActions';
import { createVykon, deleteVykon } from '../../registrator/Startujici/StartujiciActions';
import { modifyUbytovani } from '../../registrator/Ubytovani/UbytovaniActions';
import ucastniciReducer, { getUcastiProRok } from './ucastniciReducer';
import { broadcastUcastnik, fetchUcastnici } from './ucastniciActions';
import ucastniciTestData, { AKTUALNI_DATUM_KONANI } from './ucastniciTestData';
import { poharPredan } from '../../registrator/Pohary/PoharyActions';

const prihlaskySave = createPrihlaskySave(ActionPrefixes.PRIHLASKY);

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
          },
          poznamky: [{ datum: '2017-06-10T00:00:00.000Z', text: 'přihlášen zraněný' }]
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
          },
          poznamky: [{ datum: '2017-06-10T00:00:00.000Z', text: 'přihlášen zraněný' }]
        }
      }
    },
    invalidated: false
  };
  deepFreeze(stateBefore);

  expect(
    ucastniciReducer(
      stateBefore,
      createSuccessFromAction({ action: fetchUcastnici(), response: json })
    )
  ).toEqual(stateAfter);
});

it('po odhlášení', () => {
  const stateBefore = ucastniciTestData.entities.ucastnici;
  const stateAfter = { allIds: [], byIds: {}, invalidated: false };
  deepFreeze(stateBefore);

  expect(ucastniciReducer(stateBefore, createSuccessFromAction({ action: signOut() }))).toEqual(
    stateAfter
  );
});

it('after disconnect', () => {
  const stateBefore = { invalidated: false };
  const stateAfter = { invalidated: true };
  deepFreeze(stateBefore);

  expect(ucastniciReducer(stateBefore, websocketDisconnected())).toEqual(stateAfter);
});

it('addPoznamka - success()', () => {
  const stateBefore = { ...ucastniciTestData.entities.ucastnici };
  deepFreeze(stateBefore);
  const id = '8344bc71dec1e99b7e1d01e';
  const poznamky = [
    { datum: '2019-05-21T08:53:49.154Z', text: 'jedna poznámka' },
    { datum: '2019-06-01T15:35:43.543Z', text: 'druhá poznámka' }
  ];

  expect(
    ucastniciReducer(
      stateBefore,
      createSuccessFromAction({
        action: addPoznamka({ id, poznamka: poznamky[1], rok: AKTUALNI_ROK }),
        response: { response: { poznamky } }
      })
    )
  ).toMatchSnapshot();
});

it('deletePoznamka - success()', () => {
  const stateBefore = { ...ucastniciTestData.entities.ucastnici };
  deepFreeze(stateBefore);
  const id = '8344bc71dec1e99b7e1d01e';
  const poznamky = [{ datum: '2019-06-01T15:35:43.543Z', text: 'druhá poznámka' }];

  expect(
    ucastniciReducer(
      stateBefore,
      createSuccessFromAction({
        action: deletePoznamka({ id, index: 0, rok: AKTUALNI_ROK }),
        response: { response: { poznamky } }
      })
    )
  ).toMatchSnapshot();
});

it('modifyPoznamka - success()', () => {
  const stateBefore = { ...ucastniciTestData.entities.ucastnici };
  deepFreeze(stateBefore);
  const id = '8344bc71dec1e99b7e1d01e';
  const poznamky = [
    { datum: '2019-05-21T08:53:49.154Z', text: 'první poznámka' },
    { datum: '2019-06-01T15:35:43.543Z', text: 'druhá poznámka' }
  ];

  expect(
    ucastniciReducer(
      stateBefore,
      createSuccessFromAction({
        action: modifyPoznamka({ id, index: 0, poznamka: poznamky[0], rok: AKTUALNI_ROK }),
        response: { response: { poznamky } }
      })
    )
  ).toMatchSnapshot();
});

it('modifyUbytovani - success()', () => {
  const stateBefore = { ...ucastniciTestData.entities.ucastnici };
  deepFreeze(stateBefore);
  const id = '5a09b1fd371dec1e99b7e1c9';
  const ucastnik = ucastniciTestData.entities.ucastnici.byIds[id];
  const ubytovani = ubytovaniModifications[UBYTOVANI_NEPRESPANO]({
    den: 'pátek',
    ubytovani: ucastnik[AKTUALNI_ROK].ubytovani
  });

  expect(
    ucastniciReducer(
      stateBefore,
      createSuccessFromAction({
        action: modifyUbytovani({ id, modifikace: UBYTOVANI_NEPRESPANO, rok: AKTUALNI_ROK }),
        response: { response: { ubytovani } }
      })
    )
  ).toMatchSnapshot();
});

it('poharPredan()', () => {
  const stateBefore = { ...ucastniciTestData.entities.ucastnici };
  deepFreeze(stateBefore);

  expect(
    ucastniciReducer(
      stateBefore,
      createSuccessFromAction({ action: poharPredan({ id: '6f09b1fd371dec1e99b7e1c9' }) })
    )
  ).toMatchSnapshot();
});

it('prihlaskySave() - success - stávající účastník - nový rok', () => {
  const stateBefore = { ...ucastniciTestData.entities.ucastnici };
  deepFreeze(stateBefore);
  const id = '6f09b1fd371dec1e99b7e1c9';
  const ucastnik = ucastniciTestData.entities.ucastnici.byIds[id];
  let { udaje } = ucastnik[2016];
  udaje = { ...udaje, klub: 'SK Nudle' };
  const prihlaska = {
    datum: '2019-05-12T00:00:00.000Z',
    kategorie: '5a587e1b051c181132cf83db',
    typ: 'půlmaraton',
    startCislo: 15,
    kod: '===kod===',
    mladistvyPotvrzen: undefined
  };
  const platby = [{ castka: 200, datum: '2019-05-12T00:00:00.000Z', typ: 'převodem' }];
  const ubytovani = { pátek: { prihlaseno: true } };
  const request = { rok: AKTUALNI_ROK, udaje, prihlaska, platby, ubytovani };

  expect(
    ucastniciReducer(
      stateBefore,
      createSuccessFromAction({ action: prihlaskySave(), request, response: { response: { id } } })
    )
  ).toMatchSnapshot();
});

it('prihlaskySave() - success - stávající účastník - stávající rok', () => {
  const stateBefore = { ...ucastniciTestData.entities.ucastnici };
  deepFreeze(stateBefore);
  const id = '5a09b1fd371dec1e99b7e1c9';
  const ucastnik = ucastniciTestData.entities.ucastnici.byIds[id];
  const { udaje } = ucastnik[AKTUALNI_ROK];
  let { prihlaska } = ucastnik[AKTUALNI_ROK];
  prihlaska = { ...prihlaska, startCislo: 18 };
  const request = { id, rok: AKTUALNI_ROK, udaje, prihlaska };

  expect(
    ucastniciReducer(
      stateBefore,
      createSuccessFromAction({ action: prihlaskySave(), request, response: { response: { id } } })
    )
  ).toMatchSnapshot();
});

it('prihlaskySave() - success - nový účastník', () => {
  const stateBefore = { ...ucastniciTestData.entities.ucastnici };
  deepFreeze(stateBefore);
  const id = '7a09b1fd371dec1e99b79853';
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
  const platby = [{ castka: 200, datum: '2019-05-12T00:00:00.000Z', typ: 'složenkou' }];
  const ubytovani = { pátek: { prihlaseno: true, prespano: true } };
  const poznamky = [{ datum: new Date('2019-05-12T00:00:00.000Z'), text: 'přihlášena zraněná' }];
  const request = { rok: AKTUALNI_ROK, udaje, prihlaska, platby, ubytovani, poznamky };

  expect(
    ucastniciReducer(
      stateBefore,
      createSuccessFromAction({ action: prihlaskySave(), request, response: { response: { id } } })
    )
  ).toMatchSnapshot();
});

it('createVykon() - success', () => {
  const stateBefore = { ...ucastniciTestData.entities.ucastnici };
  deepFreeze(stateBefore);
  const request = {
    id: '8344bc71dec1e99b7e1d01e',
    rok: AKTUALNI_ROK,
    vykon: { dokonceno: null, kategorie: '5a587e1b051c181132cf83d9', startCislo: 15 }
  };

  expect(
    ucastniciReducer(stateBefore, createSuccessFromAction({ action: createVykon({}), request }))
  ).toMatchSnapshot();
});

it('deleteVykon() - success', () => {
  const stateBefore = { ...ucastniciTestData.entities.ucastnici };
  deepFreeze(stateBefore);
  const request = {
    id: '7a09b1fd371dec1e99b7e142',
    rok: AKTUALNI_ROK
  };

  expect(
    ucastniciReducer(stateBefore, createSuccessFromAction({ action: deleteVykon({}), request }))
  ).toMatchSnapshot();
});

it('broadcastUcastnik - změna', () => {
  const stateBefore = { ...ucastniciTestData.entities.ucastnici };
  deepFreeze(stateBefore);
  const id = '7a09b1fd371dec1e99b7e142';
  const roky = [AKTUALNI_ROK];
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
      platby: [{ castka: 100, datum: AKTUALNI_DATUM_KONANI, typ: 'hotově' }],
      prihlaska: {
        datum: AKTUALNI_DATUM_KONANI,
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

it('getUcastiProRok', () => {
  const state = { ...ucastniciTestData };

  expect(getUcastiProRok({ ...state.entities })).toMatchSnapshot();
});
