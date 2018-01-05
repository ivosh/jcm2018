import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import jwt from 'jsonwebtoken';
import WsClient from '../../WsClient';
import { signIn } from './SignInActions';

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
  response: {
    token: generateToken({ username: 'tomáš', nonce: '56565656565656565656' }),
    username: 'tomáš'
  },
  requestId: '0.9310306652587374'
};

const mismatchedNonceResponse = {
  code: 'ok',
  response: {
    token: generateToken({ username: 'tomáš', nonce: 'abc5656' }),
    username: 'tomáš'
  },
  requestId: '0.9310306652587374'
};

const unsuccessfulResponse = {
  code: 'password incorrect',
  status: 'Špatné jméno či heslo. Uživatel může být též zamčený.',
  requestId: '0.9310306652587374'
};

const middlewares = [thunk.withExtraArgument(mockWsClient)];
const mockStore = configureStore(middlewares);

it('signIn() should dispatch two successful actions', async () => {
  mockWsClient.sendRequest = async () => successfulResponse;
  const store = mockStore();

  await store.dispatch(signIn('tomáš', 'vrba798'));
  const actions = store.getActions();
  expect(actions[0]).toEqual({ type: 'SIGN_IN_REQUEST' });
  expect(actions[1]).toEqual(
    expect.objectContaining({
      data: {
        token: {
          exp: 2208988800,
          iat: expect.any(Number),
          nonce: '56565656565656565656',
          username: 'tomáš'
        },
        username: 'tomáš'
      },
      type: 'SIGN_IN_SUCCESS'
    })
  );
});

it('signIn() should dispatch two unsuccessful actions', async () => {
  mockWsClient.sendRequest = async () => unsuccessfulResponse;
  const store = mockStore();

  await store.dispatch(signIn('', ''));
  const actions = store.getActions();
  expect(actions[0]).toEqual({ type: 'SIGN_IN_REQUEST' });
  expect(actions[1]).toEqual(
    expect.objectContaining({
      type: 'SIGN_IN_ERROR',
      code: 'password incorrect',
      status: 'Špatné jméno či heslo. Uživatel může být též zamčený.'
    })
  );
});

it('signIn() should dispatch two unsuccessful actions on error', async () => {
  mockWsClient.sendRequest = async () => Promise.reject(new Error('Parse error!'));
  const store = mockStore();

  await store.dispatch(signIn('', ''));
  const actions = store.getActions();
  expect(actions[0]).toEqual({ type: 'SIGN_IN_REQUEST' });
  expect(actions[1]).toEqual(
    expect.objectContaining({
      type: 'SIGN_IN_ERROR',
      code: 'internal error',
      err: new Error('Parse error!')
    })
  );
});

it('signIn() should dispatch two unsuccessful actions [nonce mismatch]', async () => {
  mockWsClient.sendRequest = async () => mismatchedNonceResponse;
  const store = mockStore();

  await store.dispatch(signIn('', ''));
  const actions = store.getActions();
  expect(actions[0]).toEqual({ type: 'SIGN_IN_REQUEST' });
  expect(actions[1]).toEqual(
    expect.objectContaining({
      type: 'SIGN_IN_ERROR',
      code: 'nesouhlas jednorázového přihlašovacího kódu',
      status:
        'Jednorázový přihlašovací kód vygenerovaný prohlížečem nesouhlasí s kódem, který poslal server.',
      client: '56565656565656565656',
      server: 'abc5656'
    })
  );
});
