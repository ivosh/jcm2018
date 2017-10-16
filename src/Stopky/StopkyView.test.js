import React from 'react';
import ReactDOM from 'react-dom';
import { StopkyView } from './StopkyView';

const fakeStartAction = base => ({});
const fakeStopAction = () => ({});

it('před startem', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <StopkyView base={null} startAction={fakeStartAction} stopAction={fakeStopAction} />,
    div
  );
});

it('po startu', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <StopkyView base={new Date()} startAction={fakeStartAction} stopAction={fakeStopAction} />,
    div
  );
});
