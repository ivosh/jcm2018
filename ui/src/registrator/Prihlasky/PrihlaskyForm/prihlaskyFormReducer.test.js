import deepFreeze from 'deep-freeze';
import ucastniciTestData from '../../../entities/ucastnici/ucastniciTestData';
import { predepsaneStartovne } from '../../platby';
import {
  addPlatba,
  hideError,
  inputChanged,
  loadUcastnik,
  removePlatba,
  reset,
  saveUcastRequest,
  saveUcastSuccess,
  saveUcastError
} from './PrihlaskyFormActions';
import prihlaskyFormReducer, {
  formatValue,
  formValid,
  inputOptions,
  inputValid,
  isInputEnabled,
  novaPlatbaValid
} from './prihlaskyFormReducer';

const unsuccessfulResponse = {
  code: 'neexistuje',
  status: 'účastník s id ===id=== neexistuje.',
  requestId: '0.9310306652587374'
};

it('na začátku', () => {
  const stateBefore = undefined;

  const stateAfter = prihlaskyFormReducer(stateBefore, {});
  expect(stateAfter.errorCode).toEqual('');
  expect(stateAfter.errorMessage).toEqual('');
  expect(stateAfter.showError).toBe(false);
  expect(stateAfter.saving).toBe(false);
  expect(stateAfter.ucastnikId).toBe(undefined);
  expect(stateAfter.validateForm).toBe(false);
  expect(stateAfter.validatePlatba).toBe(false);
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
  expect(stateAfter.novaPlatba).toEqual({
    castka: undefined,
    datum: undefined,
    typ: 'hotově',
    poznamka: undefined
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
    validateForm: true,
    validatePlatba: true,
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
    novaPlatba: { castka: undefined, datum: undefined, typ: 'složenkou', poznamka: 'haha' }
  };
  const stateAfter = {
    errorCode: '',
    errorMessage: '',
    showError: false,
    saved: false,
    saving: false,
    ucastnikId: undefined,
    validateForm: false,
    validatePlatba: false,
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
    novaPlatba: { castka: undefined, datum: undefined, typ: 'hotově', poznamka: undefined }
  };
  deepFreeze(stateBefore);

  expect(prihlaskyFormReducer(stateBefore, reset())).toEqual(stateAfter);
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
      saveUcastSuccess({ id: '===id===', udaje: {}, prihlaska: {} })
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

it('validation of the initial state [validateForm,validatePlatba === false]', () => {
  const state = {
    validateForm: false,
    validatePlatba: false,
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
    novaPlatba: { castka: undefined, datum: undefined, typ: 'hotově', poznamka: undefined }
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
  expect(inputValid('prihlaska.typ', state.prihlaska.typ, state)).toBe(undefined);
  expect(inputValid('prihlaska.startCislo', state.prihlaska.startCislo, state)).toBe(undefined);
  expect(inputValid('prihlaska.kod', state.prihlaska.kod, state)).toBe(undefined);
  expect(inputValid('prihlaska.mladistvyPotvrzen', state.prihlaska.mladistvyPotvrzen, state)).toBe(
    undefined
  );
  expect(inputValid('novaPlatba.castka', state.novaPlatba.castka, state)).toBe(undefined);
  expect(inputValid('novaPlatba.datum', state.novaPlatba.datum, state)).toBe(undefined);
  expect(inputValid('novaPlatba.typ', state.novaPlatba.typ, state)).toEqual(undefined);
  expect(inputValid('novaPlatba.poznamka', state.novaPlatba.poznamka, state)).toBe(undefined);
  expect(formValid(state)).toBe(true);
  expect(novaPlatbaValid(state)).toBe(true);
  expect(isInputEnabled('prihlaska.startCislo', state, ucastniciTestData.entities.rocniky)).toBe(
    false
  );
});

it('validation of the initial state [validateForm,validatePlatba === true]', () => {
  const state = {
    validateForm: true,
    validatePlatba: true,
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
    novaPlatba: { castka: undefined, datum: undefined, typ: 'hotově', poznamka: undefined }
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
  expect(inputValid('prihlaska.typ', state.prihlaska.typ, state)).toEqual('error');
  expect(inputValid('prihlaska.startCislo', state.prihlaska.startCislo, state)).toBe(undefined);
  expect(inputValid('prihlaska.kod', state.prihlaska.kod, state)).toBe(undefined);
  expect(inputValid('prihlaska.mladistvyPotvrzen', state.prihlaska.mladistvyPotvrzen, state)).toBe(
    undefined
  );
  expect(inputValid('novaPlatba.castka', state.novaPlatba.castka, state)).toEqual('error');
  expect(inputValid('novaPlatba.datum', state.novaPlatba.datum, state)).toEqual('error');
  expect(inputValid('novaPlatba.typ', state.novaPlatba.typ, state)).toEqual(undefined);
  expect(inputValid('novaPlatba.poznamka', state.novaPlatba.poznamka, state)).toBe(undefined);
  expect(formValid(state)).toBe(false);
  expect(novaPlatbaValid(state)).toBe(false);
  expect(isInputEnabled('prihlaska.startCislo', state, ucastniciTestData.entities.rocniky)).toBe(
    false
  );
});

it('validation of some invalid state [validateForm,validatePlatba === false]', () => {
  const state = {
    validateForm: false,
    validatePlatba: false,
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
      startCislo: undefined,
      kod: '===kód===',
      mladistvyPotvrzen: undefined
    },
    platby: [{ castka: 220, datum: new Date(), typ: 'převodem' }],
    novaPlatba: { castka: 200, datum: '1. 5.', typ: 'hotově', poznamka: undefined }
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
  expect(inputValid('prihlaska.typ', state.prihlaska.typ, state)).toBe(undefined);
  expect(inputValid('prihlaska.startCislo', state.prihlaska.startCislo, state)).toBe(undefined);
  expect(inputValid('prihlaska.kod', state.prihlaska.kod, state)).toBe(undefined);
  expect(inputValid('prihlaska.mladistvyPotvrzen', state.prihlaska.mladistvyPotvrzen, state)).toBe(
    undefined
  );
  expect(inputValid('novaPlatba.castka', state.novaPlatba.castka, state)).toEqual('success');
  expect(inputValid('novaPlatba.datum', state.novaPlatba.datum, state)).toEqual('error');
  expect(inputValid('novaPlatba.typ', state.novaPlatba.typ, state)).toEqual(undefined);
  expect(inputValid('novaPlatba.poznamka', state.novaPlatba.poznamka, state)).toBe(undefined);
  expect(formValid(state)).toBe(false);
  expect(novaPlatbaValid(state)).toBe(false);
  expect(isInputEnabled('prihlaska.startCislo', state, ucastniciTestData.entities.rocniky)).toBe(
    false
  );
});

it('validation of some invalid state [validateForm,validatePlatba === true]', () => {
  const state = {
    validateForm: true,
    validatePlatba: true,
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
      startCislo: undefined,
      kod: '===kód===',
      mladistvyPotvrzen: undefined
    },
    platby: [{ castka: 200, datum: '3. 1. 2015', typ: 'převodem' }],
    novaPlatba: { castka: undefined, datum: '3. 1. 2015', typ: undefined, poznamka: 'haha' }
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
  expect(inputValid('prihlaska.typ', state.prihlaska.typ, state)).toEqual('error');
  expect(inputValid('prihlaska.startCislo', state.prihlaska.startCislo, state)).toBe(undefined);
  expect(inputValid('prihlaska.kod', state.prihlaska.kod, state)).toBe(undefined);
  expect(inputValid('prihlaska.mladistvyPotvrzen', state.prihlaska.mladistvyPotvrzen, state)).toBe(
    undefined
  );
  expect(inputValid('novaPlatba.castka', state.novaPlatba.castka, state)).toEqual('error');
  expect(inputValid('novaPlatba.datum', state.novaPlatba.datum, state)).toEqual('success');
  expect(inputValid('novaPlatba.typ', state.novaPlatba.typ, state)).toEqual('error');
  expect(inputValid('novaPlatba.poznamka', state.novaPlatba.poznamka, state)).toBe(undefined);
  expect(formValid(state)).toBe(false);
  expect(novaPlatbaValid(state)).toBe(false);
  expect(isInputEnabled('prihlaska.startCislo', state, ucastniciTestData.entities.rocniky)).toBe(
    false
  );
});

it('udaje.pohlavi - nahodí ženu', () => {
  const stateBefore = { udaje: { pohlavi: undefined } };
  deepFreeze(stateBefore);
  const stateAfter = { udaje: { prijmeni: 'Sukdoláková', pohlavi: 'žena' } };

  expect(
    prihlaskyFormReducer(
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
    prihlaskyFormReducer(
      stateBefore,
      inputChanged('udaje.prijmeni', { target: { value: 'Malová' } })
    )
  ).toEqual(stateAfter);
});

it('udaje.narozeni - prázdné', () => {
  const stateBefore = {
    validateForm: false,
    udaje: { narozeni: { den: undefined, mesic: undefined, rok: undefined } }
  };
  deepFreeze(stateBefore);
  const stateAfter = {
    validateForm: false,
    udaje: { narozeni: { den: undefined, mesic: undefined, rok: '' } }
  };

  expect(
    prihlaskyFormReducer(stateBefore, inputChanged('udaje.narozeni', { target: { value: '' } }))
  ).toEqual(stateAfter);
  expect(inputValid('udaje.narozeni', stateBefore.udaje.narozeni, stateBefore)).toBe(undefined);
  expect(inputValid('udaje.narozeni', stateAfter.udaje.narozeni, stateAfter)).toEqual('error');
});

it('udaje.narozeni - neúplné', () => {
  const stateBefore = {
    validateForm: false,
    udaje: { narozeni: { den: undefined, mesic: undefined, rok: undefined } }
  };
  deepFreeze(stateBefore);
  const stateAfter = {
    validateForm: false,
    udaje: { narozeni: { den: undefined, mesic: undefined, rok: '1. ' } }
  };

  expect(
    prihlaskyFormReducer(stateBefore, inputChanged('udaje.narozeni', { target: { value: '1. ' } }))
  ).toEqual(stateAfter);
  expect(inputValid('udaje.narozeni', stateBefore.udaje.narozeni, stateBefore)).toBe(undefined);
  expect(inputValid('udaje.narozeni', stateAfter.udaje.narozeni, stateAfter)).toEqual('error');
});

it('udaje.narozeni - jen rok', () => {
  const stateBefore = {
    validateForm: false,
    udaje: { narozeni: { den: undefined, mesic: undefined, rok: '197' } }
  };
  deepFreeze(stateBefore);
  const stateAfter = {
    validateForm: false,
    udaje: { narozeni: { den: undefined, mesic: undefined, rok: 1978 } }
  };

  expect(
    prihlaskyFormReducer(stateBefore, inputChanged('udaje.narozeni', { target: { value: '1978' } }))
  ).toEqual(stateAfter);
  expect(inputValid('udaje.narozeni', stateBefore.udaje.narozeni, stateBefore)).toEqual('error');
  expect(inputValid('udaje.narozeni', stateAfter.udaje.narozeni, stateAfter)).toEqual('warning');
});

it('udaje.narozeni - celé', () => {
  const stateBefore = {
    validateForm: false,
    udaje: { narozeni: { den: undefined, mesic: undefined, rok: '1.7.196' } }
  };
  deepFreeze(stateBefore);
  const stateAfter = {
    validateForm: false,
    udaje: { narozeni: { den: 1, mesic: 7, rok: 1967 } }
  };

  expect(
    prihlaskyFormReducer(
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
    prihlaskyFormReducer(
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
    prihlaskyFormReducer(
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
    prihlaskyFormReducer(
      stateBefore,
      inputChanged('prihlaska.datum', { target: { value: '1.7.2017' } })
    )
  ).toEqual(stateAfter);
  expect(inputValid('prihlaska.datum', stateAfter.prihlaska.datum, stateAfter)).toEqual('success');
  expect(formatValue('prihlaska.datum', stateAfter.prihlaska.datum)).toEqual('1. 7. 2017');
});

it('prihlaska.typ - není pohlaví', () => {
  const state = {
    ...ucastniciTestData,
    registrator: {
      prihlasky: {
        form: {
          udaje: { narozeni: { den: undefined, mesic: undefined, rok: 1981 }, pohlavi: undefined }
        }
      }
    }
  };
  const selected = [
    { key: 'maraton', value: { typ: 'maraton' } },
    { key: 'půlmaraton', value: { typ: 'půlmaraton' } },
    { key: 'cyklo', value: { typ: 'cyklo' } },
    { key: 'koloběžka', value: { typ: 'koloběžka' } },
    { key: 'pěší', id: '5a587e1a051c181132cf83b1', value: { typ: 'pěší' } }
  ];

  expect(
    inputOptions('prihlaska.typ', state.registrator.prihlasky.form, state.entities.rocniky)
  ).toEqual(selected);
});

it('prihlaska.typ - není narození', () => {
  const state = {
    ...ucastniciTestData,
    registrator: {
      prihlasky: {
        form: {
          udaje: { narozeni: { den: undefined, mesic: undefined, rok: undefined }, pohlavi: 'žena' }
        }
      }
    }
  };
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

  expect(
    inputOptions('prihlaska.typ', state.registrator.prihlasky.form, state.entities.rocniky)
  ).toEqual(selected);
});

it('prihlaska.typ - muž', () => {
  const state = {
    ...ucastniciTestData,
    registrator: {
      prihlasky: {
        form: {
          udaje: { narozeni: { den: undefined, mesic: undefined, rok: 1981 }, pohlavi: 'muž' }
        }
      }
    }
  };
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

  expect(
    inputOptions('prihlaska.typ', state.registrator.prihlasky.form, state.entities.rocniky)
  ).toEqual(selected);
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

  expect(
    isInputEnabled('prihlaska.startCislo', state.registrator.prihlasky.form, state.entities.rocniky)
  ).toBe(true);
  expect(
    formatValue('prihlaska.startCislo', state.registrator.prihlasky.form.prihlaska.startCislo)
  ).toEqual('45');
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

  expect(
    isInputEnabled('prihlaska.startCislo', state.registrator.prihlasky.form, state.entities.rocniky)
  ).toBe(false);
  expect(
    formatValue('prihlaska.startCislo', state.registrator.prihlasky.form.prihlaska.startCislo)
  ).toEqual('');
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
    showError: false,
    saved: false,
    saving: false,
    ucastnikId: '5a09b1fd371dec1e99b7e1c9',
    validateForm: false,
    validatePlatba: false,
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
    novaPlatba: { castka: undefined, datum: undefined, typ: 'hotově', poznamka: undefined }
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
    showError: false,
    saved: false,
    saving: false,
    ucastnikId: '6f09b1fd371dec1e99b7e1c9',
    validateForm: false,
    validatePlatba: false,
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
    novaPlatba: { castka: undefined, datum: undefined, typ: 'hotově', poznamka: undefined }
  };
  deepFreeze(stateBefore);

  expect(
    prihlaskyFormReducer(
      stateBefore,
      loadUcastnik({ id: '6f09b1fd371dec1e99b7e1c9', ...ucastniciTestData.entities })
    )
  ).toEqual(stateAfter);
});

it('predepsaneStartovne - cyklo', () => {
  const state = {
    ...ucastniciTestData,
    registrator: {
      prihlasky: {
        form: {
          prihlaska: {
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
      kategorie: state.entities.kategorie,
      prihlaska: state.registrator.prihlasky.form.prihlaska,
      rocniky: state.entities.rocniky
    })
  ).toEqual(selected);
});

it('predepsaneStartovne - půlmaraton', () => {
  const state = {
    ...ucastniciTestData,
    registrator: {
      prihlasky: {
        form: {
          prihlaska: {
            kategorie: '5a587e1b051c181132cf83d4'
          }
        }
      }
    }
  };
  const selected = { polozky: [{ castka: 200, duvod: 'předem' }], suma: 200 };
  expect(
    predepsaneStartovne({
      kategorie: state.entities.kategorie,
      prihlaska: state.registrator.prihlasky.form.prihlaska,
      rocniky: state.entities.rocniky
    })
  ).toEqual(selected);
});

it('addPlatba()', () => {
  const stateBefore = {
    validatePlatba: true,
    platby: [
      { castka: 250, datum: '2018-06-09T00:00:00.000Z', typ: 'hotově' },
      { castka: 20, datum: '2018-06-09T00:00:00.000Z', typ: 'hotově' }
    ],
    novaPlatba: { castka: '133', datum: '2018-05-13T00:00:00.000Z', typ: 'převodem' }
  };
  const stateAfter = {
    validatePlatba: false,
    platby: [
      { castka: 133, datum: '2018-05-13T00:00:00.000Z', typ: 'převodem' },
      { castka: 250, datum: '2018-06-09T00:00:00.000Z', typ: 'hotově' },
      { castka: 20, datum: '2018-06-09T00:00:00.000Z', typ: 'hotově' }
    ],
    novaPlatba: { castka: undefined, datum: undefined, typ: 'hotově', poznamka: undefined }
  };
  deepFreeze(stateBefore);

  expect(prihlaskyFormReducer(stateBefore, addPlatba())).toEqual(stateAfter);
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
