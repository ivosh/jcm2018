import configureStore from 'redux-mock-store';
import WsClient from 'ui-common/WsClient';
import wsAPI from 'ui-common/store/wsAPI';
import { generateTestToken } from '../../testing';
import { SIGN_IN, signIn } from './SignInActions';

const mockWsClient = new WsClient();
mockWsClient.sendRequest = null;

const successfulResponse = {
  code: 'ok',
  response: {
    token: generateTestToken({ username: 'tomáš', nonce: '56565656565656565656' }),
    username: 'tomáš'
  },
  requestId: '0.9310306652587374'
};

const mismatchedNonceResponse = {
  code: 'ok',
  response: {
    token: generateTestToken({ username: 'tomáš', nonce: 'abc5656' }),
    username: 'tomáš'
  },
  requestId: '0.9310306652587374'
};

const unsuccessfulResponse = {
  code: 'password incorrect',
  status: 'Špatné jméno či heslo. Uživatel může být též zamčený.',
  requestId: '0.9310306652587374'
};

const middlewares = [wsAPI.withExtraArgument(mockWsClient)];
const mockStore = configureStore(middlewares);
const state = { entities: {} };

it('signIn() should dispatch two successful actions', async () => {
  const request = { username: 'tomáš', password: 'vrba798', nonce: '56565656565656565656' };
  mockWsClient.sendRequest = async () => successfulResponse;
  const store = mockStore(state);

  await store.dispatch(signIn({ username: 'tomáš', password: 'vrba798' }));
  const actions = store.getActions();
  expect(actions[0]).toEqual({
    type: `${SIGN_IN}_REQUEST`,
    request,
    receivedAt: expect.any(Number)
  });
  expect(actions[1]).toEqual({
    type: `${SIGN_IN}_SUCCESS`,
    request,
    response: {
      code: 'ok',
      decodedToken: {
        exp: 2208988800,
        iat: expect.any(Number),
        nonce: '56565656565656565656',
        username: 'tomáš'
      },
      token: expect.any(String),
      username: 'tomáš'
    },
    title: 'přihlašování',
    receivedAt: expect.any(Number)
  });
});

it('signIn() should dispatch two unsuccessful actions', async () => {
  const request = { username: '', password: '', nonce: '56565656565656565656' };
  mockWsClient.sendRequest = async () => unsuccessfulResponse;
  const store = mockStore(state);

  await store.dispatch(signIn({ username: '', password: '' }));
  const actions = store.getActions();
  expect(actions[0]).toEqual({
    type: `${SIGN_IN}_REQUEST`,
    request,
    receivedAt: expect.any(Number)
  });
  expect(actions[1]).toEqual({
    type: `${SIGN_IN}_ERROR`,
    request,
    response: {
      code: 'password incorrect',
      requestId: expect.any(String),
      status: 'Špatné jméno či heslo. Uživatel může být též zamčený.'
    },
    title: 'přihlašování',
    receivedAt: expect.any(Number)
  });
});

it('signIn() should dispatch two unsuccessful actions on error', async () => {
  const request = { username: '', password: '', nonce: '56565656565656565656' };
  mockWsClient.sendRequest = async () => Promise.reject(new Error('Parse error!'));
  const store = mockStore(state);

  await store.dispatch(signIn({ username: '', password: '' }));
  const actions = store.getActions();
  expect(actions[0]).toEqual({
    type: `${SIGN_IN}_REQUEST`,
    request,
    receivedAt: expect.any(Number)
  });
  expect(actions[1]).toEqual({
    type: `${SIGN_IN}_ERROR`,
    error: 'Error: Parse error!',
    request,
    response: {
      code: 'internal error'
    },
    title: 'přihlašování',
    receivedAt: expect.any(Number)
  });
});

it('signIn() should dispatch two unsuccessful actions [nonce mismatch]', async () => {
  const request = { username: 'tomáš', password: 'vrba798', nonce: '56565656565656565656' };
  mockWsClient.sendRequest = async () => mismatchedNonceResponse;
  const store = mockStore(state);

  await store.dispatch(signIn({ username: 'tomáš', password: 'vrba798' }));
  const actions = store.getActions();
  expect(actions[0]).toEqual({
    type: `${SIGN_IN}_REQUEST`,
    request,
    receivedAt: expect.any(Number)
  });
  expect(actions[1]).toEqual({
    type: `${SIGN_IN}_ERROR`,
    request,
    response: {
      client: '56565656565656565656',
      code: 'nesouhlas jednorázového přihlašovacího kódu',
      server: 'abc5656',
      status:
        'Jednorázový přihlašovací kód vygenerovaný prohlížečem nesouhlasí s kódem, který poslal server.',
      token: expect.any(String),
      username: 'tomáš'
    },
    title: 'přihlašování',
    receivedAt: expect.any(Number)
  });
});
