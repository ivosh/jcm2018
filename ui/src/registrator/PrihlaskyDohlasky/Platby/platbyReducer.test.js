import deepFreeze from 'deep-freeze';
import { ActionPrefixes } from '../../../constants';
import ucastniciTestData, {
  AKTUALNI_DATUM_KONANI
} from '../../../entities/ucastnici/ucastniciTestData';
import {
  createAddPlatba,
  createExpandNovaPlatba,
  createInputChanged,
  createReset,
  createValidate
} from './PlatbyActions';
import { createPlatbyReducer, formErrors, inputValid } from './platbyReducer';

const actionPrefix = 'PRIHLASKY_YYY';
const addPlatba = createAddPlatba(actionPrefix);
const expandNovaPlatba = createExpandNovaPlatba(actionPrefix);
const inputChanged = createInputChanged(actionPrefix);
const platbyReducer = createPlatbyReducer(actionPrefix);
const reset = createReset({ actionPrefix, jePrihlaskou: true });
const validate = createValidate(actionPrefix);

it('na začátku', () => {
  const stateBefore = undefined;

  const stateAfter = platbyReducer(stateBefore, {});
  expect(stateAfter).toEqual({
    castka: undefined,
    datum: undefined,
    typ: 'hotově',
    poznamka: undefined,
    novaPlatbaMinified: true,
    validate: false
  });
});

it('reset() - přihlášky', () => {
  const stateBefore = {
    castka: '10',
    datum: undefined,
    typ: 'složenkou',
    poznamka: 'haha',
    novaPlatbaMinified: false,
    validate: true
  };
  const stateAfter = {
    castka: undefined,
    datum: undefined,
    typ: 'hotově',
    poznamka: undefined,
    novaPlatbaMinified: true,
    validate: false
  };
  deepFreeze(stateBefore);
  const { rocniky } = ucastniciTestData.entities;

  expect(platbyReducer(stateBefore, reset({ rocniky }))).toEqual(stateAfter);
});

it('reset() - dohlášky', () => {
  const stateBefore = {
    castka: '10',
    datum: undefined,
    typ: 'složenkou',
    poznamka: 'haha',
    novaPlatbaMinified: false,
    validate: true
  };
  const stateAfter = {
    castka: undefined,
    datum: new Date(AKTUALNI_DATUM_KONANI).toJSON(),
    typ: 'hotově',
    poznamka: undefined,
    novaPlatbaMinified: true,
    validate: false
  };
  deepFreeze(stateBefore);
  const { rocniky } = ucastniciTestData.entities;

  const dohlaskyPlatbyReducer = createPlatbyReducer(ActionPrefixes.DOHLASKY);
  expect(
    dohlaskyPlatbyReducer(
      stateBefore,
      createReset({ actionPrefix: ActionPrefixes.DOHLASKY })({ rocniky })
    )
  ).toEqual(stateAfter);
});

it('validate()', () => {
  const stateBefore = {
    castka: '10',
    datum: undefined,
    typ: 'složenkou',
    poznamka: 'haha',
    novaPlatbaMinified: false,
    validate: false
  };
  const stateAfter = { ...stateBefore, validate: true };
  deepFreeze(stateBefore);

  expect(platbyReducer(stateBefore, validate())).toEqual(stateAfter);
});

it('validation of the initial state [validate === false]', () => {
  const form = {
    castka: undefined,
    datum: undefined,
    typ: 'hotově',
    poznamka: undefined,
    validate: false
  };
  deepFreeze(form);

  expect(inputValid({ name: 'novaPlatba.castka', value: form.castka, form })).toBe(undefined);
  expect(inputValid({ name: 'novaPlatba.datum', value: form.datum, form })).toBe(undefined);
  expect(inputValid({ name: 'novaPlatba.typ', value: form.typ, form })).toEqual('success');
  expect(inputValid({ name: 'novaPlatba.poznamka', value: form.poznamka, form })).toBe(undefined);
  expect(inputValid({ name: 'complete.nonsense', value: 'huh', form })).toBe('error');
  expect(formErrors({ form })).toEqual([]);
});

it('validation of the initial state [validate === true]', () => {
  const form = {
    castka: undefined,
    datum: undefined,
    typ: 'hotově',
    poznamka: undefined,
    validate: true
  };
  deepFreeze(form);

  expect(inputValid({ name: 'novaPlatba.castka', value: form.castka, form })).toEqual('error');
  expect(inputValid({ name: 'novaPlatba.datum', value: form.datum, form })).toEqual('error');
  expect(inputValid({ name: 'novaPlatba.typ', value: form.typ, form })).toEqual('success');
  expect(inputValid({ name: 'novaPlatba.poznamka', value: form.poznamka, form })).toBe(undefined);
  expect(formErrors({ form })).toEqual([
    { name: 'novaPlatba.castka', value: undefined },
    { name: 'novaPlatba.datum', value: undefined }
  ]);
});

it('validation of some invalid state [validate === false]', () => {
  const form = {
    castka: 200,
    datum: '1. 5.',
    typ: 'hotově',
    poznamka: undefined,
    validate: false
  };
  deepFreeze(form);

  expect(inputValid({ name: 'novaPlatba.castka', value: form.castka, form })).toEqual('success');
  expect(inputValid({ name: 'novaPlatba.datum', value: form.datum, form })).toEqual('error');
  expect(inputValid({ name: 'novaPlatba.typ', value: form.typ, form })).toEqual('success');
  expect(inputValid({ name: 'novaPlatba.poznamka', value: form.poznamka, form })).toBe(undefined);
  expect(formErrors({ form })).toEqual([{ name: 'novaPlatba.datum', value: '1. 5.' }]);
});

it('validation of some invalid state [validate === true]', () => {
  const form = {
    castka: undefined,
    datum: '3. 1. 2015',
    typ: undefined,
    poznamka: 'haha',
    validate: true
  };
  deepFreeze(form);

  expect(inputValid({ name: 'novaPlatba.castka', value: form.castka, form })).toEqual('error');
  expect(inputValid({ name: 'novaPlatba.datum', value: form.datum, form })).toEqual('success');
  expect(inputValid({ name: 'novaPlatba.typ', value: form.typ, form })).toEqual('error');
  expect(inputValid({ name: 'novaPlatba.poznamka', value: form.poznamka, form })).toBe(undefined);
  expect(formErrors({ form })).toEqual([
    { name: 'novaPlatba.castka', value: undefined },
    { name: 'novaPlatba.typ', value: undefined }
  ]);
});

it('novaPlatba.datum - neúplné', () => {
  const stateBefore = { datum: undefined };
  deepFreeze(stateBefore);
  const stateAfter = { datum: '1. 7. 201' };

  expect(
    platbyReducer(stateBefore, inputChanged('novaPlatba.datum', { target: { value: '1. 7. 201' } }))
  ).toEqual(stateAfter);
  expect(
    inputValid({ name: 'novaPlatba.datum', value: stateAfter.datum, form: stateAfter })
  ).toEqual('error');
});

it('novaPlatba.datum - úplné', () => {
  const stateBefore = { datum: '1. 7. 201' };
  deepFreeze(stateBefore);
  const stateAfter = { datum: '2017-07-01T00:00:00.000Z' };

  expect(
    platbyReducer(
      stateBefore,
      inputChanged('novaPlatba.datum', { target: { value: '1. 7. 2017' } })
    )
  ).toEqual(stateAfter);
  expect(
    inputValid({ name: 'novaPlatba.datum', value: stateAfter.datum, form: stateAfter })
  ).toEqual('success');
});

it('novaPlatba.minified - expand', () => {
  const stateBefore = { novaPlatbaMinified: true };
  deepFreeze(stateBefore);
  const stateAfter = { novaPlatbaMinified: false };

  expect(platbyReducer(stateBefore, expandNovaPlatba())).toEqual(stateAfter);
});

it('novaPlatba.expanded - minify', () => {
  const stateBefore = { novaPlatbaMinified: false };
  deepFreeze(stateBefore);
  const stateAfter = { novaPlatbaMinified: true };

  expect(
    platbyReducer(
      stateBefore,
      addPlatba({ castka: 100, datum: '2018-06-09T00:00:00.000Z', typ: 'převodem' })
    )
  ).toEqual(stateAfter);
});
