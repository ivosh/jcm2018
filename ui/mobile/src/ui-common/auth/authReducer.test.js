import deepFreeze from 'deep-freeze';
import generateTestToken from '../generateTestToken';
import { createFailureFromAction, createSuccessFromAction } from '../store/wsAPI';
import { signIn } from './SignIn/SignInActions';
import { signOut } from './SignOut/SignOutActions';
import authReducer from './authReducer';

const successfulSignInResponse = {
  code: 'ok',
  response: {
    token: generateTestToken({ username: 'tomáš', nonce: 'abc5656' }),
    username: 'tomáš',
  },
  requestId: '0.9310306652587374',
};

const unsuccessfulSignInResponse = {
  code: 'password incorrect',
  status: 'Špatné jméno či heslo. Uživatel může být též zamčený.',
  requestId: '0.9310306652587374',
};

const unsuccessfulSignOutResponse = {
  code: 'authentication token invalid',
  status: 'Špatný ověřovací token. Zkus se přihlásit znovu.',
  requestId: '0.9310306652587371',
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
    token: expect.any(String),
    decodedToken: {
      username: 'tomáš',
      nonce: 'abc5656',
      exp: expect.any(Number),
      iat: expect.any(Number),
    },
  };
  deepFreeze(stateBefore);

  expect(
    authReducer(
      stateBefore,
      createSuccessFromAction({
        action: signIn({}),
        request: { username: 'tomáš', nonce: 'abc5656' },
        response: successfulSignInResponse,
      })
    )
  ).toEqual(stateAfter);
});

it('signInError()', () => {
  const stateBefore = { authenticated: true, token: '==token==', signIn: { signingIn: false } };
  const stateAfter = {
    authenticated: false,
    decodedToken: null,
    token: null,
    signIn: { signingIn: false },
  };
  deepFreeze(stateBefore);

  expect(
    authReducer(
      stateBefore,
      createFailureFromAction({ action: signIn({}), response: unsuccessfulSignInResponse })
    )
  ).toEqual(stateAfter);
});

it('signOutSuccess()', () => {
  const stateBefore = {
    authenticated: true,
    token: '===token===',
    decodedToken: '===decoded===',
    signIn: { signingIn: false },
  };
  const stateAfter = {
    ...stateBefore,
    authenticated: false,
    token: null,
    decodedToken: null,
    signIn: { signingIn: false },
  };
  deepFreeze(stateBefore);

  expect(authReducer(stateBefore, createSuccessFromAction({ action: signOut() }))).toEqual(
    stateAfter
  );
});

it('signOutError()', () => {
  const stateBefore = {
    authenticated: true,
    token: '===token===',
    decodedToken: '===decoded===',
    signIn: { signingIn: false },
  };
  const stateAfter = {
    authenticated: false,
    decodedToken: null,
    token: null,
    signIn: { signingIn: false },
  };
  deepFreeze(stateBefore);

  expect(
    authReducer(
      stateBefore,
      createFailureFromAction({ action: signOut(), response: unsuccessfulSignOutResponse })
    )
  ).toEqual(stateAfter);
});
