import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import WsClient from '../../WsClient';
import { fetchRocniky } from './rocnikyActions';

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
                }
              },
              {
                id: '5a09b1fd371dec1e99b7e1c9',
                pohlavi: 'žena',
                typ: 'maraton',
                vek: {
                  max: 59,
                  min: 50
                }
              }
            ]
          }
        },
        ubytovani: {
          pátek: 50,
          sobota: 60
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
                }
              },
              {
                id: '5a09b1fd371dec1e99b7e1c9',
                pohlavi: 'žena',
                typ: 'maraton',
                vek: {
                  max: 59,
                  min: 50
                }
              }
            ]
          },
          pěší: {
            id: '5a71b1fd371dec1e99b7e1bc',
            startovne: {
              naMiste: 25,
              predem: 25
            },
            typ: 'pěší'
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
                }
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
                }
              },
              {
                id: '3279b1fd371dec1e99b7e1c9',
                pohlavi: 'žena',
                typ: 'půlmaraton',
                vek: {
                  max: 59,
                  min: 50
                }
              }
            ]
          }
        },
        ubytovani: {
          pátek: 60
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

const middlewares = [thunk.withExtraArgument(mockWsClient)];
const mockStore = configureStore(middlewares);

it('fetchRocniky() should not dispatch anything if rocniky cached', async () => {
  const store = mockStore({ entities: { rocniky: { roky: [2011] } } });
  await store.dispatch(fetchRocniky());
  expect(store.getActions()).toHaveLength(0);
});

it('fetchRocniky() should dispatch three successful actions if rocniky not cached', async () => {
  mockWsClient.sendRequest = async () => successfulResponse;
  const store = mockStore({});

  await store.dispatch(fetchRocniky());
  const actions = store.getActions();
  expect(actions[0]).toEqual({ type: 'FETCH_ROCNIKY_REQUEST' });
  expect(actions[1]).toEqual(
    expect.objectContaining({
      data: successfulResponse.response.kategorie,
      type: 'FETCH_KATEGORIE_SUCCESS'
    })
  );
  expect(actions[2]).toEqual(
    expect.objectContaining({
      data: { byRoky: successfulResponse.response.rocniky, roky: [2017, 2018] },
      type: 'FETCH_ROCNIKY_SUCCESS'
    })
  );
});

it('fetchRocniky() should dispatch two unsuccessful actions if rocniky not cached', async () => {
  mockWsClient.sendRequest = async () => unsuccessfulResponse;
  const store = mockStore({});

  await store.dispatch(fetchRocniky());
  const actions = store.getActions();
  expect(actions[0]).toEqual({ type: 'FETCH_ROCNIKY_REQUEST' });
  expect(actions[1]).toEqual(
    expect.objectContaining({
      type: 'FETCH_KATEGORIE_ERROR',
      code: 'unfulfilled request',
      status: 'A strange error occurred.'
    })
  );
  expect(actions[2]).toEqual(
    expect.objectContaining({
      type: 'FETCH_ROCNIKY_ERROR',
      code: 'unfulfilled request',
      status: 'A strange error occurred.'
    })
  );
});

it('fetchRocniky() should dispatch two unsuccessful actions on error', async () => {
  mockWsClient.sendRequest = async () => Promise.reject(new Error('Parse error!'));
  const store = mockStore({});

  await store.dispatch(fetchRocniky());
  const actions = store.getActions();
  expect(actions[0]).toEqual({ type: 'FETCH_ROCNIKY_REQUEST' });
  expect(actions[1]).toEqual(
    expect.objectContaining({
      type: 'FETCH_KATEGORIE_ERROR',
      code: 'internal error',
      err: new Error('Parse error!')
    })
  );
  expect(actions[2]).toEqual(
    expect.objectContaining({
      type: 'FETCH_ROCNIKY_ERROR',
      code: 'internal error',
      err: new Error('Parse error!')
    })
  );
});
