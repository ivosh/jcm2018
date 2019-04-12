import configureStore from 'redux-mock-store';
import WsClient from '../../WsClient';
import wsAPI from '../../store/wsAPI';
import { FETCH_STOPKY, fetchStopky } from './stopkyActions';

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

const middlewares = [wsAPI.withExtraArgument(mockWsClient)];
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
  const store = mockStore({ auth: { token: '===token===' }, entities: { stopky: {} } });

  await store.dispatch(fetchStopky());
  const actions = store.getActions();
  expect(actions[0]).toEqual({ type: `${FETCH_STOPKY}_REQUEST`, receivedAt: expect.any(Number) });
  expect(actions[1]).toEqual({
    type: `${FETCH_STOPKY}_SUCCESS`,
    response: {
      code: 'ok',
      byTypy: successfulResponse.response,
      typy: ['cyklo', 'koloběžka', 'maraton', 'půlmaraton']
    },
    title: 'načítání stopek',
    receivedAt: expect.any(Number)
  });
});

it('fetchStopky() should dispatch two unsuccessful actions', async () => {
  mockWsClient.sendRequest = async () => unsuccessfulResponse;
  const store = mockStore({ auth: { token: '===token===' }, entities: {} });

  await store.dispatch(fetchStopky());
  const actions = store.getActions();
  expect(actions[0]).toEqual({ type: `${FETCH_STOPKY}_REQUEST`, receivedAt: expect.any(Number) });
  expect(actions[1]).toEqual({
    type: `${FETCH_STOPKY}_ERROR`,
    response: {
      code: 'unfulfilled request',
      status: 'A strange error occurred.'
    },
    title: 'načítání stopek',
    receivedAt: expect.any(Number)
  });
});

it('fetchStopky() should dispatch two unsuccessful actions on error', async () => {
  mockWsClient.sendRequest = async () => Promise.reject(new Error('Parse error!'));
  const store = mockStore({ auth: { token: '===token===' }, entities: {} });

  await store.dispatch(fetchStopky());
  const actions = store.getActions();
  expect(actions[0]).toEqual({ type: `${FETCH_STOPKY}_REQUEST`, receivedAt: expect.any(Number) });
  expect(actions[1]).toEqual({
    type: `${FETCH_STOPKY}_ERROR`,
    error: 'Error: Parse error!',
    response: {
      code: 'internal error'
    },
    title: 'načítání stopek',
    receivedAt: expect.any(Number)
  });
});
