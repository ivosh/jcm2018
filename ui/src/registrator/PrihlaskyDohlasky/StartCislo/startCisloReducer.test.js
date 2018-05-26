import deepFreeze from 'deep-freeze';
import { hide, show } from './StartCisloActions';
import startCisloReducer from './startCisloReducer';

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
