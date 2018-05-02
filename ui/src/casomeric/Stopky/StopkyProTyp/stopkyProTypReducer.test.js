import deepFreeze from 'deep-freeze';
import stopkyProTypReducer from './stopkyProTypReducer';
import { stopkyChange, stopkyStart, stopkyStop } from './StopkyProTypActions';

it('na začátku', () => {
  const stateBefore = undefined;

  const stateAfter = stopkyProTypReducer(stateBefore, {});
  expect(stateAfter.running).toBe(false);
  expect(stateAfter.base).toBeNull();
  expect(stateAfter.delta).toEqual('P0D');
});

it('po startu', () => {
  const now = new Date();
  const stateBefore = { running: false, base: null, delta: 'P0D' };
  const stateAfter = { running: true, base: now.toJSON(), delta: 'P0D' };
  deepFreeze(stateBefore);

  expect(stopkyProTypReducer(stateBefore, stopkyStart({ now }))).toEqual(stateAfter);
});

it('dvakrát start', () => {
  const now = new Date();
  const stateBefore = { running: true, base: now.toJSON() };
  deepFreeze(stateBefore);

  expect(stopkyProTypReducer(stateBefore, stopkyStart({ now }))).toBe(stateBefore);
});

it('po stopce', () => {
  const base = new Date();
  const now = new Date(base.getTime() + 5320);
  const stateBefore = { running: true, base: base.toJSON(), delta: 'P0D' };
  const stateAfter = { running: false, base: null, delta: 'PT5.32S' };
  deepFreeze(stateBefore);

  expect(stopkyProTypReducer(stateBefore, stopkyStop({ now }))).toEqual(stateAfter);
});

it('dvakrát stop', () => {
  const now = new Date();
  const stateBefore = { running: false, base: null, delta: 'PT0H0M13.72S' };
  deepFreeze(stateBefore);

  expect(stopkyProTypReducer(stateBefore, stopkyStop({ now }))).toBe(stateBefore);
});

it('po restartu', () => {
  const now = new Date();
  const stateBefore = { running: false, base: null, delta: 'PT0H15M03.01S' };
  const stateAfter = {
    running: true,
    base: new Date(now.getTime() - 903010).toJSON(),
    delta: 'P0D'
  };
  deepFreeze(stateBefore);

  expect(stopkyProTypReducer(stateBefore, stopkyStart({ now }))).toEqual(stateAfter);
});

it('add time step when running', () => {
  const now = new Date();
  const stateBefore = { running: true, base: now.toJSON(), delta: 'P0D' };
  const stateAfter = {
    running: true,
    base: new Date(now.getTime() - 10 * 1000).toJSON(),
    delta: 'P0D'
  };
  deepFreeze(stateBefore);

  expect(stopkyProTypReducer(stateBefore, stopkyChange({ step: +10000 }))).toEqual(stateAfter);
});

it('subtract time step when running', () => {
  const now = new Date();
  const stateBefore = { running: true, base: now.toJSON(), delta: 'P0D' };
  const stateAfter = { running: true, base: new Date(now.getTime() + 100).toJSON(), delta: 'P0D' };
  deepFreeze(stateBefore);

  expect(stopkyProTypReducer(stateBefore, stopkyChange({ step: -100 }))).toEqual(stateAfter);
});

it('add time step when not running', () => {
  const stateBefore = { running: false, base: null, delta: 'PT0H0M13.42S' };
  const stateAfter = { running: false, base: null, delta: 'PT3M13.42S' };
  deepFreeze(stateBefore);

  expect(stopkyProTypReducer(stateBefore, stopkyChange({ step: +3 * 60 * 1000 }))).toEqual(
    stateAfter
  );
});

it('subtract time step when not running', () => {
  const stateBefore = { running: false, base: null, delta: 'PT0H0M13.42S' };
  const stateAfter = { running: false, base: null, delta: 'PT3.42S' };
  deepFreeze(stateBefore);

  expect(stopkyProTypReducer(stateBefore, stopkyChange({ step: -10 * 1000 }))).toEqual(stateAfter);
});

it('cannot subtract time step when not running', () => {
  const stateBefore = { running: false, base: null, delta: 'PT0H0M13.42S' };
  const stateAfter = { running: false, base: null, delta: 'PT0H0M13.42S' };
  deepFreeze(stateBefore);

  expect(stopkyProTypReducer(stateBefore, stopkyChange({ step: -20 * 1000 }))).toEqual(stateAfter);
});
