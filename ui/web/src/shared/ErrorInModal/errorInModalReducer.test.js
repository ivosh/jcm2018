import deepFreeze from 'deep-freeze';
import { UBYTOVANI_NEPRESPANO } from 'ui-common/common';
import { createFailureFromAction } from 'ui-common/store/wsAPI';
import { signIn } from 'ui-common/auth/SignIn/SignInActions';
import { signOut } from 'ui-common/auth/SignOut/SignOutActions';
import { ActionPrefixes, AKTUALNI_ROK } from '../../constants';
import { saveVykon } from '../../casomeric/Casomira/StartovniCisla/StartovniCislaActions';
import { fetchRocniky } from '../../entities/rocniky/rocnikyActions';
import { fetchStopky } from '../../entities/stopky/stopkyActions';
import { fetchUcastnici } from '../../entities/ucastnici/ucastniciActions';
import { sendEmail } from '../../registrator/EmailComposer/EmailComposerActions';
import { poharPredan } from '../../registrator/Pohary/PoharyActions';
import {
  addPoznamka,
  deletePoznamka,
  modifyPoznamka,
} from '../../registrator/Poznamky/PoznamkyActions';
import {
  createPrihlaskySave,
  createValidationError,
} from '../../registrator/PrihlaskyDohlasky/PrihlaskyForm/PrihlaskyFormActions';
import { createVykon, deleteVykon } from '../../registrator/Startujici/StartujiciActions';
import { modifyUbytovani } from '../../registrator/Ubytovani/UbytovaniActions';
import { hideError } from './ErrorInModalActions';
import errorInModalReducer from './errorInModalReducer';

const dohlaskySave = createPrihlaskySave(ActionPrefixes.DOHLASKY);
const prihlaskySave = createPrihlaskySave(ActionPrefixes.PRIHLASKY);

const genericUnsuccessfulResponse = {
  code: 'unfulfilled request',
  status: 'A strange error occurred.',
};

const unsuccessfulSaveResponse = {
  code: 'neexistuje',
  status: 'účastník s id ===id=== neexistuje.',
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

const testUnsuccessfulResponse = ({
  action,
  code = 'unfulfilled request',
  message = 'A strange error occurred.',
  request,
  response = genericUnsuccessfulResponse,
  title,
}) => {
  const stateBefore = {};
  const stateAfter = { code, message, show: true, title };
  deepFreeze(stateBefore);

  expect(
    errorInModalReducer(stateBefore, createFailureFromAction({ action, request, response }))
  ).toEqual(stateAfter);
};

it('na začátku', () => {
  const stateBefore = undefined;

  const stateAfter = errorInModalReducer(stateBefore, {});
  expect(stateAfter.code).toEqual('');
  expect(stateAfter.message).toEqual('');
  expect(stateAfter.show).toBe(false);
  expect(stateAfter.title).toEqual('');
});

global.crypto = { getRandomValues: (arr) => arr.fill(86) };

it('CASOMIRA_SAVE_VYKON_ERROR', () =>
  testUnsuccessfulResponse({
    action: saveVykon({}),
    request: { id: '===id===' },
    title: 'ukládání registrace na start',
  }));

it('DOHLASKY_FORM_INVALID', () => {
  const stateBefore = {};
  const stateAfter = {
    ...stateBefore,
    code: 'nejde uložit',
    message: 'Přihláška nejde uložit. Povinná pole nejsou vyplněna.',
    show: true,
    title: 'vyplňování formuláře',
  };
  deepFreeze(stateBefore);

  expect(
    errorInModalReducer(stateBefore, createValidationError(ActionPrefixes.DOHLASKY)())
  ).toEqual(stateAfter);
});

it('DOHLASKY_SAVE_ERROR', () =>
  testUnsuccessfulResponse({
    action: dohlaskySave(),
    code: 'neexistuje',
    message: 'účastník s id ===id=== neexistuje.',
    request: {},
    response: unsuccessfulSaveResponse,
    title: 'ukládání formuláře',
  }));

it('FETCH_ROCNIKY_ERROR', () =>
  testUnsuccessfulResponse({
    action: fetchRocniky(),
    title: 'načítání ročníků',
  }));

it('FETCH_STOPKY_ERROR', () =>
  testUnsuccessfulResponse({
    action: fetchStopky(),
    title: 'načítání stopek',
  }));

it('FETCH_UCASTNICI_ERROR', () =>
  testUnsuccessfulResponse({
    action: fetchUcastnici(),
    title: 'načítání účastníků',
  }));

it('POHAR_PREDAN_ERROR', () =>
  testUnsuccessfulResponse({
    action: poharPredan({ id: '===id===' }),
    title: 'předávání poháru',
  }));

it('POZNAMKA_ADD_ERROR', () =>
  testUnsuccessfulResponse({
    action: addPoznamka({ id: '===id===', poznamka: { text: 'text' }, rok: AKTUALNI_ROK }),
    title: 'přidávání poznámky',
  }));

it('POZNAMKA_DELETE_ERROR', () =>
  testUnsuccessfulResponse({
    action: deletePoznamka({ id: '===id===', index: 0, rok: AKTUALNI_ROK }),
    title: 'mazání poznámky',
  }));

it('POZNAMKA_MODIFY_ERROR', () =>
  testUnsuccessfulResponse({
    action: modifyPoznamka({
      id: '===id===',
      index: 1,
      poznamka: { datum: new Date(), text: 'text' },
      rok: AKTUALNI_ROK,
    }),
    title: 'ukládání poznámky',
  }));

it('PRIHLASKY_FORM_INVALID', () => {
  const stateBefore = {};
  const stateAfter = {
    ...stateBefore,
    code: 'nejde uložit',
    message: 'Přihláška nejde uložit. Povinná pole nejsou vyplněna.',
    show: true,
    title: 'vyplňování formuláře',
  };
  deepFreeze(stateBefore);

  expect(
    errorInModalReducer(stateBefore, createValidationError(ActionPrefixes.PRIHLASKY)())
  ).toEqual(stateAfter);
});

it('PRIHLASKY_SAVE_ERROR', () =>
  testUnsuccessfulResponse({
    action: prihlaskySave(),
    code: 'neexistuje',
    message: 'účastník s id ===id=== neexistuje.',
    request: {},
    response: unsuccessfulSaveResponse,
    title: 'ukládání formuláře',
  }));

it('MODIFY_UBYTOVANI_ERROR', () =>
  testUnsuccessfulResponse({
    action: modifyUbytovani({ modifikace: UBYTOVANI_NEPRESPANO }),
    code: 'neexistuje',
    message: 'účastník s id ===id=== neexistuje.',
    request: {},
    response: unsuccessfulSaveResponse,
    title: 'ukládání ubytování',
  }));

it('SEND_EMAIL_ERROR', () =>
  testUnsuccessfulResponse({
    action: sendEmail({ mailFrom: 's@s.io', subject: 'test subject', text: 'text' }),
    title: 'posílání emailu',
  }));

it('SIGN_IN_ERROR', () =>
  testUnsuccessfulResponse({
    action: signIn({}),
    code: 'password incorrect',
    message: 'Špatné jméno či heslo. Uživatel může být též zamčený.',
    response: unsuccessfulSignInResponse,
    title: 'přihlašování',
  }));

it('SIGN_OUT_ERROR', () =>
  testUnsuccessfulResponse({
    action: signOut(),
    code: 'authentication token invalid',
    message: 'Špatný ověřovací token. Zkus se přihlásit znovu.',
    response: unsuccessfulSignOutResponse,
    title: 'odhlašování',
  }));

it('STARTUJICI_CREATE_VYKON_ERROR', () =>
  testUnsuccessfulResponse({
    action: createVykon({}),
    request: { id: '===id===', rok: 2018 },
    title: 'vytváření registrace na start',
  }));

it('STARTUJICI_DELETE_VYKON_ERROR', () =>
  testUnsuccessfulResponse({
    action: deleteVykon({}),
    request: { id: '===id===', rok: 2018 },
    title: 'rušení registrace na start',
  }));

it('hideError()', () => {
  const stateBefore = { code: 'code', message: 'Errrorr!', show: true, title: 'Chyba při něčem!' };
  const stateAfter = { code: '', message: '', show: false, title: '' };
  deepFreeze(stateBefore);

  expect(errorInModalReducer(stateBefore, hideError())).toEqual(stateAfter);
});
