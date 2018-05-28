import deepFreeze from 'deep-freeze';
import { createExpandNovaPlatba, createInputChanged, createReset } from './PlatbyActions';
import { createPlatbyReducer, formValid, inputValid } from './platbyReducer';

const expandNovaPlatba = createExpandNovaPlatba('PRIHLASKY');
const inputChanged = createInputChanged('PRIHLASKY');
const platbyReducer = createPlatbyReducer('PRIHLASKY');
const reset = createReset('PRIHLASKY');

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

it('reset()', () => {
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

  expect(platbyReducer(stateBefore, reset())).toEqual(stateAfter);
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
  expect(formValid({ form })).toBe(true);
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
  expect(formValid({ form })).toBe(false);
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
  expect(formValid({ form })).toBe(false);
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
  expect(formValid({ form })).toBe(false);
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
