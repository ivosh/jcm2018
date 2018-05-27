import deepFreeze from 'deep-freeze';
import { reset } from '../PrihlaskyForm/PrihlaskyFormActions';
import { hide as genericHide, show as genericShow } from './StartCisloActions';
import { createStartCisloReducer } from './startCisloReducer';

const hide = genericHide('PRIHLASKY');
const show = genericShow('PRIHLASKY');
const startCisloReducer = createStartCisloReducer('PRIHLASKY');

it('na začátku', () => {
  const stateBefore = undefined;
  const stateAfter = { showing: false };

  expect(startCisloReducer(stateBefore, {})).toEqual(stateAfter);
});

it('hide', () => {
  const stateBefore = { showing: true };
  const stateAfter = { showing: false };
  deepFreeze(stateBefore);

  expect(startCisloReducer(stateBefore, hide())).toEqual(stateAfter);
});

it('show', () => {
  const stateBefore = { showing: false };
  const stateAfter = { showing: true };
  deepFreeze(stateBefore);

  expect(startCisloReducer(stateBefore, show())).toEqual(stateAfter);
});

it('reset', () => {
  const stateBefore = { showing: true };
  const stateAfter = { showing: false };
  deepFreeze(stateBefore);

  expect(startCisloReducer(stateBefore, reset())).toEqual(stateAfter);
});
