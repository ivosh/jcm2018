import deepFreeze from 'deep-freeze';
import stopkyReducer from './stopkyReducer';
import { stopkyStart, stopkyStop } from './StopkyActions';

it('na začátku', () => {
  const stateBefore = undefined;

  const stateAfter = stopkyReducer(stateBefore, {});
  expect(stateAfter.running).toBe(false);
  expect(stateAfter.base).toBeNull();
});

it('po startu', () => {
  const stateBefore = { running: false, base: null };
  const stateAfter = { running: true, base: new Date() };
  deepFreeze(stateBefore);

  expect(stopkyReducer(stateBefore, stopkyStart(stateAfter.base))).toEqual(stateAfter);
});

it('dvakrát start', () => {
  const stateBefore = { running: true, base: new Date() };
  deepFreeze(stateBefore);

  expect(stopkyReducer(stateBefore, stopkyStart(new Date()))).toBe(stateBefore);
});

it('po stopce', () => {
  const stateBefore = { running: true, base: new Date() };
  deepFreeze(stateBefore);

  const stateAfter = stopkyReducer(stateBefore, stopkyStop());
  expect(stateAfter.running).toBe(false);
  expect(stateAfter.base).toBe(stateBefore.base);
});

it('dvakrát stop', () => {
  const stateBefore = { running: false, base: new Date() };
  deepFreeze(stateBefore);

  const stateAfter = stopkyReducer(stateBefore, stopkyStop());
  expect(stateAfter.running).toBe(false);
  expect(stateAfter.base).toBe(stateBefore.base);
});

it('po restartu', () => {
  const stateBefore = { running: false, base: new Date() };
  deepFreeze(stateBefore);

  const stateAfter = stopkyReducer(stateBefore, stopkyStart(new Date()));
  expect(stateAfter.running).toBe(true);
  expect(stateAfter.base).not.toBe(stateBefore.base);
});
