import deepFreeze from 'deep-freeze';
import ucastniciTestData from '../../entities/ucastnici/ucastniciTestData';
import startujiciReducer, { getTypyStartCisel } from './startujiciReducer';

it('na začátku', () => {
  const stateBefore = undefined;

  const stateAfter = startujiciReducer(stateBefore, {});
  expect(stateAfter.fetching).toEqual(false);
});

it('přepínání fetching', () => {
  const stateBefore = { fetching: false };
  const stateAfter = { ...stateBefore, fetching: true };
  deepFreeze(stateBefore);

  expect(startujiciReducer(stateBefore, { type: 'FETCH_UCASTNICI_REQUEST' })).toEqual(stateAfter);
  expect(startujiciReducer(stateAfter, { type: 'FETCH_UCASTNICI_SUCCESS' })).toEqual(stateBefore);
  expect(startujiciReducer(stateAfter, { type: 'FETCH_UCASTNICI_ERROR' })).toEqual(stateBefore);
});

it('getTypyStartCisel()', () => {
  const state = ucastniciTestData;
  deepFreeze(state);
  const selected = ['maraton', 'půlmaraton', 'cyklo', 'koloběžka'];

  expect(getTypyStartCisel(state.entities.rocniky)).toEqual(selected);
});
