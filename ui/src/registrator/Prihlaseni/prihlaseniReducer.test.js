import moment from 'moment';
import deepFreeze from 'deep-freeze';
import {
  hideError,
  inputChanged,
  reset,
  saveUcastRequest,
  saveUcastSuccess,
  saveUcastError
} from './PrihlaseniActions';
import prihlaseniReducer, { datumValid, inputValid, prihlaseniValid } from './prihlaseniReducer';

const successfulResponse = {
  code: 'ok',
  response: {
    id: '===id===',
    startCislo: 12
  },
  requestId: '0.99234334532253'
};
const unsuccessfulResponse = {
  code: 'neexistuje',
  status: 'účastník s id ===id=== neexistuje.',
  requestId: '0.9310306652587374'
};

it('na začátku', () => {
  const stateBefore = undefined;

  const stateAfter = prihlaseniReducer(stateBefore, {});
  expect(stateAfter.errorCode).toEqual('');
  expect(stateAfter.errorMessage).toEqual('');
  expect(stateAfter.showError).toBe(false);
  expect(stateAfter.fetching).toBe(false);
  expect(stateAfter.saving).toBe(false);
  expect(stateAfter.ucastnikId).toBe(undefined);
  expect(stateAfter.validateEmpty).toBe(false);
  expect(stateAfter.udaje).toEqual({
    prijmeni: undefined,
    jmeno: undefined,
    narozeni: { den: undefined, mesic: undefined, rok: undefined },
    pohlavi: undefined,
    adresa: undefined,
    obec: undefined,
    psc: undefined,
    stat: 'Česká republika',
    klub: undefined,
    email: undefined,
    telefon: undefined
  });
  expect(stateAfter.prihlaska).toEqual({
    datum: undefined,
    kategorie: undefined,
    startCislo: undefined,
    kod: undefined
  });
});

it('hideError()', () => {
  const stateBefore = {
    saving: false,
    errorCode: 'database problem',
    errorMessage: 'Problém při komunikaci s databází.',
    showError: true
  };
  const stateAfter = { ...stateBefore, showError: false };
  deepFreeze(stateBefore);

  expect(prihlaseniReducer(stateBefore, hideError())).toEqual(stateAfter);
});

it('reset()', () => {
  const stateBefore = {
    errorCode: 'chybový kód',
    errorMessage: 'Dlouhá chybová hláška.',
    showError: true,
    fetching: false,
    saving: true,
    ucastnikId: '===id===',
    validateEmpty: true,
    udaje: {
      prijmeni: 'Hudák',
      jmeno: 'Jan',
      narozeni: { den: 7, mesic: 7, rok: 1954 },
      pohlavi: 'muž',
      adresa: '',
      obec: 'Samorost',
      psc: '34567',
      stat: 'Česká republika',
      klub: '',
      email: 'em@ai.l',
      telefon: '123 456 789'
    },
    prihlaska: {
      datum: '1. 10. 2019',
      kategorie: 'maraton',
      startCislo: 23,
      kod: '===kod=='
    }
  };
  const stateAfter = {
    errorCode: '',
    errorMessage: '',
    showError: false,
    fetching: false,
    saving: false,
    ucastnikId: undefined,
    validateEmpty: false,
    udaje: {
      prijmeni: undefined,
      jmeno: undefined,
      narozeni: { den: undefined, mesic: undefined, rok: undefined },
      pohlavi: undefined,
      adresa: undefined,
      obec: undefined,
      psc: undefined,
      stat: 'Česká republika',
      klub: undefined,
      email: undefined,
      telefon: undefined
    },
    prihlaska: {
      datum: undefined,
      kategorie: undefined,
      startCislo: undefined,
      kod: undefined
    }
  };
  deepFreeze(stateBefore);

  expect(prihlaseniReducer(stateBefore, reset())).toEqual(stateAfter);
});

it('saveUcastRequest()', () => {
  const stateBefore = { saving: false };
  const stateAfter = { ...stateBefore, saving: true };
  deepFreeze(stateBefore);

  expect(prihlaseniReducer(stateBefore, saveUcastRequest())).toEqual(stateAfter);
});

it('saveUcastSuccess()', () => {
  const stateBefore = { saving: true };
  const stateAfter = { ...stateBefore, saving: false, showError: false };
  deepFreeze(stateBefore);

  expect(prihlaseniReducer(stateBefore, saveUcastSuccess(successfulResponse))).toEqual(stateAfter);
});

it('saveUcastError()', () => {
  const stateBefore = { saving: true, errorCode: '', errorMessage: '', showError: false };
  const stateAfter = {
    ...stateBefore,
    saving: false,
    errorCode: 'neexistuje',
    errorMessage: 'účastník s id ===id=== neexistuje.',
    showError: true
  };
  deepFreeze(stateBefore);

  expect(prihlaseniReducer(stateBefore, saveUcastError(unsuccessfulResponse))).toEqual(stateAfter);
});

it('validation of the initial state [validateEmpty === false]', () => {
  const state = {
    validateEmpty: false,
    udaje: {
      prijmeni: undefined,
      jmeno: undefined,
      narozeni: { den: undefined, mesic: undefined, rok: undefined },
      pohlavi: undefined,
      adresa: undefined,
      obec: undefined,
      psc: undefined,
      stat: 'Česká republika',
      klub: undefined,
      email: undefined,
      telefon: undefined
    },
    prihlaska: {
      datum: undefined,
      kategorie: undefined,
      startCislo: undefined,
      kod: undefined
    }
  };
  deepFreeze(state);

  expect(inputValid('udaje.prijmeni', state.udaje.prijmeni, state)).toBe(undefined);
  expect(inputValid('udaje.jmeno', state.udaje.jmeno, state)).toBe(undefined);
  expect(inputValid('udaje.narozeni', state.udaje.narozeni, state)).toBe(undefined);
  expect(inputValid('udaje.pohlavi', state.udaje.pohlavi, state)).toBe(undefined);
  expect(inputValid('udaje.adresa', state.udaje.adresa, state)).toBe(undefined);
  expect(inputValid('udaje.obec', state.udaje.obec, state)).toBe(undefined);
  expect(inputValid('udaje.psc', state.udaje.psc, state)).toBe(undefined);
  expect(inputValid('udaje.stat', state.udaje.stat, state)).toBe('success');
  expect(inputValid('udaje.klub', state.udaje.klub, state)).toBe(undefined);
  expect(inputValid('udaje.telefon', state.udaje.telefon, state)).toBe(undefined);
  expect(inputValid('udaje.email', state.udaje.email, state)).toBe(undefined);
  expect(inputValid('prihlaska.datum', state.prihlaska.datum, state)).toBe(undefined);
  expect(inputValid('prihlaska.kategorie', state.prihlaska.kategorie, state)).toBe(undefined);
  expect(inputValid('prihlaska.startCislo', state.prihlaska.startCislo, state)).toBe(undefined);
  expect(inputValid('prihlaska.kod', state.prihlaska.kod, state)).toBe(undefined);
  expect(prihlaseniValid(state)).toBe(true);
});

it('validation of the initial state [validateEmpty === true]', () => {
  const state = {
    validateEmpty: true,
    udaje: {
      prijmeni: undefined,
      jmeno: undefined,
      narozeni: { den: undefined, mesic: undefined, rok: undefined },
      pohlavi: undefined,
      adresa: undefined,
      obec: undefined,
      psc: undefined,
      stat: 'Česká republika',
      klub: undefined,
      email: undefined,
      telefon: undefined
    },
    prihlaska: {
      datum: undefined,
      kategorie: undefined,
      startCislo: undefined,
      kod: undefined
    }
  };
  deepFreeze(state);

  expect(inputValid('udaje.prijmeni', state.udaje.prijmeni, state)).toEqual('error');
  expect(inputValid('udaje.jmeno', state.udaje.jmeno, state)).toEqual('error');
  expect(inputValid('udaje.narozeni', state.udaje.narozeni, state)).toEqual('error');
  expect(inputValid('udaje.pohlavi', state.udaje.pohlavi, state)).toEqual('error');
  expect(inputValid('udaje.adresa', state.udaje.adresa, state)).toBe(undefined);
  expect(inputValid('udaje.obec', state.udaje.obec, state)).toEqual('error');
  expect(inputValid('udaje.psc', state.udaje.psc, state)).toEqual('error');
  expect(inputValid('udaje.stat', state.udaje.stat, state)).toEqual('success');
  expect(inputValid('udaje.klub', state.udaje.klub, state)).toBe(undefined);
  expect(inputValid('udaje.telefon', state.udaje.telefon, state)).toBe(undefined);
  expect(inputValid('udaje.email', state.udaje.email, state)).toBe(undefined);
  expect(inputValid('prihlaska.datum', state.prihlaska.datum, state)).toEqual('error');
  expect(inputValid('prihlaska.kategorie', state.prihlaska.kategorie, state)).toEqual('error');
  expect(inputValid('prihlaska.startCislo', state.prihlaska.startCislo, state)).toBe(undefined);
  expect(inputValid('prihlaska.kod', state.prihlaska.kod, state)).toBe(undefined);
  expect(prihlaseniValid(state)).toBe(false);
});

it('validation of some invalid state [validateEmpty === false]', () => {
  const state = {
    validateEmpty: false,
    udaje: {
      prijmeni: '',
      jmeno: undefined,
      narozeni: { den: undefined, mesic: undefined, rok: 'žblabuňka' },
      pohlavi: 'muž',
      adresa: 'Za vodou 4787',
      obec: 'Kolešov',
      psc: undefined,
      stat: 'Česká republika',
      klub: 'Hory hory hory',
      email: 'není',
      telefon: undefined
    },
    prihlaska: {
      datum: '1. 12. 2017',
      kategorie: undefined,
      startCislo: undefined,
      kod: '===kód==='
    }
  };
  deepFreeze(state);

  expect(inputValid('udaje.prijmeni', state.udaje.prijmeni, state)).toEqual('error');
  expect(inputValid('udaje.jmeno', state.udaje.jmeno, state)).toBe(undefined);
  expect(inputValid('udaje.narozeni', state.udaje.narozeni, state)).toEqual('error');
  expect(inputValid('udaje.pohlavi', state.udaje.pohlavi, state)).toEqual('success');
  expect(inputValid('udaje.adresa', state.udaje.adresa, state)).toBe(undefined);
  expect(inputValid('udaje.obec', state.udaje.obec, state)).toEqual('success');
  expect(inputValid('udaje.psc', state.udaje.psc, state)).toBe(undefined);
  expect(inputValid('udaje.stat', state.udaje.stat, state)).toEqual('success');
  expect(inputValid('udaje.klub', state.udaje.klub, state)).toBe(undefined);
  expect(inputValid('udaje.telefon', state.udaje.telefon, state)).toBe(undefined);
  expect(inputValid('udaje.email', state.udaje.email, state)).toBe(undefined);
  expect(inputValid('prihlaska.datum', state.prihlaska.datum, state)).toEqual('success');
  expect(inputValid('prihlaska.kategorie', state.prihlaska.kategorie, state)).toBe(undefined);
  expect(inputValid('prihlaska.startCislo', state.prihlaska.startCislo, state)).toBe(undefined);
  expect(inputValid('prihlaska.kod', state.prihlaska.kod, state)).toBe(undefined);
  expect(prihlaseniValid(state)).toBe(false);
});

it('validation of some invalid state [validateEmpty === true]', () => {
  const state = {
    validateEmpty: true,
    udaje: {
      prijmeni: '',
      jmeno: undefined,
      narozeni: { den: undefined, mesic: undefined, rok: 'žblabuňka' },
      pohlavi: 'muž',
      adresa: 'Za vodou 4787',
      obec: 'Kolešov',
      psc: undefined,
      stat: 'Česká republika',
      klub: 'Hory hory hory',
      email: 'není',
      telefon: undefined
    },
    prihlaska: {
      datum: '1. 12. 2017',
      kategorie: undefined,
      startCislo: undefined,
      kod: '===kód==='
    }
  };
  deepFreeze(state);

  expect(inputValid('udaje.prijmeni', state.udaje.prijmeni, state)).toEqual('error');
  expect(inputValid('udaje.jmeno', state.udaje.jmeno, state)).toEqual('error');
  expect(inputValid('udaje.narozeni', state.udaje.narozeni, state)).toEqual('error');
  expect(inputValid('udaje.pohlavi', state.udaje.pohlavi, state)).toEqual('success');
  expect(inputValid('udaje.adresa', state.udaje.adresa, state)).toBe(undefined);
  expect(inputValid('udaje.obec', state.udaje.obec, state)).toEqual('success');
  expect(inputValid('udaje.psc', state.udaje.psc, state)).toEqual('error');
  expect(inputValid('udaje.stat', state.udaje.stat, state)).toEqual('success');
  expect(inputValid('udaje.klub', state.udaje.klub, state)).toBe(undefined);
  expect(inputValid('udaje.telefon', state.udaje.telefon, state)).toBe(undefined);
  expect(inputValid('udaje.email', state.udaje.email, state)).toBe(undefined);
  expect(inputValid('prihlaska.datum', state.prihlaska.datum, state)).toEqual('success');
  expect(inputValid('prihlaska.kategorie', state.prihlaska.kategorie, state)).toEqual('error');
  expect(inputValid('prihlaska.startCislo', state.prihlaska.startCislo, state)).toBe(undefined);
  expect(inputValid('prihlaska.kod', state.prihlaska.kod, state)).toBe(undefined);
  expect(prihlaseniValid(state)).toBe(false);
});

it('prihlaska.datum - neúplné', () => {
  const stateBefore = { prihlaska: { datum: undefined } };
  deepFreeze(stateBefore);
  const stateAfter = { prihlaska: { datum: '1. 7. 201' } };

  expect(
    prihlaseniReducer(
      stateBefore,
      inputChanged('prihlaska.datum', { target: { value: '1. 7. 201' } })
    )
  ).toEqual(stateAfter);
  expect(datumValid(stateAfter.prihlaska.datum)).toBe(false);
});

it('prihlaska.datum - formát 1', () => {
  const stateBefore = { prihlaska: { datum: '1. 7. 201' } };
  deepFreeze(stateBefore);
  const stateAfter = { prihlaska: { datum: '2017-07-01T00:00:00.000Z' } };

  expect(
    prihlaseniReducer(
      stateBefore,
      inputChanged('prihlaska.datum', { target: { value: '1. 7. 2017' } })
    )
  ).toEqual(stateAfter);
  expect(datumValid(stateAfter.prihlaska.datum)).toBe(true);
  expect(moment.utc(stateAfter.prihlaska.datum).format('D. M. YYYY')).toEqual('1. 7. 2017');
});

it('prihlaska.datum - formát 2', () => {
  const stateBefore = { prihlaska: { datum: '1.7.201' } };
  deepFreeze(stateBefore);
  const stateAfter = { prihlaska: { datum: '2017-07-01T00:00:00.000Z' } };

  expect(
    prihlaseniReducer(
      stateBefore,
      inputChanged('prihlaska.datum', { target: { value: '1.7.2017' } })
    )
  ).toEqual(stateAfter);
  expect(datumValid(stateAfter.prihlaska.datum)).toBe(true);
  expect(moment.utc(stateAfter.prihlaska.datum).format('D. M. YYYY')).toEqual('1. 7. 2017');
});
