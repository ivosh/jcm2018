import deepFreeze from 'deep-freeze';
import { removeCasomira } from './CasomiryActions';
import casomiryReducer from './casomiryReducer';

it('na začátku', () => {
  const stateBefore = undefined;

  expect(casomiryReducer(stateBefore, {})).toMatchSnapshot();
});

it('removeCasomira()', () => {
  const stateBefore = { maraton: true, půlmaraton: true, cyklo: true, koloběžka: true };
  const stateAfter = { ...stateBefore, půlmaraton: false };
  deepFreeze(stateBefore);

  expect(casomiryReducer(stateBefore, removeCasomira('půlmaraton'))).toEqual(stateAfter);
});
