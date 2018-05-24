import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import WsClient from '../../WsClient';
import ucastniciTestData from '../../entities/ucastnici/ucastniciTestData';
import { createVykon, deleteVykon } from './StartujiciActions';

const successfulResponse = {
  code: 'ok',
  response: {
    id: '===id==='
  },
  requestId: '0.9310306652587377'
};

const unsuccessfulResponse = {
  code: 'unfulfilled request',
  status: 'A strange error occurred.'
};

const mockWsClient = new WsClient();
mockWsClient.sendRequest = async () => successfulResponse;

const middlewares = [thunk.withExtraArgument(mockWsClient)];
const mockStore = configureStore(middlewares);

it('createVykon() should dispatch two successful actions', async () => {
  const store = mockStore({ ...ucastniciTestData, auth: { token: '===token===' } });

  await store.dispatch(createVykon({ id: '8344bc71dec1e99b7e1d01e' }));

  const actions = store.getActions();
  expect(actions[0]).toEqual(
    expect.objectContaining({
      id: '8344bc71dec1e99b7e1d01e',
      rok: 2018,
      type: 'STARTUJICI_CREATE_VYKON_REQUEST'
    })
  );
  expect(actions[1]).toEqual(
    expect.objectContaining({
      id: '8344bc71dec1e99b7e1d01e',
      rok: 2018,
      type: 'STARTUJICI_CREATE_VYKON_SUCCESS',
      vykon: {
        dokonceno: null,
        kategorie: '5a587e1b051c181132cf83d9',
        startCislo: 15
      }
    })
  );
});

it('deleteVykon() should dispatch two successful actions', async () => {
  const store = mockStore({ ...ucastniciTestData, auth: { token: '===token===' } });

  await store.dispatch(deleteVykon({ id: '5a09b1fd371dec1e99b7e1c9' }));

  const actions = store.getActions();
  expect(actions[0]).toEqual(
    expect.objectContaining({
      id: '5a09b1fd371dec1e99b7e1c9',
      rok: 2018,
      type: 'STARTUJICI_DELETE_VYKON_REQUEST'
    })
  );
  expect(actions[1]).toEqual(
    expect.objectContaining({
      id: '5a09b1fd371dec1e99b7e1c9',
      rok: 2018,
      type: 'STARTUJICI_DELETE_VYKON_SUCCESS'
    })
  );
});

/* Beware: overrides mockWsClient.sendRequest! */
it('createVykon() should dispatch two unsuccessful actions', async () => {
  mockWsClient.sendRequest = async () => unsuccessfulResponse;
  const store = mockStore({ ...ucastniciTestData, auth: { token: '===token===' } });

  await store.dispatch(createVykon({ id: '8344bc71dec1e99b7e1d01e' }));
  const actions = store.getActions();
  expect(actions[0]).toEqual(
    expect.objectContaining({
      id: '8344bc71dec1e99b7e1d01e',
      rok: 2018,
      type: 'STARTUJICI_CREATE_VYKON_REQUEST'
    })
  );
  expect(actions[1]).toEqual(
    expect.objectContaining({
      type: 'STARTUJICI_CREATE_VYKON_ERROR',
      code: 'unfulfilled request',
      status: 'A strange error occurred.'
    })
  );
});

/* Beware: overrides mockWsClient.sendRequest! */
it('createVykon() should dispatch two unsuccessful actions on error', async () => {
  mockWsClient.sendRequest = async () => Promise.reject(new Error('Parse error!'));
  const store = mockStore({ ...ucastniciTestData, auth: { token: '===token===' } });

  await store.dispatch(createVykon({ id: '5a09b1fd371dec1e99b7e1c9' }));
  const actions = store.getActions();
  expect(actions[0]).toEqual(
    expect.objectContaining({
      id: '5a09b1fd371dec1e99b7e1c9',
      rok: 2018,
      type: 'STARTUJICI_CREATE_VYKON_REQUEST'
    })
  );
  expect(actions[1]).toEqual(
    expect.objectContaining({
      type: 'STARTUJICI_CREATE_VYKON_ERROR',
      code: 'internal error',
      err: 'Error: Parse error!'
    })
  );
});

/* Beware: overrides mockWsClient.sendRequest! */
it('createVykon() should use auth token if available', async () => {
  const tokenSent = { tokenSent: false };
  mockWsClient.sendRequest = async token => {
    if (token) {
      tokenSent.tokenSent = true;
    }
  };
  const store = mockStore({ ...ucastniciTestData, auth: { token: '===token===' } });

  await store.dispatch(createVykon({ id: '8344bc71dec1e99b7e1d01e' }));
  expect(tokenSent.tokenSent).toBe(true);
});

/* Beware: overrides mockWsClient.sendRequest! */
it('deleteVykon() should dispatch two unsuccessful actions', async () => {
  mockWsClient.sendRequest = async () => unsuccessfulResponse;
  const store = mockStore({ ...ucastniciTestData, auth: { token: '===token===' } });

  await store.dispatch(deleteVykon({ id: '5a09b1fd371dec1e99b7e1c9' }));
  const actions = store.getActions();
  expect(actions[0]).toEqual(
    expect.objectContaining({
      id: '5a09b1fd371dec1e99b7e1c9',
      rok: 2018,
      type: 'STARTUJICI_DELETE_VYKON_REQUEST'
    })
  );
  expect(actions[1]).toEqual(
    expect.objectContaining({
      type: 'STARTUJICI_DELETE_VYKON_ERROR',
      code: 'unfulfilled request',
      status: 'A strange error occurred.'
    })
  );
});

/* Beware: overrides mockWsClient.sendRequest! */
it('deleteVykon() should dispatch two unsuccessful actions on error', async () => {
  mockWsClient.sendRequest = async () => Promise.reject(new Error('Parse error!'));
  const store = mockStore({ ...ucastniciTestData, auth: { token: '===token===' } });

  await store.dispatch(deleteVykon({ id: '5a09b1fd371dec1e99b7e1c9' }));
  const actions = store.getActions();
  expect(actions[0]).toEqual(
    expect.objectContaining({
      id: '5a09b1fd371dec1e99b7e1c9',
      rok: 2018,
      type: 'STARTUJICI_DELETE_VYKON_REQUEST'
    })
  );
  expect(actions[1]).toEqual(
    expect.objectContaining({
      type: 'STARTUJICI_DELETE_VYKON_ERROR',
      code: 'internal error',
      err: 'Error: Parse error!'
    })
  );
});

/* Beware: overrides mockWsClient.sendRequest! */
it('deleteVykon() should use auth token if available', async () => {
  const tokenSent = { tokenSent: false };
  mockWsClient.sendRequest = async token => {
    if (token) {
      tokenSent.tokenSent = true;
    }
  };
  const store = mockStore({ ...ucastniciTestData, auth: { token: '===token===' } });

  await store.dispatch(deleteVykon({ id: '5a09b1fd371dec1e99b7e1c9' }));
  expect(tokenSent.tokenSent).toBe(true);
});
