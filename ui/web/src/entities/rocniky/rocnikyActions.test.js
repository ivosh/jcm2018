import configureStore from 'redux-mock-store';
import WsClient from 'ui-common/WsClient';
import wsAPI from 'ui-common/store/wsAPI';
import { AKTUALNI_DATUM_KONANI } from '../ucastnici/ucastniciTestData';
import { FETCH_ROCNIKY, fetchRocniky } from './rocnikyActions';

const mockWsClient = new WsClient();
mockWsClient.sendRequest = null;

const successfulResponse = {
  code: 'ok',
  response: {
    kategorie: {
      '5a71b1fd45754c1e99b7e1bc': {
        id: '5a71b1fd45754c1e99b7e1bc',
        pohlavi: 'žena',
        typ: 'maraton',
        vek: {
          max: 49,
          min: 40
        }
      },
      '5a09b1fd371dec1e99b7e1c9': {
        id: '5a09b1fd371dec1e99b7e1c9',
        pohlavi: 'žena',
        typ: 'maraton',
        vek: {
          max: 59,
          min: 50
        }
      },
      '5a71b1fd371dec1e99b7e1bc': {
        id: '5a71b1fd371dec1e99b7e1bc',
        typ: 'pěší'
      },
      '8799b1fd371dec1e99b7e1c9': {
        id: '8799b1fd371dec1e99b7e1c9',
        pohlavi: 'muž',
        typ: 'půlmaraton',
        vek: {
          max: 59,
          min: 50
        }
      },
      '1609b1fd3748746e99b7e1c9': {
        id: '1609b1fd3748746e99b7e1c9',
        pohlavi: 'žena',
        typ: 'půlmaraton',
        vek: {
          max: 49,
          min: 40
        }
      },
      '3279b1fd371dec1e99b7e1c9': {
        id: '3279b1fd371dec1e99b7e1c9',
        pohlavi: 'žena',
        typ: 'půlmaraton',
        vek: {
          max: 59,
          min: 50
        }
      }
    },
    rocniky: {
      2017: {
        datum: '2017-06-10',
        id: '6f09b1fd371dec1e99b7e1c9',
        kategorie: {
          maraton: {
            startCisla: '1-100',
            startovne: {
              naMiste: 200,
              predem: 150
            },
            žena: [
              {
                id: '5a71b1fd45754c1e99b7e1bc',
                pohlavi: 'žena',
                typ: 'maraton',
                vek: {
                  max: 49,
                  min: 40
                },
                zkratka: '1Ž'
              },
              {
                id: '5a09b1fd371dec1e99b7e1c9',
                pohlavi: 'žena',
                typ: 'maraton',
                vek: {
                  max: 59,
                  min: 50
                },
                zkratka: '2Ž'
              }
            ]
          }
        },
        ubytovani: {
          pátek: { poplatek: 50 },
          sobota: { poplatek: 60 }
        }
      },
      2018: {
        datum: '2018-06-08T00:00:00.000Z',
        id: '5a71b1fd371dec1e99b7e1bc',
        kategorie: {
          maraton: {
            startCisla: '5-95',
            startovne: {
              naMiste: 250,
              predem: 200
            },
            žena: [
              {
                id: '5a71b1fd45754c1e99b7e1bc',
                pohlavi: 'žena',
                typ: 'maraton',
                vek: {
                  max: 49,
                  min: 40
                },
                zkratka: '1Ž'
              },
              {
                id: '5a09b1fd371dec1e99b7e1c9',
                pohlavi: 'žena',
                typ: 'maraton',
                vek: {
                  max: 59,
                  min: 50
                },
                zkratka: '2Ž'
              }
            ]
          },
          pěší: {
            id: '5a71b1fd371dec1e99b7e1bc',
            startovne: {
              naMiste: 25,
              predem: 25
            },
            typ: 'pěší',
            zkratka: 'P'
          },
          půlmaraton: {
            muž: [
              {
                id: '8799b1fd371dec1e99b7e1c9',
                pohlavi: 'muž',
                typ: 'půlmaraton',
                vek: {
                  max: 59,
                  min: 50
                },
                zkratka: '1M'
              }
            ],
            startCisla: '100-199',
            startovne: {
              naMiste: 250,
              predem: 200
            },
            žena: [
              {
                id: '1609b1fd3748746e99b7e1c9',
                pohlavi: 'žena',
                typ: 'půlmaraton',
                vek: {
                  max: 49,
                  min: 40
                },
                zkratka: '1Ž'
              },
              {
                id: '3279b1fd371dec1e99b7e1c9',
                pohlavi: 'žena',
                typ: 'půlmaraton',
                vek: {
                  max: 59,
                  min: 50
                },
                zkratka: '2Ž'
              }
            ]
          }
        },
        ubytovani: {
          pátek: { poplatek: 60 }
        }
      },
      2019: {
        id: '6a02c8fd371dec1e99b7e1bc',
        datum: '2019-06-08T00:00:00.000Z',
        uzaverka: {
          prihlasek: '2019-06-03T00:00:00.000Z',
          platebPrihlasek: '2019-06-05T00:00:00.000Z'
        },
        kategorie: {
          maraton: {
            startCisla: '5-95',
            startovne: {
              naMiste: 250,
              predem: 200
            },
            žena: [
              {
                id: '5a71b1fd45754c1e99b7e1bc',
                pohlavi: 'žena',
                typ: 'maraton',
                vek: {
                  max: 49,
                  min: 40
                },
                zkratka: '1Ž'
              },
              {
                id: '5a09b1fd371dec1e99b7e1c9',
                pohlavi: 'žena',
                typ: 'maraton',
                vek: {
                  max: 59,
                  min: 50
                },
                zkratka: '2Ž'
              }
            ]
          },
          pěší: {
            id: '5a71b1fd371dec1e99b7e1bc',
            startovne: {
              naMiste: 25,
              predem: 25
            },
            typ: 'pěší',
            zkratka: 'P'
          },
          půlmaraton: {
            muž: [
              {
                id: '8799b1fd371dec1e99b7e1c9',
                pohlavi: 'muž',
                typ: 'půlmaraton',
                vek: {
                  max: 59,
                  min: 50
                },
                zkratka: '1M'
              }
            ],
            startCisla: '100-199',
            startovne: {
              naMiste: 250,
              predem: 200
            },
            žena: [
              {
                id: '1609b1fd3748746e99b7e1c9',
                pohlavi: 'žena',
                typ: 'půlmaraton',
                vek: {
                  max: 49,
                  min: 40
                },
                zkratka: '1Ž'
              },
              {
                id: '3279b1fd371dec1e99b7e1c9',
                pohlavi: 'žena',
                typ: 'půlmaraton',
                vek: {
                  max: 59,
                  min: 50
                },
                zkratka: '2Ž'
              }
            ]
          }
        },
        ubytovani: {
          pátek: { poplatek: 50 }
        }
      }
    }
  },
  requestId: '0.9310306652587377'
};

const unsuccessfulResponse = {
  code: 'unfulfilled request',
  status: 'A strange error occurred.'
};

const middlewares = [wsAPI.withExtraArgument(mockWsClient)];
const mockStore = configureStore(middlewares);

it('fetchRocniky() should not dispatch anything if rocniky cached', async () => {
  const store = mockStore({ entities: { rocniky: { roky: [2011] } } });
  await store.dispatch(fetchRocniky());
  expect(store.getActions()).toHaveLength(0);
});

it('fetchRocniky() should dispatch two successful actions if rocniky not cached', async () => {
  mockWsClient.sendRequest = async () => successfulResponse;
  const store = mockStore({ auth: { token: '===token===' }, entities: { rocniky: {} } });

  await store.dispatch(fetchRocniky());
  const actions = store.getActions();
  expect(actions[0]).toEqual({ type: `${FETCH_ROCNIKY}_REQUEST`, receivedAt: expect.any(Number) });
  expect(actions[1]).toEqual({
    type: `${FETCH_ROCNIKY}_SUCCESS`,
    getDatumKonani: expect.any(Function),
    response: {
      code: 'ok',
      kategorie: successfulResponse.response.kategorie,
      rocniky: { byRoky: successfulResponse.response.rocniky, roky: [2017, 2018, 2019] }
    },
    title: 'načítání ročníků',
    receivedAt: expect.any(Number)
  });

  expect(actions[1].getDatumKonani()).toEqual(new Date(AKTUALNI_DATUM_KONANI).toJSON());
});

it('fetchRocniky() should dispatch one unsuccessful action if rocniky not cached', async () => {
  mockWsClient.sendRequest = async () => unsuccessfulResponse;
  const store = mockStore({ auth: { token: '===token===' }, entities: {} });

  await store.dispatch(fetchRocniky());
  const actions = store.getActions();
  expect(actions[0]).toEqual({ type: `${FETCH_ROCNIKY}_REQUEST`, receivedAt: expect.any(Number) });
  expect(actions[1]).toEqual({
    type: `${FETCH_ROCNIKY}_ERROR`,
    response: {
      code: 'unfulfilled request',
      status: 'A strange error occurred.'
    },
    title: 'načítání ročníků',
    receivedAt: expect.any(Number)
  });
});

it('fetchRocniky() should dispatch one unsuccessful action on error', async () => {
  mockWsClient.sendRequest = async () => Promise.reject(new Error('Parse error!'));
  const store = mockStore({ auth: { token: '===token===' }, entities: {} });

  await store.dispatch(fetchRocniky());
  const actions = store.getActions();
  expect(actions[0]).toEqual({ type: `${FETCH_ROCNIKY}_REQUEST`, receivedAt: expect.any(Number) });
  expect(actions[1]).toEqual({
    type: `${FETCH_ROCNIKY}_ERROR`,
    error: 'Error: Parse error!',
    response: {
      code: 'internal error'
    },
    title: 'načítání ročníků',
    receivedAt: expect.any(Number)
  });
});
