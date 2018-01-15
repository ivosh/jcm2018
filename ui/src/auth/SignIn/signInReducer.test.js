import deepFreeze from 'deep-freeze';
import { hideError, signInRequest, signInSuccess, signInError } from './SignInActions';
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

const decodedToken = {
  username: 'tomáš',
  nonce: '4345ab771'
};

it('na začátku', () => {
  const stateBefore = undefined;

  const stateAfter = signInReducer(stateBefore, {});
  expect(stateAfter.signingIn).toEqual(false);
  expect(stateAfter.errorCode).toEqual('');
  expect(stateAfter.errorMessage).toEqual('');
  expect(stateAfter.showError).toBe(false);
});

it('signInRequest()', () => {
  const stateBefore = {
    signingIn: false,
    errorCode: '',
    errorMessage: '',
    showError: false
  };
  const stateAfter = { ...stateBefore, signingIn: true };
  deepFreeze(stateBefore);

  expect(signInReducer(stateBefore, signInRequest())).toEqual(stateAfter);
});

it('signInSuccess()', () => {
  const stateBefore = {
    signingIn: true,
    errorCode: '',
    errorMessage: '',
    showError: false
  };
  const stateAfter = { ...stateBefore, signingIn: false };
  deepFreeze(stateBefore);

  expect(signInReducer(stateBefore, signInSuccess(successfulResponse, decodedToken))).toEqual(
    stateAfter
  );
});

it('signInError()', () => {
  const stateBefore = {
    signingIn: true,
    errorCode: '',
    errorMessage: '',
    showError: false
  };
  const stateAfter = {
    ...stateBefore,
    signingIn: false,
    errorCode: 'password incorrect',
    errorMessage: 'Špatné jméno či heslo. Uživatel může být též zamčený.',
    showError: true
  };
  deepFreeze(stateBefore);

  expect(signInReducer(stateBefore, signInError(unsuccessfulResponse))).toEqual(stateAfter);
});

it('hideError()', () => {
  const stateBefore = {
    signingIn: false,
    errorCode: 'password incorrect',
    errorMessage: 'Špatné jméno či heslo. Uživatel může být též zamčený.',
    showError: true
  };
  const stateAfter = { ...stateBefore, showError: false };
  deepFreeze(stateBefore);

  expect(signInReducer(stateBefore, hideError())).toEqual(stateAfter);
});
