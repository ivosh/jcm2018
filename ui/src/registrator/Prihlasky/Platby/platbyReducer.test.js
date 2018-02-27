import deepFreeze from 'deep-freeze';
import { expandNovaPlatba, inputChanged, reset } from './PlatbyActions';
import platbyReducer, { inputValid, novaPlatbaValid } from './platbyReducer';

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
  const state = {
    castka: undefined,
    datum: undefined,
    typ: 'hotově',
    poznamka: undefined,
    validate: false
  };
  deepFreeze(state);

  expect(inputValid('novaPlatba.castka', state.castka, state)).toBe(undefined);
  expect(inputValid('novaPlatba.datum', state.datum, state)).toBe(undefined);
  expect(inputValid('novaPlatba.typ', state.typ, state)).toEqual(undefined);
  expect(inputValid('novaPlatba.poznamka', state.poznamka, state)).toBe(undefined);
  expect(inputValid('complete.nonsense', 'huh', state)).toBe('error');
  expect(novaPlatbaValid(state)).toBe(true);
});

it('validation of the initial state [validate === true]', () => {
  const state = {
    castka: undefined,
    datum: undefined,
    typ: 'hotově',
    poznamka: undefined,
    validate: true
  };
  deepFreeze(state);

  expect(inputValid('novaPlatba.castka', state.castka, state)).toEqual('error');
  expect(inputValid('novaPlatba.datum', state.datum, state)).toEqual('error');
  expect(inputValid('novaPlatba.typ', state.typ, state)).toEqual(undefined);
  expect(inputValid('novaPlatba.poznamka', state.poznamka, state)).toBe(undefined);
  expect(novaPlatbaValid(state)).toBe(false);
});

it('validation of some invalid state [validate === false]', () => {
  const state = {
    castka: 200,
    datum: '1. 5.',
    typ: 'hotově',
    poznamka: undefined,
    validate: false
  };
  deepFreeze(state);

  expect(inputValid('novaPlatba.castka', state.castka, state)).toEqual('success');
  expect(inputValid('novaPlatba.datum', state.datum, state)).toEqual('error');
  expect(inputValid('novaPlatba.typ', state.typ, state)).toEqual(undefined);
  expect(inputValid('novaPlatba.poznamka', state.poznamka, state)).toBe(undefined);
  expect(novaPlatbaValid(state)).toBe(false);
});

it('validation of some invalid state [validate === true]', () => {
  const state = {
    castka: undefined,
    datum: '3. 1. 2015',
    typ: undefined,
    poznamka: 'haha',
    validate: true
  };
  deepFreeze(state);

  expect(inputValid('novaPlatba.castka', state.castka, state)).toEqual('error');
  expect(inputValid('novaPlatba.datum', state.datum, state)).toEqual('success');
  expect(inputValid('novaPlatba.typ', state.typ, state)).toEqual('error');
  expect(inputValid('novaPlatba.poznamka', state.poznamka, state)).toBe(undefined);
  expect(novaPlatbaValid(state)).toBe(false);
});

it('novaPlatba.datum - neúplné', () => {
  const stateBefore = { datum: undefined };
  deepFreeze(stateBefore);
  const stateAfter = { datum: '1. 7. 201' };

  expect(
    platbyReducer(stateBefore, inputChanged('novaPlatba.datum', { target: { value: '1. 7. 201' } }))
  ).toEqual(stateAfter);
  expect(inputValid('novaPlatba.datum', stateAfter.datum, stateAfter)).toEqual('error');
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
  expect(inputValid('novaPlatba.datum', stateAfter.datum, stateAfter)).toEqual('success');
});

it('novaPlatba.minified - expand', () => {
  const stateBefore = { novaPlatbaMinified: true };
  deepFreeze(stateBefore);
  const stateAfter = { novaPlatbaMinified: false };

  expect(platbyReducer(stateBefore, expandNovaPlatba())).toEqual(stateAfter);
});
