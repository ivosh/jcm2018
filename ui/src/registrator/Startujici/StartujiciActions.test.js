import configureStore from 'redux-mock-store';
import WsClient from '../../WsClient';
import wsAPI from '../../store/wsAPI';
import ucastniciTestData from '../../entities/ucastnici/ucastniciTestData';
import {
  STARTUJICI_CREATE_VYKON,
  STARTUJICI_DELETE_VYKON,
  createVykon,
  deleteVykon
} from './StartujiciActions';

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

const middlewares = [wsAPI.withExtraArgument(mockWsClient)];
const mockStore = configureStore(middlewares);

it('createVykon() should dispatch two successful actions', async () => {
  const store = mockStore({ ...ucastniciTestData, auth: { token: '===token===' } });

  await store.dispatch(createVykon({ id: '8344bc71dec1e99b7e1d01e' }));
  const request = { id: '8344bc71dec1e99b7e1d01e', rok: 2018, vykon: expect.any(Object) };

  const actions = store.getActions();
  expect(actions[0]).toEqual({
    type: `${STARTUJICI_CREATE_VYKON}_REQUEST`,
    request,
    receivedAt: expect.any(Number)
  });
  expect(actions[1]).toEqual({
    type: `${STARTUJICI_CREATE_VYKON}_SUCCESS`,
    request,
    response: { code: 'ok', requestId: expect.any(String), response: { id: '===id===' } },
    title: 'vytváření registrace na start',
    receivedAt: expect.any(Number)
  });
});

it('deleteVykon() should dispatch two successful actions', async () => {
  const store = mockStore({ ...ucastniciTestData, auth: { token: '===token===' } });

  await store.dispatch(deleteVykon({ id: '5a09b1fd371dec1e99b7e1c9' }));
  const request = { id: '5a09b1fd371dec1e99b7e1c9', rok: 2018 };

  const actions = store.getActions();
  expect(actions[0]).toEqual({
    type: `${STARTUJICI_DELETE_VYKON}_REQUEST`,
    request,
    receivedAt: expect.any(Number)
  });
  expect(actions[1]).toEqual({
    type: `${STARTUJICI_DELETE_VYKON}_SUCCESS`,
    request,
    response: { code: 'ok', requestId: expect.any(String), response: { id: '===id===' } },
    title: 'rušení registrace na start',
    receivedAt: expect.any(Number)
  });
});

/* Beware: overrides mockWsClient.sendRequest! */
it('createVykon() should dispatch two unsuccessful actions', async () => {
  mockWsClient.sendRequest = async () => unsuccessfulResponse;
  const store = mockStore({ ...ucastniciTestData, auth: { token: '===token===' } });

  await store.dispatch(createVykon({ id: '8344bc71dec1e99b7e1d01e' }));
  const request = { id: '8344bc71dec1e99b7e1d01e', rok: 2018, vykon: expect.any(Object) };

  const actions = store.getActions();
  expect(actions[0]).toEqual({
    type: `${STARTUJICI_CREATE_VYKON}_REQUEST`,
    request,
    receivedAt: expect.any(Number)
  });
  expect(actions[1]).toEqual({
    type: `${STARTUJICI_CREATE_VYKON}_ERROR`,
    request,
    response: {
      code: 'unfulfilled request',
      status: 'A strange error occurred.'
    },
    title: 'vytváření registrace na start',
    receivedAt: expect.any(Number)
  });
});

/* Beware: overrides mockWsClient.sendRequest! */
it('deleteVykon() should dispatch two unsuccessful actions', async () => {
  mockWsClient.sendRequest = async () => unsuccessfulResponse;
  const store = mockStore({ ...ucastniciTestData, auth: { token: '===token===' } });

  await store.dispatch(deleteVykon({ id: '8344bc71dec1e99b7e1d01e' }));
  const request = { id: '8344bc71dec1e99b7e1d01e', rok: 2018 };

  const actions = store.getActions();
  expect(actions[0]).toEqual({
    type: `${STARTUJICI_DELETE_VYKON}_REQUEST`,
    request,
    receivedAt: expect.any(Number)
  });
  expect(actions[1]).toEqual({
    type: `${STARTUJICI_DELETE_VYKON}_ERROR`,
    request,
    response: {
      code: 'unfulfilled request',
      status: 'A strange error occurred.'
    },
    title: 'rušení registrace na start',
    receivedAt: expect.any(Number)
  });
});
