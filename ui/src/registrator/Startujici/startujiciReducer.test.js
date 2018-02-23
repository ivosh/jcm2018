import deepFreeze from 'deep-freeze';
import ucastniciTestData from '../../entities/ucastnici/ucastniciTestData';
import startujiciReducer, { getTypyStartCisel } from './startujiciReducer';
import { changeOdstartovani } from './StartujiciActions';

it('na začátku', () => {
  const stateBefore = undefined;
  const stateAfter = { odstartovani: false };

  expect(startujiciReducer(stateBefore, {})).toEqual(stateAfter);
});

it('přepínání odstartovani - tam', () => {
  const stateBefore = undefined;
  const stateAfter = { odstartovani: true };

  expect(startujiciReducer(stateBefore, changeOdstartovani())).toEqual(stateAfter);
});

it('přepínání odstartovani - a zpět', () => {
  const stateBefore = { odstartovani: true };
  const stateAfter = { odstartovani: false };
  deepFreeze(stateBefore);

  expect(startujiciReducer(stateBefore, changeOdstartovani())).toEqual(stateAfter);
});

it('getTypyStartCisel()', () => {
  const state = ucastniciTestData;
  deepFreeze(state);
  const selected = ['maraton', 'půlmaraton', 'cyklo', 'koloběžka'];

  expect(getTypyStartCisel(state.entities.rocniky)).toEqual(selected);
});
