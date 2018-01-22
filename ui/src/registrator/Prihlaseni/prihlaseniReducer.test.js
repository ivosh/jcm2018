import deepFreeze from 'deep-freeze';
import ucastniciTestData from '../../entities/ucastnici/ucastniciTestData';
import {
  hideError,
  inputChanged,
  reset,
  saveUcastRequest,
  saveUcastSuccess,
  saveUcastError
} from './PrihlaseniActions';
import prihlaseniReducer, {
  formatValue,
  inputValid,
  prihlaseniValid,
  radioInputOptions
} from './prihlaseniReducer';

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
    typKategorie: undefined,
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
      typKategorie: 'maraton',
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
      typKategorie: undefined,
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
      typKategorie: undefined,
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
  expect(inputValid('prihlaska.typKategorie', state.prihlaska.typKategorie, state)).toBe(undefined);
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
      typKategorie: undefined,
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
  expect(inputValid('prihlaska.typKategorie', state.prihlaska.typKategorie, state)).toEqual(
    'error'
  );
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
      typKategorie: undefined,
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
  expect(inputValid('prihlaska.typKategorie', state.prihlaska.typKategorie, state)).toBe(undefined);
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
      typKategorie: undefined,
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
  expect(inputValid('prihlaska.typKategorie', state.prihlaska.typKategorie, state)).toEqual(
    'error'
  );
  expect(inputValid('prihlaska.startCislo', state.prihlaska.startCislo, state)).toBe(undefined);
  expect(inputValid('prihlaska.kod', state.prihlaska.kod, state)).toBe(undefined);
  expect(prihlaseniValid(state)).toBe(false);
});

it('udaje.pohlavi - nahodí ženu', () => {
  const stateBefore = { udaje: { pohlavi: undefined } };
  deepFreeze(stateBefore);
  const stateAfter = { udaje: { prijmeni: 'Sukdoláková', pohlavi: 'žena' } };

  expect(
    prihlaseniReducer(
      stateBefore,
      inputChanged('udaje.prijmeni', { target: { value: 'Sukdoláková' } })
    )
  ).toEqual(stateAfter);
});

it('udaje.pohlavi - už nahodí ženu', () => {
  const stateBefore = { udaje: { prijmeni: 'Mala', pohlavi: 'muž' } };
  deepFreeze(stateBefore);
  const stateAfter = { udaje: { prijmeni: 'Malová', pohlavi: 'muž' } };

  expect(
    prihlaseniReducer(stateBefore, inputChanged('udaje.prijmeni', { target: { value: 'Malová' } }))
  ).toEqual(stateAfter);
});

it('udaje.narozeni - prázdné', () => {
  const stateBefore = {
    validateEmpty: false,
    udaje: { narozeni: { den: undefined, mesic: undefined, rok: undefined } }
  };
  deepFreeze(stateBefore);
  const stateAfter = {
    validateEmpty: false,
    udaje: { narozeni: { den: undefined, mesic: undefined, rok: '' } }
  };

  expect(
    prihlaseniReducer(stateBefore, inputChanged('udaje.narozeni', { target: { value: '' } }))
  ).toEqual(stateAfter);
  expect(inputValid('udaje.narozeni', stateBefore.udaje.narozeni, stateBefore)).toBe(undefined);
  expect(inputValid('udaje.narozeni', stateAfter.udaje.narozeni, stateAfter)).toEqual('error');
});

it('udaje.narozeni - neúplné', () => {
  const stateBefore = {
    validateEmpty: false,
    udaje: { narozeni: { den: undefined, mesic: undefined, rok: undefined } }
  };
  deepFreeze(stateBefore);
  const stateAfter = {
    validateEmpty: false,
    udaje: { narozeni: { den: undefined, mesic: undefined, rok: '1. ' } }
  };

  expect(
    prihlaseniReducer(stateBefore, inputChanged('udaje.narozeni', { target: { value: '1. ' } }))
  ).toEqual(stateAfter);
  expect(inputValid('udaje.narozeni', stateBefore.udaje.narozeni, stateBefore)).toBe(undefined);
  expect(inputValid('udaje.narozeni', stateAfter.udaje.narozeni, stateAfter)).toEqual('error');
});

it('udaje.narozeni - jen rok', () => {
  const stateBefore = {
    validateEmpty: false,
    udaje: { narozeni: { den: undefined, mesic: undefined, rok: '197' } }
  };
  deepFreeze(stateBefore);
  const stateAfter = {
    validateEmpty: false,
    udaje: { narozeni: { den: undefined, mesic: undefined, rok: 1978 } }
  };

  expect(
    prihlaseniReducer(stateBefore, inputChanged('udaje.narozeni', { target: { value: '1978' } }))
  ).toEqual(stateAfter);
  expect(inputValid('udaje.narozeni', stateBefore.udaje.narozeni, stateBefore)).toEqual('error');
  expect(inputValid('udaje.narozeni', stateAfter.udaje.narozeni, stateAfter)).toEqual('warning');
});

it('udaje.narozeni - celé', () => {
  const stateBefore = {
    validateEmpty: false,
    udaje: { narozeni: { den: undefined, mesic: undefined, rok: '1.7.196' } }
  };
  deepFreeze(stateBefore);
  const stateAfter = {
    validateEmpty: false,
    udaje: { narozeni: { den: 1, mesic: 7, rok: 1967 } }
  };

  expect(
    prihlaseniReducer(
      stateBefore,
      inputChanged('udaje.narozeni', { target: { value: '1.7.1967' } })
    )
  ).toEqual(stateAfter);
  expect(inputValid('udaje.narozeni', stateBefore.udaje.narozeni, stateBefore)).toEqual('error');
  expect(inputValid('udaje.narozeni', stateAfter.udaje.narozeni, stateAfter)).toEqual('success');
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
  expect(inputValid('prihlaska.datum', stateAfter.prihlaska.datum, stateAfter)).toEqual('error');
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
  expect(inputValid('prihlaska.datum', stateAfter.prihlaska.datum, stateAfter)).toEqual('success');
  expect(formatValue('prihlaska.datum', stateAfter.prihlaska.datum)).toEqual('1. 7. 2017');
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
  expect(inputValid('prihlaska.datum', stateAfter.prihlaska.datum, stateAfter)).toEqual('success');
  expect(formatValue('prihlaska.datum', stateAfter.prihlaska.datum)).toEqual('1. 7. 2017');
});

it('prihlaska.typKategorie - není pohlaví', () => {
  const state = {
    ...ucastniciTestData,
    registrator: {
      prihlaseni: {
        udaje: { narozeni: { den: undefined, mesic: undefined, rok: 1981 }, pohlavi: undefined }
      }
    }
  };
  const selected = [
    { key: 'maraton', value: 'maraton' },
    { key: 'půlmaraton', value: 'půlmaraton' },
    { key: 'cyklo', value: 'cyklo' },
    { key: 'koloběžka', value: 'koloběžka' },
    { key: 'pěší', value: 'pěší' }
  ];

  expect(
    radioInputOptions(
      'prihlaska.typKategorie',
      state.registrator.prihlaseni,
      state.entities.rocniky
    )
  ).toEqual(selected);
});

it('prihlaska.typKategorie - muž', () => {
  const state = {
    ...ucastniciTestData,
    registrator: {
      prihlaseni: {
        udaje: { narozeni: { den: undefined, mesic: undefined, rok: 1981 }, pohlavi: 'muž' }
      }
    }
  };
  const selected = [
    { key: 'maraton', value: 'maraton - muž - 18-39' },
    { key: 'půlmaraton', value: 'půlmaraton - muž - 18-39' },
    { key: 'cyklo', value: 'cyklo - muž - 36-45' },
    { key: 'koloběžka', value: 'koloběžka - muž - 18 a více' },
    { key: 'pěší', value: 'pěší' }
  ];

  expect(
    radioInputOptions(
      'prihlaska.typKategorie',
      state.registrator.prihlaseni,
      state.entities.rocniky
    )
  ).toEqual(selected);
});
