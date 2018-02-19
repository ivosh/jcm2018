import deepFreeze from 'deep-freeze';
import ucastniciTestData from '../../entities/ucastnici/ucastniciTestData';
import { getTypyStartCisel } from './startujiciReducer';

it('getTypyStartCisel()', () => {
  const state = ucastniciTestData;
  deepFreeze(state);
  const selected = ['maraton', 'půlmaraton', 'cyklo', 'koloběžka'];

  expect(getTypyStartCisel(state.entities.rocniky)).toEqual(selected);
});
