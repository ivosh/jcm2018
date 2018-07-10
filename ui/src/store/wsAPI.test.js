import configureStore from 'redux-mock-store';
import WsClient from '../WsClient';
import wsAPI, { WS_API } from '../store/wsAPI';

const mockWsClient = new WsClient();
mockWsClient.sendRequest = null;

const successfulResponse = {
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

const unsuccessfulResponse = {
  code: 'unfulfilled request',
  status: 'A strange error occurred.'
};

const authTokenInvalidResponse = {
  code: 'authentication token invalid',
  status: 'Neplatný ověřovací token.'
};

const middlewares = [wsAPI.withExtraArgument(mockWsClient)];
const mockStore = configureStore(middlewares);

const normalize = json => {
  const byIds = json.response;
  const allIds = Object.keys(byIds);

  return { allIds, byIds };
};

const endpoint = 'FETCH_API';
const request = { key: '===key1===', value: '===value2===' };
const state = { auth: { token: '===token===' } };

it('successful wsAPI action should dispatch REQUEST/SUCCESS redux actions', async () => {
  mockWsClient.sendRequest = async () => successfulResponse;
  const store = mockStore(state);
  await store.dispatch({ [WS_API]: { type: 'FETCH_ACTION', endpoint, normalize, request } });

  const actions = store.getActions();
  expect(actions[0]).toEqual({
    type: 'FETCH_ACTION_REQUEST',
    request,
    receivedAt: expect.any(Number)
  });
  expect(actions[1]).toEqual({
    type: 'FETCH_ACTION_SUCCESS',
    request,
    response: {
      allIds: ['6f09b1fd371dec1e99b7e1c9', '5a09b1fd371dec1e99b7e1c9'],
      byIds: successfulResponse.response,
      code: 'ok'
    },
    receivedAt: expect.any(Number)
  });
});

it('unsuccessful wsAPI action should dispatch REQUEST/ERROR actions', async () => {
  mockWsClient.sendRequest = async () => unsuccessfulResponse;
  const store = mockStore(state);
  await store.dispatch({ [WS_API]: { type: 'FETCH_ACTION', endpoint, normalize, request } });

  const actions = store.getActions();
  expect(actions[0]).toEqual({
    type: 'FETCH_ACTION_REQUEST',
    request,
    receivedAt: expect.any(Number)
  });
  expect(actions[1]).toEqual({
    type: 'FETCH_ACTION_ERROR',
    request,
    response: {
      code: 'unfulfilled request',
      status: 'A strange error occurred.'
    },
    receivedAt: expect.any(Number)
  });
});

it('error wsAPI action should dispatch REQUEST/ERROR actions', async () => {
  mockWsClient.sendRequest = async () => Promise.reject(new Error('Parse error!'));
  const store = mockStore(state);
  await store.dispatch({ [WS_API]: { type: 'FETCH_ACTION', endpoint, request } });

  const actions = store.getActions();
  expect(actions[0]).toEqual({
    type: 'FETCH_ACTION_REQUEST',
    request,
    receivedAt: expect.any(Number)
  });
  expect(actions[1]).toEqual({
    type: 'FETCH_ACTION_ERROR',
    error: 'Error: Parse error!',
    request,
    response: { code: 'internal error' },
    receivedAt: expect.any(Number)
  });
});

it('expired authentication token for wsAPI action should dispatch REQUEST/ERROR actions', async () => {
  mockWsClient.sendRequest = async () => authTokenInvalidResponse;
  const store = mockStore(state);
  await store.dispatch({ [WS_API]: { type: 'FETCH_ACTION', endpoint, request } });

  const actions = store.getActions();
  expect(actions[0]).toEqual({
    type: 'FETCH_ACTION_REQUEST',
    request,
    receivedAt: expect.any(Number)
  });
  expect(actions[1]).toEqual({
    type: 'FETCH_ACTION_ERROR',
    request,
    response: {
      code: 'authentication token invalid',
      status: 'Platnost ověřovacího tokenu pravděpodobně vypršela. Neplatný ověřovací token.'
    },
    receivedAt: expect.any(Number)
  });
});
