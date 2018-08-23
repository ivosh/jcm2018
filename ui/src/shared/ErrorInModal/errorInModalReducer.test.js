import deepFreeze from 'deep-freeze';
import { DOHLASKY, PRIHLASKY } from '../../constants';
import { signIn } from '../../auth/SignIn/SignInActions';
import { signOut } from '../../auth/SignOut/SignOutActions';
import { saveVykon } from '../../casomeric/Casomira/StartovniCisla/StartovniCislaActions';
import {
  createSaveUcastError,
  createValidationError
} from '../../registrator/PrihlaskyDohlasky/PrihlaskyForm/PrihlaskyFormActions';
import { createVykon, deleteVykon } from '../../registrator/Startujici/StartujiciActions';
import { createFailureFromAction } from '../../store/wsAPI';
import { hideError } from './ErrorInModalActions';
import errorInModalReducer from './errorInModalReducer';

const genericUnsuccessfulResponse = {
  code: 'unfulfilled request',
  status: 'A strange error occurred.'
};

const unsuccessfulSaveResponse = {
  code: 'neexistuje',
  status: 'účastník s id ===id=== neexistuje.',
  requestId: '0.9310306652587374'
};

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
  expect(stateAfter.title).toEqual('');
});

global.crypto = { getRandomValues: arr => arr.fill(86) };

it('CASOMIRA_SAVE_VYKON_ERROR', () => {
  const stateBefore = {};
  const stateAfter = {
    code: 'unfulfilled request',
    message: 'A strange error occurred.',
    show: true,
    title: 'ukládání registrace na start'
  };
  deepFreeze(stateBefore);

  const request = { id: '===id===' };
  expect(
    errorInModalReducer(
      stateBefore,
      createFailureFromAction({
        action: saveVykon({}),
        request,
        response: genericUnsuccessfulResponse
      })
    )
  ).toEqual(stateAfter);
});

it('DOHLASKY_FORM_INVALID', () => {
  const stateBefore = {};
  const stateAfter = {
    ...stateBefore,
    code: 'nejde uložit',
    message: 'Přihláška nejde uložit. Povinná pole nejsou vyplněna.',
    show: true,
    title: 'vyplňování formuláře'
  };
  deepFreeze(stateBefore);

  expect(errorInModalReducer(stateBefore, createValidationError(DOHLASKY)())).toEqual(stateAfter);
});

it('DOHLASKY_SAVE_ERROR', () => {
  const stateBefore = {};
  const stateAfter = {
    ...stateBefore,
    code: 'neexistuje',
    message: 'účastník s id ===id=== neexistuje.',
    show: true
  };
  deepFreeze(stateBefore);

  expect(
    errorInModalReducer(stateBefore, createSaveUcastError(DOHLASKY)(unsuccessfulSaveResponse))
  ).toEqual(stateAfter);
});

it('PRIHLASKY_FORM_INVALID', () => {
  const stateBefore = {};
  const stateAfter = {
    ...stateBefore,
    code: 'nejde uložit',
    message: 'Přihláška nejde uložit. Povinná pole nejsou vyplněna.',
    show: true,
    title: 'vyplňování formuláře'
  };
  deepFreeze(stateBefore);

  expect(errorInModalReducer(stateBefore, createValidationError(PRIHLASKY)())).toEqual(stateAfter);
});

it('PRIHLASKY_SAVE_ERROR', () => {
  const stateBefore = {};
  const stateAfter = {
    ...stateBefore,
    code: 'neexistuje',
    message: 'účastník s id ===id=== neexistuje.',
    show: true
  };
  deepFreeze(stateBefore);

  expect(
    errorInModalReducer(stateBefore, createSaveUcastError(PRIHLASKY)(unsuccessfulSaveResponse))
  ).toEqual(stateAfter);
});

it('SIGN_IN_ERROR', () => {
  const stateBefore = {};
  const stateAfter = {
    code: 'password incorrect',
    message: 'Špatné jméno či heslo. Uživatel může být též zamčený.',
    show: true,
    title: 'přihlašování'
  };
  deepFreeze(stateBefore);

  expect(
    errorInModalReducer(
      stateBefore,
      createFailureFromAction({ action: signIn({}), response: unsuccessfulSignInResponse })
    )
  ).toEqual(stateAfter);
});

it('SIGN_OUT_ERROR', () => {
  const stateBefore = {};
  const stateAfter = {
    code: 'authentication token invalid',
    message: 'Špatný ověřovací token. Zkus se přihlásit znovu.',
    show: true,
    title: 'odhlašování'
  };
  deepFreeze(stateBefore);

  expect(
    errorInModalReducer(
      stateBefore,
      createFailureFromAction({ action: signOut(), response: unsuccessfulSignOutResponse })
    )
  ).toEqual(stateAfter);
});

it('STARTUJICI_CREATE_VYKON_ERROR', () => {
  const stateBefore = {};
  const stateAfter = {
    code: 'unfulfilled request',
    message: 'A strange error occurred.',
    show: true,
    title: 'vytváření registrace na start'
  };
  deepFreeze(stateBefore);

  const request = { id: '===id===', rok: 2018 };
  expect(
    errorInModalReducer(
      stateBefore,
      createFailureFromAction({
        action: createVykon({}),
        request,
        response: genericUnsuccessfulResponse
      })
    )
  ).toEqual(stateAfter);
});

it('STARTUJICI_DELETE_VYKON_ERROR', () => {
  const stateBefore = {};
  const stateAfter = {
    code: 'unfulfilled request',
    message: 'A strange error occurred.',
    show: true,
    title: 'rušení registrace na start'
  };
  deepFreeze(stateBefore);

  const request = { id: '===id===', rok: 2018 };
  expect(
    errorInModalReducer(
      stateBefore,
      createFailureFromAction({
        action: deleteVykon({}),
        request,
        response: genericUnsuccessfulResponse
      })
    )
  ).toEqual(stateAfter);
});

it('hideError()', () => {
  const stateBefore = { code: 'code', message: 'Errrorr!', show: true, title: 'Chyba při něčem!' };
  const stateAfter = { code: '', message: '', show: false, title: '' };
  deepFreeze(stateBefore);

  expect(errorInModalReducer(stateBefore, hideError())).toEqual(stateAfter);
});
