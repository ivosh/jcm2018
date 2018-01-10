import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import jwt from 'jsonwebtoken';
import WsClient from '../../WsClient';
import { signOut } from './SignOutActions';

const mockWsClient = new WsClient();
mockWsClient.sendRequest = null;

global.crypto = { getRandomValues: arr => arr.fill(86) };

/* Taken from server/api/User/signIn.js. expireTime is 1. 1. 2040 (seconds since Epoch). */
const generateToken = ({ username, nonce, exp = 2208988800, secret = 'jwt_secret' }) => {
  const payload = { username, nonce, exp };
  return jwt.sign(payload, secret);
};

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
    token: generateToken({ username: 'tomáš', nonce: '56565656565656565656' })
  }
};

const middlewares = [thunk.withExtraArgument(mockWsClient)];
const mockStore = configureStore(middlewares);

it('signOut() should dispatch two successful actions', async () => {
  mockWsClient.sendRequest = async () => successfulResponse;
  const store = mockStore(initialState);

  await store.dispatch(signOut());
  const actions = store.getActions();
  expect(actions[0]).toEqual({ type: 'SIGN_OUT_REQUEST' });
  expect(actions[1]).toEqual(
    expect.objectContaining({
      type: 'SIGN_OUT_SUCCESS'
    })
  );
});

it('signOut() should dispatch two unsuccessful actions', async () => {
  mockWsClient.sendRequest = async () => unsuccessfulResponse;
  const store = mockStore(initialState);

  await store.dispatch(signOut());
  const actions = store.getActions();
  expect(actions[0]).toEqual({ type: 'SIGN_OUT_REQUEST' });
  expect(actions[1]).toEqual(
    expect.objectContaining({
      type: 'SIGN_OUT_ERROR',
      code: 'authentication token invalid',
      status: 'Špatný ověřovací token. Nicméně odhlášení proběhlo.'
    })
  );
});

it('signOut() should dispatch two unsuccessful actions on error', async () => {
  mockWsClient.sendRequest = async () => Promise.reject(new Error('Parse error!'));
  const store = mockStore(initialState);

  await store.dispatch(signOut());
  const actions = store.getActions();
  expect(actions[0]).toEqual({ type: 'SIGN_OUT_REQUEST' });
  expect(actions[1]).toEqual(
    expect.objectContaining({
      type: 'SIGN_OUT_ERROR',
      code: 'internal error',
      err: new Error('Parse error!')
    })
  );
});

it('signOut() should dispatch no actions if not authenticated', async () => {
  mockWsClient.sendRequest = async () => successfulResponse;
  const store = mockStore({ auth: { authenticated: false } });

  await store.dispatch(signOut());
  const actions = store.getActions();
  expect(actions).toHaveLength(0);
});
