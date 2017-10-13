import React from 'react';
import ReactDOM from 'react-dom';
import Stopky from './Stopky';
import stopkyReducer from './stopkyReducer';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Stopky />, div);
});

it('initial state', () => {
    const state = stopkyReducer(undefined, {});
    expect(state.running).toBe(false);
    expect(state.base).toBeNull();
});

it('po startu', () => {
    const initialState = stopkyReducer(undefined, {});
    const poStartu = stopkyReducer(initialState, {type: 'STOPKY_START'});
    expect(poStartu.running).toBe(true);
    expect(poStartu.base).not.toBeNull();
});

it('po stopce', () => {
    const initialState = stopkyReducer(undefined, {});
    const poStartu = stopkyReducer(initialState, {type: 'STOPKY_START'});
    const poStopce = stopkyReducer(poStartu, {type: 'STOPKY_STOP'});
    expect(poStopce.running).toBe(false);
    expect(poStopce.base).toEqual(poStartu.base);
});
