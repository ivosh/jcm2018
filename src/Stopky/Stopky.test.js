import React from 'react';
import ReactDOM from 'react-dom';
import deepFreeze from 'deep-freeze';
import Stopky from './Stopky';
import stopkyReducer from './stopkyReducer';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Stopky />, div);
});

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

  expect(stopkyReducer(stateBefore, { type: 'STOPKY_START', base: stateAfter.base })).toEqual(
    stateAfter
  );
});

it('dvakrát start', () => {
  const stateBefore = { running: true, base: new Date() };
  deepFreeze(stateBefore);

  expect(stopkyReducer(stateBefore, { type: 'STOPKY_START' })).toBe(stateBefore);
});

it('po stopce', () => {
  const stateBefore = { running: true, base: new Date() };
  deepFreeze(stateBefore);

  const stateAfter = stopkyReducer(stateBefore, { type: 'STOPKY_STOP' });
  expect(stateAfter.running).toBe(false);
  expect(stateAfter.base).toBe(stateBefore.base);
});

it('dvakrát stop', () => {
  const stateBefore = { running: false, base: new Date() };
  deepFreeze(stateBefore);

  const stateAfter = stopkyReducer(stateBefore, { type: 'STOPKY_STOP' });
  expect(stateAfter.running).toBe(false);
  expect(stateAfter.base).toBe(stateBefore.base);
});

it('po restartu', () => {
  const stateBefore = { running: false, base: new Date() };
  deepFreeze(stateBefore);

  const stateAfter = stopkyReducer(stateBefore, { type: 'STOPKY_START' });
  expect(stateAfter.running).toBe(true);
  expect(stateAfter.base).not.toBe(stateBefore.base);
});
