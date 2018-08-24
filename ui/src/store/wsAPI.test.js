import configureStore from 'redux-mock-store';
import { CODE_OK, CODE_NONCE_MISMATCH, CODE_TOKEN_INVALID } from '../common';
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

const decorate = json => ({
  getCode: () => json.code
});

const normalize = ({ response }) => {
  const byIds = response.response;
  const allIds = Object.keys(byIds);

  return { allIds, byIds };
};

const endpoint = 'FETCH_API';
const apiRequest = { key: '===key1===', value: '===value2===' };
const state = { auth: { token: '===token===' } };

it('successful wsAPI action should dispatch REQUEST/SUCCESS redux actions', async () => {
  mockWsClient.sendRequest = async () => successfulResponse;
  const store = mockStore(state);
  const { code } = await store.dispatch({
    [WS_API]: { type: 'FETCH_ACTION', decorate, endpoint, normalize, request: apiRequest }
  });
  expect(code).toEqual(CODE_OK);

  const actions = store.getActions();
  expect(actions[0]).toEqual({
    type: 'FETCH_ACTION_REQUEST',
    request: apiRequest,
    receivedAt: expect.any(Number)
  });
  expect(actions[1]).toEqual({
    type: 'FETCH_ACTION_SUCCESS',
    getCode: expect.any(Function),
    request: apiRequest,
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
  const { code } = await store.dispatch({
    [WS_API]: { type: 'FETCH_ACTION', decorate, endpoint, normalize, request: apiRequest }
  });
  expect(code).toEqual('unfulfilled request');

  const actions = store.getActions();
  expect(actions[0]).toEqual({
    type: 'FETCH_ACTION_REQUEST',
    request: apiRequest,
    receivedAt: expect.any(Number)
  });
  expect(actions[1]).toEqual({
    type: 'FETCH_ACTION_ERROR',
    request: apiRequest,
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
  const { code } = await store.dispatch({
    [WS_API]: { type: 'FETCH_ACTION', endpoint, request: apiRequest }
  });
  expect(code).toEqual('internal error');

  const actions = store.getActions();
  expect(actions[0]).toEqual({
    type: 'FETCH_ACTION_REQUEST',
    request: apiRequest,
    receivedAt: expect.any(Number)
  });
  expect(actions[1]).toEqual({
    type: 'FETCH_ACTION_ERROR',
    error: 'Error: Parse error!',
    request: apiRequest,
    response: { code: 'internal error' },
    receivedAt: expect.any(Number)
  });
});

it('expired authentication token for wsAPI action should dispatch REQUEST/ERROR actions', async () => {
  mockWsClient.sendRequest = async () => authTokenInvalidResponse;
  const store = mockStore(state);
  const { code } = await store.dispatch({
    [WS_API]: {
      type: 'FETCH_ACTION',
      endpoint,
      request: apiRequest,
      title: '...error, my darling!'
    }
  });
  expect(code).toEqual(CODE_TOKEN_INVALID);

  const actions = store.getActions();
  expect(actions[0]).toEqual({
    type: 'FETCH_ACTION_REQUEST',
    request: apiRequest,
    receivedAt: expect.any(Number)
  });
  expect(actions[1]).toEqual({
    type: 'FETCH_ACTION_ERROR',
    request: apiRequest,
    response: {
      code: 'authentication token invalid',
      status: 'Platnost ověřovacího tokenu pravděpodobně vypršela. Neplatný ověřovací token.'
    },
    title: '...error, my darling!',
    receivedAt: expect.any(Number)
  });
});

it('wsAPI should process array of three actions in sequence', async () => {
  mockWsClient.sendRequest = async () => successfulResponse;
  const store = mockStore(state);
  const { code } = await store.dispatch([
    { [WS_API]: { type: 'FETCH_ACTION_1', endpoint, normalize, request: apiRequest } },
    { [WS_API]: { type: 'FETCH_ACTION_2', endpoint, normalize, request: apiRequest } },
    { [WS_API]: { type: 'FETCH_ACTION_3', endpoint, normalize, request: apiRequest } }
  ]);
  expect(code).toEqual(CODE_OK);

  const actions = store.getActions();
  expect(actions[0]).toEqual({
    type: 'FETCH_ACTION_1_REQUEST',
    request: apiRequest,
    receivedAt: expect.any(Number)
  });
  expect(actions[1]).toEqual({
    type: 'FETCH_ACTION_1_SUCCESS',
    request: apiRequest,
    response: {
      allIds: ['6f09b1fd371dec1e99b7e1c9', '5a09b1fd371dec1e99b7e1c9'],
      byIds: successfulResponse.response,
      code: 'ok'
    },
    receivedAt: expect.any(Number)
  });
  expect(actions[2]).toEqual({
    type: 'FETCH_ACTION_2_REQUEST',
    request: apiRequest,
    receivedAt: expect.any(Number)
  });
  expect(actions[3]).toEqual({
    type: 'FETCH_ACTION_2_SUCCESS',
    request: apiRequest,
    response: {
      allIds: ['6f09b1fd371dec1e99b7e1c9', '5a09b1fd371dec1e99b7e1c9'],
      byIds: successfulResponse.response,
      code: 'ok'
    },
    receivedAt: expect.any(Number)
  });
  expect(actions[4]).toEqual({
    type: 'FETCH_ACTION_3_REQUEST',
    request: apiRequest,
    receivedAt: expect.any(Number)
  });
  expect(actions[5]).toEqual({
    type: 'FETCH_ACTION_3_SUCCESS',
    request: apiRequest,
    response: {
      allIds: ['6f09b1fd371dec1e99b7e1c9', '5a09b1fd371dec1e99b7e1c9'],
      byIds: successfulResponse.response,
      code: 'ok'
    },
    receivedAt: expect.any(Number)
  });
});

const signInRequest = { ...apiRequest, nonce: '===client===' };
const signInResponse = {
  code: 'ok',
  response: { token: '===token+nonce===', username: 'pavouk' },
  requestId: 'blablabla'
};
const normalizeSignInResponse = ({
  response: {
    check: { client, code, decodedToken, server, status },
    response: { token, username }
  }
}) => ({ client, code, decodedToken, server, status, token, username });

it('successful wsAPI action with checkResponse returning CODE_OK', async () => {
  mockWsClient.sendRequest = async () => signInResponse;
  const checkResponse = () => ({ code: CODE_OK, decodedToken: '===decoded-token===' });
  const store = mockStore(state);
  const { code } = await store.dispatch({
    [WS_API]: {
      type: 'FETCH_ACTION',
      checkResponse,
      endpoint,
      normalize: normalizeSignInResponse,
      request: signInRequest
    }
  });
  expect(code).toEqual(CODE_OK);

  const actions = store.getActions();
  expect(actions[0]).toEqual({
    type: 'FETCH_ACTION_REQUEST',
    request: signInRequest,
    receivedAt: expect.any(Number)
  });
  expect(actions[1]).toEqual({
    type: 'FETCH_ACTION_SUCCESS',
    request: signInRequest,
    response: {
      code: 'ok',
      decodedToken: '===decoded-token===',
      token: '===token+nonce===',
      username: 'pavouk'
    },
    receivedAt: expect.any(Number)
  });
});

it('successful wsAPI action with checkResponse returning CODE_NONCE_MISMATCH', async () => {
  mockWsClient.sendRequest = async () => signInResponse;
  const checkResponse = ({ request }) => ({
    code: CODE_NONCE_MISMATCH,
    status: 'Popisek chybky.',
    client: request.nonce,
    server: '===server==='
  });
  const store = mockStore(state);
  const { code } = await store.dispatch({
    [WS_API]: {
      type: 'FETCH_ACTION',
      checkResponse,
      endpoint,
      normalize: normalizeSignInResponse,
      request: signInRequest
    }
  });
  expect(code).toEqual(CODE_NONCE_MISMATCH);

  const actions = store.getActions();
  expect(actions[0]).toEqual({
    type: 'FETCH_ACTION_REQUEST',
    request: signInRequest,
    receivedAt: expect.any(Number)
  });
  expect(actions[1]).toEqual({
    type: 'FETCH_ACTION_ERROR',
    request: signInRequest,
    response: {
      code: 'nesouhlas jednorázového přihlašovacího kódu',
      client: '===client===',
      server: '===server===',
      status: 'Popisek chybky.',
      token: '===token+nonce===',
      username: 'pavouk'
    },
    receivedAt: expect.any(Number)
  });
});
