import deepFreeze from 'deep-freeze';
import { signInSuccess, signInError } from './SignIn/SignInActions';
import { signOutSuccess, signOutError } from './SignOut/SignOutActions';
import authReducer from './authReducer';

const successfulSignInResponse = {
  code: 'ok',
  response: {
    token: '=======token=========',
    username: 'tomáš'
  },
  requestId: '0.9310306652587374'
};

const unsuccessfulSignInResponse = {
  code: 'password incorrect',
  status: 'Špatné jméno či heslo. Uživatel může být též zamčený.',
  requestId: '0.9310306652587374'
};

const decodedToken = {
  username: 'tomáš',
  nonce: '4345ab771'
};

const unsuccessfulSignOutResponse = {
  code: 'authentication token invalid',
  status: 'Špatný ověřovací token. Zkus se přihlásit znovu.',
  requestId: '0.9310306652587371'
};

it('na začátku', () => {
  const stateBefore = undefined;

  const stateAfter = authReducer(stateBefore, {});
  expect(stateAfter.authenticated).toEqual(false);
  expect(stateAfter.token).toBe(null);
});

it('signInSuccess()', () => {
  const stateBefore = { authenticated: false, token: null, signIn: { signingIn: false } };
  const stateAfter = {
    ...stateBefore,
    authenticated: true,
    token: '=======token=========',
    decodedToken: {
      username: 'tomáš',
      nonce: '4345ab771'
    }
  };
  deepFreeze(stateBefore);

  expect(authReducer(stateBefore, signInSuccess(successfulSignInResponse, decodedToken))).toEqual(
    stateAfter
  );
});

it('signInError()', () => {
  const stateBefore = { authenticated: true, token: '==token==', signIn: { signingIn: false } };
  const stateAfter = {
    authenticated: false,
    decodedToken: null,
    token: null,
    signIn: { signingIn: false }
  };
  deepFreeze(stateBefore);

  expect(authReducer(stateBefore, signInError(unsuccessfulSignInResponse))).toEqual(stateAfter);
});

it('signOutSuccess()', () => {
  const stateBefore = {
    authenticated: true,
    token: '===token===',
    decodedToken: '===decoded===',
    signIn: { signingIn: false }
  };
  const stateAfter = {
    ...stateBefore,
    authenticated: false,
    token: null,
    decodedToken: null,
    signIn: { signingIn: false }
  };
  deepFreeze(stateBefore);

  expect(authReducer(stateBefore, signOutSuccess())).toEqual(stateAfter);
});

it('signOutError()', () => {
  const stateBefore = {
    authenticated: true,
    token: '===token===',
    decodedToken: '===decoded===',
    signIn: { signingIn: false }
  };
  const stateAfter = {
    authenticated: false,
    decodedToken: null,
    token: null,
    signIn: { signingIn: false }
  };
  deepFreeze(stateBefore);

  expect(authReducer(stateBefore, signOutError(unsuccessfulSignOutResponse))).toEqual(stateAfter);
});
