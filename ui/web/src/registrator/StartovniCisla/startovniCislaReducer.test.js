import deepFreeze from 'deep-freeze';
import ucastniciTestData from '../../entities/ucastnici/ucastniciTestData';
import startovniCislaReducer, { getTypyStartCisel } from './startovniCislaReducer';
import { changeOdstartovani } from './StartovniCislaActions';

it('na začátku', () => {
  const stateBefore = undefined;
  const stateAfter = { odstartovani: false };

  expect(startovniCislaReducer(stateBefore, {})).toEqual(stateAfter);
});

it('přepínání odstartovani - tam', () => {
  const stateBefore = undefined;
  const stateAfter = { odstartovani: true };

  expect(startovniCislaReducer(stateBefore, changeOdstartovani())).toEqual(stateAfter);
});

it('přepínání odstartovani - a zpět', () => {
  const stateBefore = { odstartovani: true };
  const stateAfter = { odstartovani: false };
  deepFreeze(stateBefore);

  expect(startovniCislaReducer(stateBefore, changeOdstartovani())).toEqual(stateAfter);
});

it('getTypyStartCisel()', () => {
  const state = ucastniciTestData;
  deepFreeze(state);
  const selected = ['maraton', 'půlmaraton', 'cyklo', 'koloběžka'];

  expect(getTypyStartCisel(state.entities.rocniky)).toEqual(selected);
});
