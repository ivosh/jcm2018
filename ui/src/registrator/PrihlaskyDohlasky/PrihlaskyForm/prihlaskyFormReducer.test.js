import deepFreeze from 'deep-freeze';
import { fetchRocnikySuccess } from '../../../entities/rocniky/rocnikyActions';
import ucastniciTestData from '../../../entities/ucastnici/ucastniciTestData';
import { predepsaneStartovne } from '../../platby';
import { createAddPlatba, createRemovePlatba } from '../Platby/PlatbyActions';
import {
  createHideError,
  createHideModal,
  createInputChanged,
  createLoadUcastnik,
  createReset,
  createSaveUcastRequest,
  createSaveUcastSuccess,
  createSaveUcastError,
  createShowModal,
  createValidate,
  createValidationError
} from './PrihlaskyFormActions';
import {
  createPrihlaskyFormReducer,
  formatValue,
  formErrors,
  getValue,
  inputOptions,
  inputValid,
  isInputEnabled,
  isInputVisible
} from './prihlaskyFormReducer';

const actionPrefix = 'PRIHLASKY_YYY';
const addPlatba = createAddPlatba(actionPrefix);
const dohlaskyFormReducer = createPrihlaskyFormReducer('DOHLASKY');
const hideError = createHideError(actionPrefix);
const hideModal = createHideModal(actionPrefix);
const inputChanged = createInputChanged(actionPrefix);
const loadUcastnik = createLoadUcastnik({ actionPrefix, jePrihlaskou: true });
const prihlaskyFormReducer = createPrihlaskyFormReducer(actionPrefix, true);
const removePlatba = createRemovePlatba(actionPrefix);
const reset = createReset({ actionPrefix, jePrihlaskou: true, now: new Date('2018-06-01') });
const saveUcastRequest = createSaveUcastRequest(actionPrefix);
const saveUcastSuccess = createSaveUcastSuccess(actionPrefix);
const saveUcastError = createSaveUcastError(actionPrefix);
const showModal = createShowModal(actionPrefix);
const validate = createValidate(actionPrefix);
const validationError = createValidationError(actionPrefix);

const unsuccessfulResponse = {
  code: 'neexistuje',
  status: 'účastník s id ===id=== neexistuje.',
  requestId: '0.9310306652587374'
};

it('na začátku - jePrihlaskou: true', () => {
  const stateBefore = undefined;

  const stateAfter = prihlaskyFormReducer(stateBefore, {});
  expect(stateAfter.errorCode).toEqual('');
  expect(stateAfter.errorMessage).toEqual('');
  expect(stateAfter.jePrihlaskou).toBe(true);
  expect(stateAfter.showError).toBe(false);
  expect(stateAfter.saving).toBe(false);
  expect(stateAfter.ucastnikId).toBe(undefined);
  expect(stateAfter.validate).toBe(false);
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
    typ: undefined,
    startCislo: undefined,
    kod: undefined,
    mladistvyPotvrzen: undefined
  });
  expect(stateAfter.platby).toEqual([]);
});

it('na začátku - jePrihlaskou: false', () => {
  const stateBefore = undefined;

  const stateAfter = dohlaskyFormReducer(stateBefore, {});
  expect(stateAfter.jePrihlaskou).toBe(false);
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

  expect(prihlaskyFormReducer(stateBefore, hideError())).toEqual(stateAfter);
});

it('reset()', () => {
  const stateBefore = {
    errorCode: 'chybový kód',
    errorMessage: 'Dlouhá chybová hláška.',
    showError: true,
    saved: true,
    saving: true,
    ucastnikId: '===id===',
    validate: true,
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
      kategorie: '===k1===',
      typ: 'maraton',
      startCislo: 23,
      kod: '===kod==',
      mladistvyPotvrzen: false
    },
    platby: [{ castka: 200, datum: new Date(), typ: 'převodem' }],
    ubytovani: { pátek: { prihlaseno: true } }
  };
  const stateAfter = {
    errorCode: '',
    errorMessage: '',
    showError: false,
    jePrihlaskou: true,
    saved: false,
    saving: false,
    ucastnikId: undefined,
    validate: false,
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
      datum: '2018-06-01T00:00:00.000Z',
      kategorie: undefined,
      typ: undefined,
      startCislo: undefined,
      kod: undefined,
      mladistvyPotvrzen: undefined
    },
    platby: [],
    ubytovani: {}
  };
  deepFreeze(stateBefore);
  const { rocniky } = ucastniciTestData.entities;

  expect(prihlaskyFormReducer(stateBefore, reset({ rocniky }))).toEqual(stateAfter);
});

it('hideModal()', () => {
  const stateBefore = {
    saved: true
  };
  const stateAfter = { ...stateBefore, saved: false };
  deepFreeze(stateBefore);

  expect(prihlaskyFormReducer(stateBefore, hideModal())).toEqual(stateAfter);
});

it('showModal()', () => {
  const stateBefore = {
    saved: false
  };
  const stateAfter = { ...stateBefore, saved: true };
  deepFreeze(stateBefore);

  expect(prihlaskyFormReducer(stateBefore, showModal())).toEqual(stateAfter);
});

it('saveUcastRequest()', () => {
  const stateBefore = { saving: false };
  const stateAfter = { ...stateBefore, saving: true };
  deepFreeze(stateBefore);

  expect(prihlaskyFormReducer(stateBefore, saveUcastRequest())).toEqual(stateAfter);
});

it('saveUcastSuccess()', () => {
  const stateBefore = { saving: true };
  const stateAfter = { ...stateBefore, ucastnikId: '===id===', saving: false, showError: false };
  deepFreeze(stateBefore);

  expect(
    prihlaskyFormReducer(
      stateBefore,
      saveUcastSuccess({ id: '===id===', udaje: {}, prihlaska: {}, platby: [], ubytovani: {} })
    )
  ).toEqual(stateAfter);
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

  expect(prihlaskyFormReducer(stateBefore, saveUcastError(unsuccessfulResponse))).toEqual(
    stateAfter
  );
});

it('validation of the initial state [validate === false]', () => {
  const form = {
    validate: false,
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
      typ: undefined,
      startCislo: undefined,
      kod: undefined,
      mladistvyPotvrzen: undefined
    },
    platby: [],
    ubytovani: {}
  };
  deepFreeze(form);
  const { rocniky } = ucastniciTestData.entities;

  expect(inputValid({ name: 'udaje.prijmeni', value: form.udaje.prijmeni, form })).toBe(undefined);
  expect(inputValid({ name: 'udaje.jmeno', value: form.udaje.jmeno, form })).toBe(undefined);
  expect(inputValid({ name: 'udaje.narozeni', value: form.udaje.narozeni, form })).toBe(undefined);
  expect(inputValid({ name: 'udaje.pohlavi', value: form.udaje.pohlavi, form })).toBe(undefined);
  expect(inputValid({ name: 'udaje.adresa', value: form.udaje.adresa, form })).toBe(undefined);
  expect(inputValid({ name: 'udaje.obec', value: form.udaje.obec, form })).toBe(undefined);
  expect(inputValid({ name: 'udaje.psc', value: form.udaje.psc, form })).toBe(undefined);
  expect(inputValid({ name: 'udaje.stat', value: form.udaje.stat, form })).toBe('success');
  expect(inputValid({ name: 'udaje.klub', value: form.udaje.klub, form })).toBe(undefined);
  expect(inputValid({ name: 'udaje.telefon', value: form.udaje.telefon, form })).toBe(undefined);
  expect(inputValid({ name: 'udaje.email', value: form.udaje.email, form })).toBe(undefined);
  expect(inputValid({ name: 'prihlaska.datum', value: form.prihlaska.datum, form })).toBe(
    undefined
  );
  expect(inputValid({ name: 'prihlaska.kategorie', value: form.prihlaska.kategorie, form })).toBe(
    undefined
  );
  expect(inputValid({ name: 'prihlaska.typ', value: form.prihlaska.typ, form })).toBe(undefined);
  expect(inputValid({ name: 'prihlaska.startCislo', value: form.prihlaska.startCislo, form })).toBe(
    undefined
  );
  expect(inputValid({ name: 'prihlaska.kod', value: form.prihlaska.kod, form })).toBe(undefined);
  expect(
    inputValid({
      name: 'prihlaska.mladistvyPotvrzen',
      value: form.prihlaska.mladistvyPotvrzen,
      form,
      rocniky
    })
  ).toBe(undefined);
  expect(inputValid({ name: 'complete.nonsense', value: 'huh', form })).toBe('error');
  expect(formErrors({ form, rocniky })).toEqual([]);
  expect(isInputEnabled({ name: 'prihlaska.startCislo', form, rocniky })).toBe(false);
  expect(isInputEnabled({ name: 'ubytovani.pátek', form, rocniky })).toBe(true);
});

it('validation of the initial state [validate === true]', () => {
  const form = {
    validate: true,
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
      typ: undefined,
      startCislo: undefined,
      kod: undefined,
      mladistvyPotvrzen: undefined
    },
    platby: [],
    ubytovani: {}
  };
  deepFreeze(form);
  const { rocniky } = ucastniciTestData.entities;

  expect(inputValid({ name: 'udaje.prijmeni', value: form.udaje.prijmeni, form })).toEqual('error');
  expect(inputValid({ name: 'udaje.jmeno', value: form.udaje.jmeno, form })).toEqual('error');
  expect(inputValid({ name: 'udaje.narozeni', value: form.udaje.narozeni, form })).toEqual('error');
  expect(inputValid({ name: 'udaje.pohlavi', value: form.udaje.pohlavi, form })).toEqual('error');
  expect(inputValid({ name: 'udaje.adresa', value: form.udaje.adresa, form })).toBe(undefined);
  expect(inputValid({ name: 'udaje.obec', value: form.udaje.obec, form })).toEqual('error');
  expect(inputValid({ name: 'udaje.psc', value: form.udaje.psc, form })).toEqual('error');
  expect(inputValid({ name: 'udaje.stat', value: form.udaje.stat, form })).toEqual('success');
  expect(inputValid({ name: 'udaje.klub', value: form.udaje.klub, form })).toBe(undefined);
  expect(inputValid({ name: 'udaje.telefon', value: form.udaje.telefon, form })).toBe(undefined);
  expect(inputValid({ name: 'udaje.email', value: form.udaje.email, form })).toBe(undefined);
  expect(inputValid({ name: 'prihlaska.datum', value: form.prihlaska.datum, form })).toEqual(
    'error'
  );
  expect(
    inputValid({ name: 'prihlaska.kategorie', value: form.prihlaska.kategorie, form })
  ).toEqual('error');
  expect(inputValid({ name: 'prihlaska.typ', value: form.prihlaska.typ, form })).toEqual('error');
  expect(inputValid({ name: 'prihlaska.startCislo', value: form.prihlaska.startCislo, form })).toBe(
    undefined
  );
  expect(inputValid({ name: 'prihlaska.kod', value: form.prihlaska.kod, form })).toBe(undefined);
  expect(
    inputValid({
      name: 'prihlaska.mladistvyPotvrzen',
      value: form.prihlaska.mladistvyPotvrzen,
      form,
      rocniky
    })
  ).toBe(undefined);
  expect(formErrors({ form, rocniky })).toEqual([
    { name: 'udaje.prijmeni', value: undefined },
    { name: 'udaje.jmeno', value: undefined },
    { name: 'udaje.narozeni', value: { den: undefined, mesic: undefined, rok: undefined } },
    { name: 'udaje.pohlavi', value: undefined },
    { name: 'udaje.obec', value: undefined },
    { name: 'udaje.psc', value: undefined },
    { name: 'prihlaska.datum', value: undefined },
    { name: 'prihlaska.kategorie', value: undefined },
    { name: 'prihlaska.typ', value: undefined }
  ]);
  expect(isInputEnabled({ name: 'prihlaska.startCislo', form, rocniky })).toBe(false);
  expect(isInputEnabled({ name: 'ubytovani.pátek', form, rocniky })).toBe(true);
});

it('validation of some invalid state [validate === false]', () => {
  const form = {
    validate: false,
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
      typ: undefined,
      startCislo: 'aha',
      kod: '===kód===',
      mladistvyPotvrzen: false
    },
    platby: [{ castka: 220, datum: new Date(), typ: 'převodem' }],
    ubytovani: { pátek: { prihlaseno: false, prespano: true } }
  };
  deepFreeze(form);
  const { rocniky } = ucastniciTestData.entities;

  expect(inputValid({ name: 'udaje.prijmeni', value: form.udaje.prijmeni, form })).toEqual('error');
  expect(inputValid({ name: 'udaje.jmeno', value: form.udaje.jmeno, form })).toBe(undefined);
  expect(inputValid({ name: 'udaje.narozeni', value: form.udaje.narozeni, form })).toEqual('error');
  expect(inputValid({ name: 'udaje.pohlavi', value: form.udaje.pohlavi, form })).toEqual('success');
  expect(inputValid({ name: 'udaje.adresa', value: form.udaje.adresa, form })).toBe(undefined);
  expect(inputValid({ name: 'udaje.obec', value: form.udaje.obec, form })).toEqual('success');
  expect(inputValid({ name: 'udaje.psc', value: form.udaje.psc, form })).toBe(undefined);
  expect(inputValid({ name: 'udaje.stat', value: form.udaje.stat, form })).toEqual('success');
  expect(inputValid({ name: 'udaje.klub', value: form.udaje.klub, form })).toBe(undefined);
  expect(inputValid({ name: 'udaje.telefon', value: form.udaje.telefon, form })).toBe(undefined);
  expect(inputValid({ name: 'udaje.email', value: form.udaje.email, form })).toBe(undefined);
  expect(inputValid({ name: 'prihlaska.datum', value: form.prihlaska.datum, form })).toEqual(
    'success'
  );
  expect(inputValid({ name: 'prihlaska.kategorie', value: form.prihlaska.kategorie, form })).toBe(
    undefined
  );
  expect(inputValid({ name: 'prihlaska.typ', value: form.prihlaska.typ, form })).toBe(undefined);
  expect(
    inputValid({ name: 'prihlaska.startCislo', value: form.prihlaska.startCislo, form })
  ).toEqual('error');
  expect(inputValid({ name: 'prihlaska.kod', value: form.prihlaska.kod, form })).toBe(undefined);
  expect(
    inputValid({
      name: 'prihlaska.mladistvyPotvrzen',
      value: form.prihlaska.mladistvyPotvrzen,
      form,
      rocniky
    })
  ).toBe(undefined);
  expect(formErrors({ form, rocniky })).toEqual([
    { name: 'udaje.prijmeni', value: '' },
    { name: 'udaje.narozeni', value: { den: undefined, mesic: undefined, rok: 'žblabuňka' } },
    { name: 'prihlaska.startCislo', value: 'aha' }
  ]);
  expect(isInputEnabled({ name: 'prihlaska.startCislo', form, rocniky })).toBe(false);
  expect(isInputEnabled({ name: 'ubytovani.pátek', form, rocniky })).toBe(false);
  expect(isInputVisible({ name: 'ubytovani.pátek', form, rocniky })).toBe(true);
  expect(isInputVisible({ name: 'ubytovani.sobota', form, rocniky })).toBe(false);
});

it('validation of some invalid state [validate === true]', () => {
  const form = {
    validate: true,
    udaje: {
      prijmeni: '',
      jmeno: undefined,
      narozeni: { den: 1, mesic: 10, rok: 'žblabuňka' },
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
      typ: undefined,
      startCislo: 'oho12',
      kod: '===kód===',
      mladistvyPotvrzen: true
    },
    platby: [{ castka: 200, datum: '3. 1. 2015', typ: 'převodem' }],
    ubytovani: { pátek: { prihlaseno: true } }
  };
  deepFreeze(form);
  const { rocniky } = ucastniciTestData.entities;

  expect(inputValid({ name: 'udaje.prijmeni', value: form.udaje.prijmeni, form, rocniky })).toEqual(
    'error'
  );
  expect(inputValid({ name: 'udaje.jmeno', value: form.udaje.jmeno, form })).toEqual('error');
  expect(inputValid({ name: 'udaje.narozeni', value: form.udaje.narozeni, form })).toEqual('error');
  expect(inputValid({ name: 'udaje.pohlavi', value: form.udaje.pohlavi, form })).toEqual('success');
  expect(inputValid({ name: 'udaje.adresa', value: form.udaje.adresa, form })).toBe(undefined);
  expect(inputValid({ name: 'udaje.obec', value: form.udaje.obec, form })).toEqual('success');
  expect(inputValid({ name: 'udaje.psc', value: form.udaje.psc, form })).toEqual('error');
  expect(inputValid({ name: 'udaje.stat', value: form.udaje.stat, form })).toEqual('success');
  expect(inputValid({ name: 'udaje.klub', value: form.udaje.klub, form })).toBe(undefined);
  expect(inputValid({ name: 'udaje.telefon', value: form.udaje.telefon, form })).toBe(undefined);
  expect(inputValid({ name: 'udaje.email', value: form.udaje.email, form })).toBe(undefined);
  expect(inputValid({ name: 'prihlaska.datum', value: form.prihlaska.datum, form })).toEqual(
    'success'
  );
  expect(
    inputValid({ name: 'prihlaska.kategorie', value: form.prihlaska.kategorie, form })
  ).toEqual('error');
  expect(inputValid({ name: 'prihlaska.typ', value: form.prihlaska.typ, form })).toEqual('error');
  expect(
    inputValid({ name: 'prihlaska.startCislo', value: form.prihlaska.startCislo, form })
  ).toEqual('error');
  expect(inputValid({ name: 'prihlaska.kod', value: form.prihlaska.kod, form })).toBe(undefined);
  expect(
    inputValid({
      name: 'prihlaska.mladistvyPotvrzen',
      value: form.prihlaska.mladistvyPotvrzen,
      form,
      rocniky
    })
  ).toBe(undefined);
  expect(formErrors({ form, rocniky })).toEqual([
    { name: 'udaje.prijmeni', value: '' },
    { name: 'udaje.jmeno', value: undefined },
    { name: 'udaje.narozeni', value: { den: 1, mesic: 10, rok: 'žblabuňka' } },
    { name: 'udaje.psc', value: undefined },
    { name: 'prihlaska.kategorie', value: undefined },
    { name: 'prihlaska.typ', value: undefined },
    { name: 'prihlaska.startCislo', value: 'oho12' }
  ]);
  expect(isInputEnabled({ name: 'prihlaska.startCislo', form, rocniky })).toBe(false);
  expect(isInputEnabled({ name: 'ubytovani.pátek', form, rocniky })).toBe(true);
  expect(isInputVisible({ name: 'ubytovani.pátek', form, rocniky })).toBe(true);
  expect(isInputVisible({ name: 'ubytovani.sobota', form, rocniky })).toBe(false);
});

it('validate()', () => {
  const stateBefore = {};
  const stateAfter = { validate: true };
  deepFreeze(stateBefore);

  expect(prihlaskyFormReducer(stateBefore, validate())).toEqual(stateAfter);
});

it('validationError()', () => {
  const stateBefore = {};
  const stateAfter = {
    ...stateBefore,
    showError: true,
    errorCode: 'nejde uložit',
    errorMessage: 'Přihláška nejde uložit. Povinná pole nejsou vyplněna.'
  };
  deepFreeze(stateBefore);

  expect(prihlaskyFormReducer(stateBefore, validationError())).toEqual(stateAfter);
});

it('udaje.pohlavi - nahodí ženu', () => {
  const stateBefore = { udaje: { pohlavi: undefined } };
  deepFreeze(stateBefore);
  const stateAfter = {
    udaje: { prijmeni: 'Sukdoláková', pohlavi: 'žena' },
    prihlaska: { kategorie: undefined }
  };

  expect(
    prihlaskyFormReducer(
      stateBefore,
      inputChanged('udaje.prijmeni', { target: { value: 'Sukdoláková' } })
    )
  ).toEqual(stateAfter);
});

it('udaje.pohlavi - už nahodí ženu, též reset kategorie', () => {
  const stateBefore = {
    udaje: { narozeni: { rok: 1990 }, prijmeni: 'Mala', pohlavi: 'muž' },
    prihlaska: { kategorie: '5a587e1a051c181132cf83b8', typ: 'maraton' }
  };
  deepFreeze(stateBefore);
  const stateAfter = {
    udaje: { narozeni: { rok: 1990 }, prijmeni: 'Malová', pohlavi: 'muž' },
    prihlaska: { kategorie: undefined, typ: 'maraton' }
  };

  expect(
    prihlaskyFormReducer(
      stateBefore,
      inputChanged('udaje.prijmeni', { target: { value: 'Malová' } })
    )
  ).toEqual(stateAfter);
});

it('udaje.narozeni - prázdné', () => {
  const stateBefore = {
    validate: false,
    udaje: { narozeni: { den: undefined, mesic: undefined, rok: undefined } },
    prihlaska: {}
  };
  deepFreeze(stateBefore);
  const stateAfter = {
    validate: false,
    udaje: { narozeni: { den: undefined, mesic: undefined, rok: '' } },
    prihlaska: {}
  };

  expect(
    prihlaskyFormReducer(stateBefore, inputChanged('udaje.narozeni', { target: { value: '' } }))
  ).toEqual(stateAfter);
  expect(
    inputValid({ name: 'udaje.narozeni', value: stateBefore.udaje.narozeni, form: stateBefore })
  ).toBe(undefined);
  expect(
    inputValid({ name: 'udaje.narozeni', value: stateAfter.udaje.narozeni, form: stateAfter })
  ).toEqual('error');
});

it('udaje.narozeni - neúplné', () => {
  const stateBefore = {
    validate: false,
    udaje: { narozeni: { den: undefined, mesic: undefined, rok: undefined } },
    prihlaska: {}
  };
  deepFreeze(stateBefore);
  const stateAfter = {
    validate: false,
    udaje: { narozeni: { den: undefined, mesic: undefined, rok: '1. ' } },
    prihlaska: {}
  };

  expect(
    prihlaskyFormReducer(stateBefore, inputChanged('udaje.narozeni', { target: { value: '1. ' } }))
  ).toEqual(stateAfter);
  expect(
    inputValid({ name: 'udaje.narozeni', value: stateBefore.udaje.narozeni, form: stateBefore })
  ).toBe(undefined);
  expect(
    inputValid({ name: 'udaje.narozeni', value: stateAfter.udaje.narozeni, form: stateAfter })
  ).toEqual('error');
});

it('udaje.narozeni - jen rok', () => {
  const stateBefore = {
    validate: false,
    udaje: { narozeni: { den: undefined, mesic: undefined, rok: '197' } },
    prihlaska: {}
  };
  deepFreeze(stateBefore);
  const stateAfter = {
    validate: false,
    udaje: { narozeni: { den: undefined, mesic: undefined, rok: 1978 } },
    prihlaska: {}
  };

  expect(
    prihlaskyFormReducer(stateBefore, inputChanged('udaje.narozeni', { target: { value: '1978' } }))
  ).toEqual(stateAfter);
  expect(
    inputValid({ name: 'udaje.narozeni', value: stateBefore.udaje.narozeni, form: stateBefore })
  ).toEqual('error');
  expect(
    inputValid({ name: 'udaje.narozeni', value: stateAfter.udaje.narozeni, form: stateAfter })
  ).toEqual('warning');
});

it('udaje.narozeni - celé', () => {
  const stateBefore = {
    validate: false,
    udaje: { narozeni: { den: undefined, mesic: undefined, rok: '1.7.196' } },
    prihlaska: {}
  };
  deepFreeze(stateBefore);
  const stateAfter = {
    validate: false,
    udaje: { narozeni: { den: 1, mesic: 7, rok: 1967 } },
    prihlaska: {}
  };

  expect(
    prihlaskyFormReducer(
      stateBefore,
      inputChanged('udaje.narozeni', { target: { value: '1.7.1967' } })
    )
  ).toEqual(stateAfter);
  expect(
    inputValid({ name: 'udaje.narozeni', value: stateBefore.udaje.narozeni, form: stateBefore })
  ).toEqual('error');
  expect(
    inputValid({ name: 'udaje.narozeni', value: stateAfter.udaje.narozeni, form: stateAfter })
  ).toEqual('success');
});

it('udaje.narozeni - reset kategorie a mladistvyPotvrzen', () => {
  const stateBefore = {
    validate: false,
    udaje: { narozeni: { den: undefined, mesic: undefined, rok: 2008 }, pohlavi: 'muž' },
    prihlaska: { kategorie: '5a587e1a051c181132cf83b8', mladistvyPotvrzen: true, typ: 'maraton' }
  };
  deepFreeze(stateBefore);
  const stateAfter = {
    validate: false,
    udaje: { narozeni: { den: undefined, mesic: undefined, rok: 1978 }, pohlavi: 'muž' },
    prihlaska: { kategorie: undefined, mladistvyPotvrzen: undefined, typ: 'maraton' }
  };
  const { rocniky } = ucastniciTestData.entities;

  expect(
    prihlaskyFormReducer(stateBefore, inputChanged('udaje.narozeni', { target: { value: '1978' } }))
  ).toEqual(stateAfter);
  expect(
    inputValid({
      name: 'prihlaska.mladistvyPotvrzen',
      value: stateBefore.prihlaska.mladistvyPotvrzen,
      form: stateBefore,
      rocniky
    })
  ).toEqual('success');
  expect(
    inputValid({
      name: 'prihlaska.mladistvyPotvrzen',
      value: stateAfter.prihlaska.mladistvyPotvrzen,
      form: stateAfter,
      rocniky
    })
  ).toBe(undefined);
});

it('prihlaska.datum - přihlášky', () => {
  const name = 'prihlaska.datum';
  const form = { jePrihlaskou: true, prihlaska: { datum: undefined } };
  const { rocniky } = ucastniciTestData.entities;

  expect(isInputEnabled({ name, form, rocniky })).toBe(true);
  expect(getValue({ name, form })).toBe(undefined);
});

it('prihlaska.datum - dohlášky', () => {
  const name = 'prihlaska.datum';
  const stateBefore = { jePrihlaskou: undefined, prihlaska: { datum: undefined } };
  deepFreeze(stateBefore);
  const { rocniky } = ucastniciTestData.entities;

  const stateAfter = dohlaskyFormReducer(
    stateBefore,
    createReset({ actionPrefix: 'DOHLASKY' })({ rocniky })
  );
  expect(stateAfter.jePrihlaskou).toBe(false);
  expect(isInputEnabled({ name, form: stateAfter, rocniky })).toBe(false);
  expect(getValue({ name, form: stateAfter })).toEqual(new Date('2018-06-09').toJSON());
});

it('prihlaska.datum - neúplné', () => {
  const stateBefore = { prihlaska: { datum: undefined } };
  deepFreeze(stateBefore);
  const stateAfter = { prihlaska: { datum: '1. 7. 201' } };

  expect(
    prihlaskyFormReducer(
      stateBefore,
      inputChanged('prihlaska.datum', { target: { value: '1. 7. 201' } })
    )
  ).toEqual(stateAfter);
  expect(
    inputValid({ name: 'prihlaska.datum', value: stateAfter.prihlaska.datum, form: stateAfter })
  ).toEqual('error');
});

it('prihlaska.datum - formát 1', () => {
  const stateBefore = { prihlaska: { datum: '1. 7. 201' } };
  deepFreeze(stateBefore);
  const stateAfter = { prihlaska: { datum: '2017-07-01T00:00:00.000Z' } };

  expect(
    prihlaskyFormReducer(
      stateBefore,
      inputChanged('prihlaska.datum', { target: { value: '1. 7. 2017' } })
    )
  ).toEqual(stateAfter);
  expect(
    inputValid({ name: 'prihlaska.datum', value: stateAfter.prihlaska.datum, form: stateAfter })
  ).toEqual('success');
  expect(formatValue({ name: 'prihlaska.datum', rawValue: stateAfter.prihlaska.datum })).toEqual(
    '1. 7. 2017'
  );
});

it('prihlaska.datum - formát 2', () => {
  const stateBefore = { prihlaska: { datum: '1.7.201' } };
  deepFreeze(stateBefore);
  const stateAfter = { prihlaska: { datum: '2017-07-01T00:00:00.000Z' } };

  expect(
    prihlaskyFormReducer(
      stateBefore,
      inputChanged('prihlaska.datum', { target: { value: '1.7.2017' } })
    )
  ).toEqual(stateAfter);
  expect(
    inputValid({ name: 'prihlaska.datum', value: stateAfter.prihlaska.datum, form: stateAfter })
  ).toEqual('success');
  expect(formatValue({ name: 'prihlaska.datum', rawValue: stateAfter.prihlaska.datum })).toEqual(
    '1. 7. 2017'
  );
});

it('prihlaska.typ - není pohlaví', () => {
  const state = {
    ...ucastniciTestData,
    registrator: {
      prihlasky: {
        form: {
          udaje: { narozeni: { den: undefined, mesic: undefined, rok: 1981 }, pohlavi: undefined },
          prihlaska: {}
        }
      }
    }
  };
  const { form } = state.registrator.prihlasky;
  const { kategorie, rocniky } = state.entities;
  const selected = [
    { key: 'maraton', value: { typ: 'maraton' } },
    { key: 'půlmaraton', value: { typ: 'půlmaraton' } },
    { key: 'cyklo', value: { typ: 'cyklo' } },
    { key: 'koloběžka', value: { typ: 'koloběžka' } },
    { key: 'pěší', id: '5a587e1a051c181132cf83b1', value: { typ: 'pěší' } }
  ];

  expect(inputOptions({ name: 'prihlaska.typ', form, kategorie, rocniky })).toEqual(selected);
});

it('prihlaska.typ - není narození', () => {
  const state = {
    ...ucastniciTestData,
    registrator: {
      prihlasky: {
        form: {
          udaje: {
            narozeni: { den: undefined, mesic: undefined, rok: undefined },
            pohlavi: 'žena'
          },
          prihlaska: {}
        }
      }
    }
  };
  const { form } = state.registrator.prihlasky;
  const { kategorie, rocniky } = state.entities;
  const selected = [
    { key: 'maraton', value: { typ: 'maraton' } },
    { key: 'půlmaraton', value: { typ: 'půlmaraton' } },
    { key: 'cyklo', value: { typ: 'cyklo' } },
    {
      key: 'koloběžka',
      id: '5a587e1b051c181132cf83d0',
      value: { pohlavi: 'žena', typ: 'koloběžka', vek: { min: 18, max: 150 } }
    },
    { key: 'pěší', id: '5a587e1a051c181132cf83b1', value: { typ: 'pěší' } }
  ];

  expect(inputOptions({ name: 'prihlaska.typ', form, kategorie, rocniky })).toEqual(selected);
});

it('prihlaska.typ - muž', () => {
  const state = {
    ...ucastniciTestData,
    registrator: {
      prihlasky: {
        form: {
          udaje: { narozeni: { den: undefined, mesic: undefined, rok: 1981 }, pohlavi: 'muž' },
          prihlaska: {}
        }
      }
    }
  };
  const { form } = state.registrator.prihlasky;
  const { kategorie, rocniky } = state.entities;
  const selected = [
    {
      key: 'maraton',
      id: '5a587e1a051c181132cf83b8',
      value: { pohlavi: 'muž', typ: 'maraton', vek: { min: 18, max: 39 } }
    },
    {
      key: 'půlmaraton',
      id: '5a587e1b051c181132cf83d3',
      value: { pohlavi: 'muž', typ: 'půlmaraton', vek: { min: 18, max: 39 } }
    },
    {
      key: 'cyklo',
      id: '5a587e1a051c181132cf83b9',
      value: { pohlavi: 'muž', typ: 'cyklo', vek: { min: 36, max: 45 } }
    },
    {
      key: 'koloběžka',
      id: '5a587e1b051c181132cf83cf',
      value: { pohlavi: 'muž', typ: 'koloběžka', vek: { min: 18, max: 150 } }
    },
    { key: 'pěší', id: '5a587e1a051c181132cf83b1', value: { typ: 'pěší' } }
  ];

  expect(inputOptions({ name: 'prihlaska.typ', form, kategorie, rocniky })).toEqual(selected);
});

it('prihlaska.typ - nahodí též kategorie', () => {
  const stateBefore = { prihlaska: { typ: undefined } };
  deepFreeze(stateBefore);
  const stateAfter = { prihlaska: { typ: 'maraton', kategorie: '===id===' } };

  expect(
    prihlaskyFormReducer(
      stateBefore,
      inputChanged('prihlaska.typ', { target: { value: 'maraton', id: '===id===' } })
    )
  ).toEqual(stateAfter);
});

it('prihlaska.startCislo - kategorie má čísla', () => {
  const state = {
    ...ucastniciTestData,
    registrator: {
      prihlasky: {
        form: {
          udaje: { narozeni: { den: undefined, mesic: undefined, rok: 1981 }, pohlavi: 'muž' },
          prihlaska: { kategorie: '5a587e1b051c181132cf83d3', typ: 'půlmaraton', startCislo: 45 }
        }
      }
    }
  };
  const { form } = state.registrator.prihlasky;
  const { rocniky } = state.entities;

  expect(isInputEnabled({ name: 'prihlaska.startCislo', form, rocniky })).toBe(true);
  expect(
    formatValue({ name: 'prihlaska.startCislo', rawValue: form.prihlaska.startCislo })
  ).toEqual('45');
  expect(
    inputValid({ name: 'prihlaska.startCislo', value: form.prihlaska.startCislo, form, rocniky })
  ).toEqual('success');
});

it('prihlaska.startCislo - kategorie nemá čísla', () => {
  const state = {
    ...ucastniciTestData,
    registrator: {
      prihlasky: {
        form: {
          udaje: { narozeni: { den: undefined, mesic: undefined, rok: 1981 }, pohlavi: 'muž' },
          prihlaska: { kategorie: '5a587e1a051c181132cf83b1', typ: 'pěší' }
        }
      }
    }
  };
  const { form } = state.registrator.prihlasky;
  const { rocniky } = state.entities;

  expect(isInputEnabled({ name: 'prihlaska.startCislo', form, rocniky })).toBe(false);
  expect(
    formatValue({ name: 'prihlaska.startCislo', rawValue: form.prihlaska.startCislo })
  ).toEqual('');
  expect(
    inputValid({ name: 'prihlaska.startCislo', value: form.prihlaska.startCislo, form, rocniky })
  ).toBe(undefined);
});

it('prihlaska.startCislo - vymazání', () => {
  const stateBefore = { prihlaska: { startCislo: 43 } };
  deepFreeze(stateBefore);
  const stateAfter = { prihlaska: { startCislo: undefined } };

  expect(
    prihlaskyFormReducer(
      stateBefore,
      inputChanged('prihlaska.startCislo', { target: { value: '' } })
    )
  ).toEqual(stateAfter);
  expect(
    inputValid({
      name: 'prihlaska.startCislo',
      value: stateAfter.prihlaska.startCislo,
      form: stateAfter
    })
  ).toBe(undefined);
});

it('prihlaska.startCislo - dohláška - validate: true', () => {
  const form = { prihlaska: { typ: 'maraton', startCislo: undefined }, validate: true };
  const { rocniky } = ucastniciTestData.entities;

  expect(
    inputValid({
      name: 'prihlaska.startCislo',
      value: form.prihlaska.startCislo,
      form,
      rocniky
    })
  ).toBe('error');
});

it('prihlaska.mladistvyPotvrzen - má potvrzení', () => {
  const state = {
    ...ucastniciTestData,
    registrator: {
      prihlasky: {
        form: {
          udaje: { narozeni: { den: undefined, mesic: undefined, rok: 2008 }, pohlavi: 'muž' },
          prihlaska: {
            kategorie: '5a587e1b051c181132cf83d3',
            typ: 'půlmaraton',
            startCislo: 43,
            mladistvyPotvrzen: true
          }
        }
      }
    }
  };
  const { form } = state.registrator.prihlasky;
  const { rocniky } = state.entities;

  expect(isInputEnabled({ name: 'prihlaska.mladistvyPotvrzen', form, rocniky })).toBe(true);
  expect(
    inputValid({
      name: 'prihlaska.mladistvyPotvrzen',
      value: form.prihlaska.mladistvyPotvrzen,
      form,
      rocniky
    })
  ).toEqual('success');
});

it('prihlaska.mladistvyPotvrzen - nemá potvrzení', () => {
  const state = {
    ...ucastniciTestData,
    registrator: {
      prihlasky: {
        form: {
          udaje: { narozeni: { den: undefined, mesic: undefined, rok: 2008 }, pohlavi: 'muž' },
          prihlaska: {
            kategorie: '5a587e1b051c181132cf83d3',
            typ: 'půlmaraton',
            startCislo: 43,
            mladistvyPotvrzen: false
          }
        }
      }
    }
  };
  const { form } = state.registrator.prihlasky;
  const { rocniky } = state.entities;

  expect(isInputEnabled({ name: 'prihlaska.mladistvyPotvrzen', form, rocniky })).toBe(true);
  expect(
    inputValid({
      name: 'prihlaska.mladistvyPotvrzen',
      value: form.prihlaska.mladistvyPotvrzen,
      form,
      rocniky
    })
  ).toEqual('error');
});

it('prihlaska.startovnePoSleve - prázdné', () => {
  const stateBefore = { prihlaska: { startovnePoSleve: 200 } };
  deepFreeze(stateBefore);
  const stateAfter = { prihlaska: { startovnePoSleve: undefined } };

  expect(
    prihlaskyFormReducer(
      stateBefore,
      inputChanged('prihlaska.startovnePoSleve', { target: { value: '' } })
    )
  ).toEqual(stateAfter);
  expect(
    inputValid({
      name: 'prihlaska.startovnePoSleve',
      value: stateAfter.prihlaska.startovnePoSleve,
      form: stateAfter
    })
  ).toBe(undefined);
});

it('prihlaska.startovnePoSleve - číslo', () => {
  const stateBefore = { prihlaska: {} };
  deepFreeze(stateBefore);
  const stateAfter = { prihlaska: { startovnePoSleve: 200 } };

  expect(
    prihlaskyFormReducer(
      stateBefore,
      inputChanged('prihlaska.startovnePoSleve', { target: { value: '200' } })
    )
  ).toEqual(stateAfter);
  expect(
    inputValid({
      name: 'prihlaska.startovnePoSleve',
      value: stateAfter.prihlaska.startovnePoSleve,
      form: stateAfter
    })
  ).toEqual('success');
});

it('prihlaska.startovnePoSleve - invalid', () => {
  const stateBefore = { prihlaska: {} };
  deepFreeze(stateBefore);
  const stateAfter = { prihlaska: { startovnePoSleve: 'kudy tudy' } };

  expect(
    prihlaskyFormReducer(
      stateBefore,
      inputChanged('prihlaska.startovnePoSleve', { target: { value: 'kudy tudy' } })
    )
  ).toEqual(stateAfter);
  expect(
    inputValid({
      name: 'prihlaska.startovnePoSleve',
      value: stateAfter.prihlaska.startovnePoSleve,
      form: stateAfter
    })
  ).toEqual('error');
});

it('ubytovani - přespáno', () => {
  const stateBefore = { ubytovani: {} };
  deepFreeze(stateBefore);
  const stateAfter = { ubytovani: { pátek: { prihlaseno: true } } };

  expect(
    prihlaskyFormReducer(
      stateBefore,
      inputChanged('ubytovani.pátek', { target: { checked: 'on', type: 'checkbox' } })
    )
  ).toEqual(stateAfter);
  expect(getValue({ name: 'ubytovani.pátek', form: stateAfter })).toBe(true);
  expect(getValue({ name: 'ubytovani.sobota', form: stateAfter })).toBe(false);
});

it('ubytovani - nepřespáno', () => {
  const stateBefore = { ubytovani: { pátek: { prihlaseno: true } } };
  deepFreeze(stateBefore);
  const stateAfter = { ubytovani: {} };

  expect(
    prihlaskyFormReducer(
      stateBefore,
      inputChanged('ubytovani.pátek', { target: { checked: '', type: 'checkbox' } })
    )
  ).toEqual(stateAfter);
  expect(getValue({ name: 'ubytovani.pátek', form: stateAfter })).toBe(false);
});

it('loadUcastnik() - údaje i přihláška', () => {
  const stateBefore = {
    udaje: {
      prijmeni: 'Příjmení',
      jmeno: 'Jméno',
      narozeni: { den: 1, mesic: 10, rok: 'žblabuňka' },
      pohlavi: 'muž',
      adresa: 'Za vodou 4787',
      obec: 'Kolešov',
      psc: '321 34',
      stat: 'Česká republika',
      klub: 'Hory hory hory',
      email: 'není',
      telefon: '765 123 089'
    },
    prihlaska: {
      datum: '1. 12. 2017',
      kategorie: '===k1===',
      typ: 'maraton',
      startCislo: 14,
      kod: '===kód===',
      mladistvyPotvrzen: undefined
    }
  };
  const stateAfter = {
    errorCode: '',
    errorMessage: '',
    jePrihlaskou: true,
    showError: false,
    saved: false,
    saving: false,
    ucastnikId: '5a09b1fd371dec1e99b7e1c9',
    validate: false,
    udaje: {
      prijmeni: 'Balabák',
      jmeno: 'Roman',
      narozeni: { rok: 1956 },
      pohlavi: 'muž',
      obec: 'Ostrava 2',
      stat: 'Česká republika'
    },
    prihlaska: {
      datum: '2018-06-09T00:00:00.000Z',
      kategorie: '5a587e1b051c181132cf83d7',
      typ: 'půlmaraton',
      startCislo: 17,
      kod: '10728864'
    },
    platby: [{ castka: 250, datum: '2018-06-09T00:00:00.000Z', typ: 'hotově' }],
    ubytovani: { pátek: { prihlaseno: true, prespano: true } }
  };
  deepFreeze(stateBefore);

  expect(
    prihlaskyFormReducer(
      stateBefore,
      loadUcastnik({ id: '5a09b1fd371dec1e99b7e1c9', ...ucastniciTestData.entities })
    )
  ).toEqual(stateAfter);
});

it('loadUcastnik() - jen údaje', () => {
  const stateBefore = {
    udaje: {
      prijmeni: 'Příjmení',
      jmeno: 'Jméno',
      narozeni: { den: 1, mesic: 10, rok: 'žblabuňka' },
      pohlavi: 'muž',
      adresa: 'Za vodou 4787',
      obec: 'Kolešov',
      psc: '321 34',
      stat: 'Česká republika',
      klub: 'Hory hory hory',
      email: 'není',
      telefon: '765 123 089'
    },
    prihlaska: {
      datum: '1. 12. 2017',
      kategorie: '===k1===',
      typ: 'maraton',
      startCislo: 14,
      kod: '===kód===',
      mladistvyPotvrzen: undefined
    }
  };
  const stateAfter = {
    errorCode: '',
    errorMessage: '',
    jePrihlaskou: true,
    showError: false,
    saved: false,
    saving: false,
    ucastnikId: '6f09b1fd371dec1e99b7e1c9',
    validate: false,
    udaje: {
      prijmeni: 'Sukdoláková',
      jmeno: 'Martina',
      narozeni: { rok: 1963, mesic: 12, den: 7 },
      pohlavi: 'žena',
      obec: 'Zlín',
      stat: 'Česká republika'
    },
    prihlaska: {
      datum: undefined,
      kategorie: undefined,
      typ: undefined,
      startCislo: undefined,
      kod: undefined
    },
    platby: [],
    ubytovani: {}
  };
  deepFreeze(stateBefore);

  expect(
    prihlaskyFormReducer(
      stateBefore,
      loadUcastnik({ id: '6f09b1fd371dec1e99b7e1c9', ...ucastniciTestData.entities })
    )
  ).toEqual(stateAfter);
});

it('fetchRocnikySuccess - přihláška', () => {
  const stateBefore = { jePrihlaskou: true, prihlaska: { datum: undefined } };
  const stateAfter = { jePrihlaskou: true, prihlaska: { datum: undefined } };
  deepFreeze(stateBefore);

  const json = { response: { rocniky: ucastniciTestData.entities.rocniky.byRoky } };
  expect(prihlaskyFormReducer(stateBefore, fetchRocnikySuccess(json))).toEqual(stateAfter);
});

it('fetchRocnikySuccess - dohláška', () => {
  const stateBefore = { prihlaska: { datum: undefined } };
  const stateAfter = { prihlaska: { datum: '2018-06-09T00:00:00.000Z' } };
  deepFreeze(stateBefore);

  const json = { response: { rocniky: ucastniciTestData.entities.rocniky.byRoky } };
  expect(dohlaskyFormReducer(stateBefore, fetchRocnikySuccess(json))).toEqual(stateAfter);
});

it('predepsaneStartovne - cyklo - přihláška předem', () => {
  const state = {
    ...ucastniciTestData,
    registrator: {
      prihlasky: {
        form: {
          prihlaska: {
            datum: '2018-05-23T00:00:00.000Z',
            typ: 'cyklo'
          }
        }
      }
    }
  };
  const selected = {
    polozky: [{ castka: 200, duvod: 'předem' }, { castka: 20, duvod: 'záloha' }],
    suma: 220
  };
  expect(
    predepsaneStartovne({
      jePrihlaskou: true,
      kategorie: state.entities.kategorie,
      prihlaska: state.registrator.prihlasky.form.prihlaska,
      rocniky: state.entities.rocniky
    })
  ).toEqual(selected);
});

it('predepsaneStartovne - půlmaraton - platba předem', () => {
  const state = {
    ...ucastniciTestData,
    registrator: {
      prihlasky: {
        form: {
          prihlaska: {
            datum: '2018-04-22',
            kategorie: '5a587e1b051c181132cf83d4'
          },
          platby: [{ castka: 200, datum: '2018-05-30T00:00:00.000Z', typ: 'převodem' }]
        }
      }
    }
  };
  const selected = { polozky: [{ castka: 200, duvod: 'předem' }], suma: 200 };
  expect(
    predepsaneStartovne({
      kategorie: state.entities.kategorie,
      platby: state.registrator.prihlasky.form.platby,
      prihlaska: state.registrator.prihlasky.form.prihlaska,
      rocniky: state.entities.rocniky
    })
  ).toEqual(selected);
});

it('addPlatba()', () => {
  const stateBefore = {
    platby: [
      { castka: 250, datum: '2018-06-09T00:00:00.000Z', typ: 'hotově' },
      { castka: 20, datum: '2018-06-09T00:00:00.000Z', typ: 'hotově' }
    ]
  };
  const stateAfter = {
    platby: [
      { castka: 133, datum: '2018-05-13T00:00:00.000Z', typ: 'převodem' },
      { castka: 250, datum: '2018-06-09T00:00:00.000Z', typ: 'hotově' },
      { castka: 20, datum: '2018-06-09T00:00:00.000Z', typ: 'hotově' }
    ]
  };
  deepFreeze(stateBefore);

  expect(
    prihlaskyFormReducer(
      stateBefore,
      addPlatba({ castka: '133', datum: '2018-05-13T00:00:00.000Z', typ: 'převodem' })
    )
  ).toEqual(stateAfter);
});

it('removePlatba()', () => {
  const stateBefore = {
    platby: [
      { castka: 133, datum: '2018-05-13T00:00:00.000Z', typ: 'převodem' },
      { castka: 250, datum: '2018-06-09T00:00:00.000Z', typ: 'hotově' },
      { castka: 20, datum: '2018-06-09T00:00:00.000Z', typ: 'hotově' }
    ]
  };
  const stateAfter0 = {
    platby: [
      { castka: 250, datum: '2018-06-09T00:00:00.000Z', typ: 'hotově' },
      { castka: 20, datum: '2018-06-09T00:00:00.000Z', typ: 'hotově' }
    ]
  };
  const stateAfter2 = {
    platby: [
      { castka: 133, datum: '2018-05-13T00:00:00.000Z', typ: 'převodem' },
      { castka: 250, datum: '2018-06-09T00:00:00.000Z', typ: 'hotově' }
    ]
  };
  deepFreeze(stateBefore);

  expect(prihlaskyFormReducer(stateBefore, removePlatba(0))).toEqual(stateAfter0);
  expect(prihlaskyFormReducer(stateBefore, removePlatba(2))).toEqual(stateAfter2);
});
