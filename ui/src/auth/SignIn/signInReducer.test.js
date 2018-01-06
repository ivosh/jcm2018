import deepFreeze from 'deep-freeze';
import { hideSignInError, signInRequest, signInSuccess, signInError } from './SignInActions';
import signInReducer from './signInReducer';

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

  const stateAfter = signInReducer(stateBefore, {});
  expect(stateAfter.isSigningIn).toEqual(false);
  expect(stateAfter.errorCode).toEqual('');
  expect(stateAfter.errorMessage).toEqual('');
  expect(stateAfter.showError).toBe(false);
});

it('signInRequest()', () => {
  const stateBefore = {
    isSigningIn: false,
    errorCode: '',
    errorMessage: '',
    showError: false
  };
  const stateAfter = { ...stateBefore, isSigningIn: true };
  deepFreeze(stateBefore);

  expect(signInReducer(stateBefore, signInRequest())).toEqual(stateAfter);
});

it('signInSuccess()', () => {
  const stateBefore = {
    isSigningIn: true,
    errorCode: '',
    errorMessage: '',
    showError: false
  };
  const stateAfter = { ...stateBefore, isSigningIn: false };
  deepFreeze(stateBefore);

  expect(signInReducer(stateBefore, signInSuccess(successfulResponse))).toEqual(stateAfter);
});

it('signInError()', () => {
  const stateBefore = {
    isSigningIn: true,
    errorCode: '',
    errorMessage: '',
    showError: false
  };
  const stateAfter = {
    ...stateBefore,
    isSigningIn: false,
    errorCode: 'password incorrect',
    errorMessage: 'Špatné jméno či heslo. Uživatel může být též zamčený.',
    showError: true
  };
  deepFreeze(stateBefore);

  expect(signInReducer(stateBefore, signInError(unsuccessfulResponse))).toEqual(stateAfter);
});

it('hideSignInError()', () => {
  const stateBefore = {
    isSigningIn: false,
    errorCode: 'password incorrect',
    errorMessage: 'Špatné jméno či heslo. Uživatel může být též zamčený.',
    showError: true
  };
  const stateAfter = { ...stateBefore, showError: false };
  deepFreeze(stateBefore);

  expect(signInReducer(stateBefore, hideSignInError())).toEqual(stateAfter);
});
