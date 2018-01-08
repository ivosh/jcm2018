import deepFreeze from 'deep-freeze';
import { signInSuccess, signInError } from './SignIn/SignInActions';
import authReducer from './authReducer';

const successfulResponse = {
  code: 'ok',
  response: {
    token: '=======token=========',
    username: 'tomáš'
  },
  requestId: '0.9310306652587374'
};

const unsuccessfulResponse = {
  code: 'password incorrect',
  status: 'Špatné jméno či heslo. Uživatel může být též zamčený.',
  requestId: '0.9310306652587374'
};

it('na začátku', () => {
  const stateBefore = undefined;

  const stateAfter = authReducer(stateBefore, {});
  expect(stateAfter.authenticated).toEqual(false);
  expect(stateAfter.token).toBe(null);
});

it('signInSuccess()', () => {
  const stateBefore = { authenticated: false, token: null, signIn: { isSigningIn: false } };
  const stateAfter = { ...stateBefore, authenticated: true, token: '=======token=========' };
  deepFreeze(stateBefore);

  expect(authReducer(stateBefore, signInSuccess(successfulResponse))).toEqual(stateAfter);
});

it('signInError()', () => {
  const stateBefore = { authenticated: true, token: '==token==', signIn: { isSigningIn: false } };
  const stateAfter = {
    authenticated: false,
    token: null,
    signIn: {
      isSigningIn: false,
      errorCode: 'password incorrect',
      errorMessage: 'Špatné jméno či heslo. Uživatel může být též zamčený.',
      showError: true
    }
  };
  deepFreeze(stateBefore);

  expect(authReducer(stateBefore, signInError(unsuccessfulResponse))).toEqual(stateAfter);
});
