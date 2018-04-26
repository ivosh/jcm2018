import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import WsClient from '../../WsClient';
import { fetchStopky } from './stopkyActions';

const mockWsClient = new WsClient();
mockWsClient.sendRequest = null;

const successfulResponse = {
  code: 'ok',
  response: {
    cyklo: {
      base: '2017-12-01T07:30:00.000Z',
      delta: 'P0D',
      running: true,
      typ: 'cyklo'
    },
    koloběžka: {
      base: null,
      delta: 'PT4H0M0.32S',
      running: false,
      typ: 'koloběžka'
    },
    maraton: {
      base: null,
      delta: 'P0D',
      running: false,
      typ: 'maraton'
    },
    půlmaraton: {
      base: null,
      delta: 'PT1H23M07.34S',
      running: false,
      typ: 'půlmaraton'
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

const middlewares = [thunk.withExtraArgument(mockWsClient)];
const mockStore = configureStore(middlewares);

it('fetchStopky() should not dispatch anything if stopky cached', async () => {
  const store = mockStore({
    entities: { stopky: { byTypy: { cyklo: {} }, typy: ['cyklo'] }, invalidated: false }
  });
  await store.dispatch(fetchStopky());
  expect(store.getActions()).toHaveLength(0);
});

it('fetchStopky() should dispatch two successful actions [not cached]', async () => {
  mockWsClient.sendRequest = async () => successfulResponse;
  const store = mockStore({ entities: { stopky: {} } });

  await store.dispatch(fetchStopky());
  const actions = store.getActions();
  expect(actions[0]).toEqual({ type: 'FETCH_STOPKY_REQUEST' });
  expect(actions[1]).toEqual(
    expect.objectContaining({
      data: {
        byTypy: successfulResponse.response,
        typy: ['cyklo', 'koloběžka', 'maraton', 'půlmaraton']
      },
      type: 'FETCH_STOPKY_SUCCESS'
    })
  );
});

it('fetchStopky() should use auth token if available', async () => {
  const tokenSent = { tokenSent: false };
  mockWsClient.sendRequest = async token => {
    if (token) {
      tokenSent.tokenSent = true;
    }
  };
  const store = mockStore({ auth: { token: '===token===' }, entities: {} });

  await store.dispatch(fetchStopky());
  expect(tokenSent.tokenSent).toBe(true);
});

it('fetchStopky() should dispatch two unsuccessful actions', async () => {
  mockWsClient.sendRequest = async () => unsuccessfulResponse;
  const store = mockStore({ entities: {} });

  await store.dispatch(fetchStopky());
  const actions = store.getActions();
  expect(actions[0]).toEqual({ type: 'FETCH_STOPKY_REQUEST' });
  expect(actions[1]).toEqual(
    expect.objectContaining({
      type: 'FETCH_STOPKY_ERROR',
      code: 'unfulfilled request',
      status: 'A strange error occurred.'
    })
  );
});

it('fetchStopky() should dispatch two unsuccessful actions on error', async () => {
  mockWsClient.sendRequest = async () => Promise.reject(new Error('Parse error!'));
  const store = mockStore({ entities: {} });

  await store.dispatch(fetchStopky());
  const actions = store.getActions();
  expect(actions[0]).toEqual({ type: 'FETCH_STOPKY_REQUEST' });
  expect(actions[1]).toEqual(
    expect.objectContaining({
      type: 'FETCH_STOPKY_ERROR',
      code: 'internal error',
      err: new Error('Parse error!')
    })
  );
});

it('fetchStopky() should dispatch two unsuccessful actions on invalid token', async () => {
  mockWsClient.sendRequest = async () => authTokenInvalidResponse;
  const store = mockStore({ entities: {} });

  await store.dispatch(fetchStopky());
  const actions = store.getActions();
  expect(actions[0]).toEqual({ type: 'FETCH_STOPKY_REQUEST' });
  expect(actions[1]).toEqual(
    expect.objectContaining({
      type: 'SIGN_IN_ERROR',
      code: 'authentication token invalid',
      status: 'Platnost ověřovacího tokenu pravděpodobně vypršela. Neplatný ověřovací token.'
    })
  );
});
