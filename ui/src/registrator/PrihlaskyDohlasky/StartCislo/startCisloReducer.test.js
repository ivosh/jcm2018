import deepFreeze from 'deep-freeze';
import { createReset } from '../PrihlaskyForm/PrihlaskyFormActions';
import { createHide, createShow } from './StartCisloActions';
import { createStartCisloReducer } from './startCisloReducer';

const actionPrefix = 'PRIHLASKY_YYY';
const hide = createHide(actionPrefix);
const reset = createReset(actionPrefix);
const show = createShow(actionPrefix);
const startCisloReducer = createStartCisloReducer(actionPrefix);

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
