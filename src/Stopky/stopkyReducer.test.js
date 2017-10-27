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
  const now = new Date();
  const stateBefore = { running: false, base: null };
  const stateAfter = { running: true, base: now.toJSON() };
  deepFreeze(stateBefore);

  expect(stopkyReducer(stateBefore, stopkyStart(now))).toEqual(stateAfter);
});

it('dvakrát start', () => {
  const now = new Date();
  const stateBefore = { running: true, base: now.toJSON() };
  deepFreeze(stateBefore);

  expect(stopkyReducer(stateBefore, stopkyStart(now))).toBe(stateBefore);
});

it('po stopce', () => {
  const now = new Date();
  const stateBefore = { running: true, base: now.toJSON() };
  deepFreeze(stateBefore);

  const stateAfter = stopkyReducer(stateBefore, stopkyStop());
  expect(stateAfter.running).toBe(false);
  expect(stateAfter.base).toBe(stateBefore.base);
});

it('dvakrát stop', () => {
  const now = new Date();
  const stateBefore = { running: false, base: now.toJSON() };
  deepFreeze(stateBefore);

  const stateAfter = stopkyReducer(stateBefore, stopkyStop());
  expect(stateAfter.running).toBe(false);
  expect(stateAfter.base).toBe(stateBefore.base);
});

it('po restartu', () => {
  const now = new Date();
  const stateBefore = { running: false, base: now.toJSON() };
  deepFreeze(stateBefore);

  const stateAfter = stopkyReducer(stateBefore, stopkyStart(new Date(now.getTime() + 10)));
  expect(stateAfter.running).toBe(true);
  expect(new Date(stateAfter.base).getTime()).toBeGreaterThan(new Date(stateBefore.base).getTime());
});
