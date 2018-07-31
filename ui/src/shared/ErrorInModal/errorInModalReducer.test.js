import deepFreeze from 'deep-freeze';
import { signInError } from '../../auth/SignIn/SignInActions';
import { signOutError } from '../../auth/SignOut/SignOutActions';
import { hideError } from './ErrorInModalActions';
import errorInModalReducer from './errorInModalReducer';

const unsuccessfulSignInResponse = {
  code: 'password incorrect',
  status: 'Špatné jméno či heslo. Uživatel může být též zamčený.',
  requestId: '0.9310306652587374'
};

const unsuccessfulSignOutResponse = {
  code: 'authentication token invalid',
  status: 'Špatný ověřovací token. Zkus se přihlásit znovu.',
  requestId: '0.9310306652587371'
};

it('na začátku', () => {
  const stateBefore = undefined;

  const stateAfter = errorInModalReducer(stateBefore, {});
  expect(stateAfter.code).toEqual('');
  expect(stateAfter.message).toEqual('');
  expect(stateAfter.show).toBe(false);
});

it('signInError()', () => {
  const stateBefore = {};
  const stateAfter = {
    code: 'password incorrect',
    message: 'Špatné jméno či heslo. Uživatel může být též zamčený.',
    show: true
  };
  deepFreeze(stateBefore);

  expect(errorInModalReducer(stateBefore, signInError(unsuccessfulSignInResponse))).toEqual(
    stateAfter
  );
});

it('signOutError()', () => {
  const stateBefore = {};
  const stateAfter = {
    code: 'authentication token invalid',
    message: 'Špatný ověřovací token. Zkus se přihlásit znovu.',
    show: true
  };
  deepFreeze(stateBefore);

  expect(errorInModalReducer(stateBefore, signOutError(unsuccessfulSignOutResponse))).toEqual(
    stateAfter
  );
});

it('hideError()', () => {
  const stateBefore = { code: 'code', message: 'Errrorr!', show: true };
  const stateAfter = { code: '', message: '', show: false };
  deepFreeze(stateBefore);

  expect(errorInModalReducer(stateBefore, hideError())).toEqual(stateAfter);
});
