import deepFreeze from 'deep-freeze';
import { createStopkyProTypReducer } from './stopkyProTypReducer';
import { stopkyStart, stopkyStop } from './StopkyProTypActions';

const stopkyProTypReducer = createStopkyProTypReducer('půlmaraton');

it('na začátku', () => {
  const stateBefore = undefined;

  const stateAfter = stopkyProTypReducer(stateBefore, {});
  expect(stateAfter.running).toBe(false);
  expect(stateAfter.base).toBeNull();
});

it('po startu [Date]', () => {
  const now = new Date();
  const stateBefore = { running: false, base: null };
  const stateAfter = { running: true, base: now.toJSON() };
  deepFreeze(stateBefore);

  expect(stopkyProTypReducer(stateBefore, stopkyStart({ base: now, typ: 'půlmaraton' }))).toEqual(
    stateAfter
  );
});

it('po startu [string]', () => {
  const now = new Date();
  const stateBefore = { running: false, base: null };
  const stateAfter = { running: true, base: now.toJSON() };
  deepFreeze(stateBefore);

  expect(
    stopkyProTypReducer(stateBefore, stopkyStart({ base: now.toJSON(), typ: 'půlmaraton' }))
  ).toEqual(stateAfter);
});

it('dvakrát start', () => {
  const now = new Date();
  const stateBefore = { running: true, base: now.toJSON() };
  deepFreeze(stateBefore);

  expect(stopkyProTypReducer(stateBefore, stopkyStart({ base: now, typ: 'půlmaraton' }))).toBe(
    stateBefore
  );
});

it('po stopce', () => {
  const now = new Date();
  const stateBefore = { running: true, base: now.toJSON() };
  deepFreeze(stateBefore);

  const stateAfter = stopkyProTypReducer(stateBefore, stopkyStop({ typ: 'půlmaraton' }));
  expect(stateAfter.running).toBe(false);
  expect(stateAfter.base).toBe(stateBefore.base);
});

it('dvakrát stop', () => {
  const now = new Date();
  const stateBefore = { running: false, base: now.toJSON() };
  deepFreeze(stateBefore);

  const stateAfter = stopkyProTypReducer(stateBefore, stopkyStop({ typ: 'půlmaraton' }));
  expect(stateAfter.running).toBe(false);
  expect(stateAfter.base).toBe(stateBefore.base);
});

it('po restartu', () => {
  const now = new Date();
  const stateBefore = { running: false, base: now.toJSON() };
  deepFreeze(stateBefore);

  const stateAfter = stopkyProTypReducer(
    stateBefore,
    stopkyStart({ base: new Date(now.getTime() + 10), typ: 'půlmaraton' })
  );
  expect(stateAfter.running).toBe(true);
  expect(new Date(stateAfter.base).getTime()).toBeGreaterThan(new Date(stateBefore.base).getTime());
});

it('jiný typ', () => {
  const stateBefore = { running: true, base: new Date().toJSON() };
  deepFreeze(stateBefore);

  expect(stopkyProTypReducer(stateBefore, stopkyStop({ typ: 'maraton' }))).toBe(stateBefore);
});
