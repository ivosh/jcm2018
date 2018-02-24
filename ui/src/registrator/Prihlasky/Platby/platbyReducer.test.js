import deepFreeze from 'deep-freeze';
import { reset } from './PlatbyActions';
import platbyReducer, { platbyInputValid, novaPlatbaValid } from './platbyReducer';

it('na začátku', () => {
  const stateBefore = undefined;

  const stateAfter = platbyReducer(stateBefore, {});
  expect(stateAfter).toEqual({
    castka: undefined,
    datum: undefined,
    typ: 'hotově',
    poznamka: undefined,
    validate: false
  });
});

it('reset()', () => {
  const stateBefore = {
    castka: '10',
    datum: undefined,
    typ: 'složenkou',
    poznamka: 'haha',
    validate: true
  };
  const stateAfter = {
    castka: undefined,
    datum: undefined,
    typ: 'hotově',
    poznamka: undefined,
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

  expect(platbyInputValid('novaPlatba.castka', state.castka, state)).toBe(undefined);
  expect(platbyInputValid('novaPlatba.datum', state.datum, state)).toBe(undefined);
  expect(platbyInputValid('novaPlatba.typ', state.typ, state)).toEqual(undefined);
  expect(platbyInputValid('novaPlatba.poznamka', state.poznamka, state)).toBe(undefined);
  expect(platbyInputValid('complete.nonsense', 'huh', state)).toBe('error');
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

  expect(platbyInputValid('novaPlatba.castka', state.castka, state)).toEqual('error');
  expect(platbyInputValid('novaPlatba.datum', state.datum, state)).toEqual('error');
  expect(platbyInputValid('novaPlatba.typ', state.typ, state)).toEqual(undefined);
  expect(platbyInputValid('novaPlatba.poznamka', state.poznamka, state)).toBe(undefined);
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

  expect(platbyInputValid('novaPlatba.castka', state.castka, state)).toEqual('success');
  expect(platbyInputValid('novaPlatba.datum', state.datum, state)).toEqual('error');
  expect(platbyInputValid('novaPlatba.typ', state.typ, state)).toEqual(undefined);
  expect(platbyInputValid('novaPlatba.poznamka', state.poznamka, state)).toBe(undefined);
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

  expect(platbyInputValid('novaPlatba.castka', state.castka, state)).toEqual('error');
  expect(platbyInputValid('novaPlatba.datum', state.datum, state)).toEqual('success');
  expect(platbyInputValid('novaPlatba.typ', state.typ, state)).toEqual('error');
  expect(platbyInputValid('novaPlatba.poznamka', state.poznamka, state)).toBe(undefined);
  expect(novaPlatbaValid(state)).toBe(false);
});
