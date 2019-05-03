import configureStore from 'redux-mock-store';
import { CODE_OK } from 'ui-common/common';
import WsClient from 'ui-common/WsClient';
import { generateTestToken } from '../../testing';
import wsAPI from '../../store/wsAPI';
import { SIGN_OUT, signOut } from './SignOutActions';

const mockWsClient = new WsClient();
mockWsClient.sendRequest = null;

const successfulResponse = {
  code: 'ok',
  requestId: '0.9310306652587371'
};

const unsuccessfulResponse = {
  code: 'authentication token invalid',
  status: 'Špatný ověřovací token. Nicméně odhlášení proběhlo.',
  requestId: '0.9310306652587371'
};

const initialState = {
  auth: {
    authenticated: true,
    token: generateTestToken({ username: 'tomáš', nonce: '56565656565656565656' })
  }
};

const middlewares = [wsAPI.withExtraArgument(mockWsClient)];
const mockStore = configureStore(middlewares);

it('signOut() should dispatch two successful actions', async () => {
  mockWsClient.sendRequest = async () => successfulResponse;
  const store = mockStore(initialState);

  await store.dispatch(signOut());
  const actions = store.getActions();
  expect(actions[0]).toEqual({ type: `${SIGN_OUT}_REQUEST`, receivedAt: expect.any(Number) });
  expect(actions[1]).toEqual({
    type: `${SIGN_OUT}_SUCCESS`,
    response: {
      code: CODE_OK,
      requestId: expect.any(String)
    },
    title: 'odhlašování',
    receivedAt: expect.any(Number)
  });
});

it('signOut() should dispatch two unsuccessful actions', async () => {
  mockWsClient.sendRequest = async () => unsuccessfulResponse;
  const store = mockStore(initialState);

  await store.dispatch(signOut());
  const actions = store.getActions();
  expect(actions[0]).toEqual({ type: `${SIGN_OUT}_REQUEST`, receivedAt: expect.any(Number) });
  expect(actions[1]).toEqual({
    type: `${SIGN_OUT}_ERROR`,
    response: {
      code: 'authentication token invalid',
      requestId: expect.any(String),
      status:
        'Platnost ověřovacího tokenu pravděpodobně vypršela. Špatný ověřovací token. Nicméně odhlášení proběhlo.'
    },
    title: 'odhlašování',
    receivedAt: expect.any(Number)
  });
});

it('signOut() should dispatch two unsuccessful actions on error', async () => {
  mockWsClient.sendRequest = async () => Promise.reject(new Error('Parse error!'));
  const store = mockStore(initialState);

  await store.dispatch(signOut());
  const actions = store.getActions();
  expect(actions[0]).toEqual({ type: `${SIGN_OUT}_REQUEST`, receivedAt: expect.any(Number) });
  expect(actions[1]).toEqual({
    type: `${SIGN_OUT}_ERROR`,
    error: 'Error: Parse error!',
    response: {
      code: 'internal error'
    },
    title: 'odhlašování',
    receivedAt: expect.any(Number)
  });
});

it('signOut() should dispatch no actions if not authenticated', async () => {
  mockWsClient.sendRequest = async () => successfulResponse;
  const store = mockStore({ auth: { authenticated: false } });

  await store.dispatch(signOut());
  const actions = store.getActions();
  expect(actions).toHaveLength(0);
});
