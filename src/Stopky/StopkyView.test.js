import React from 'react';
import ReactDOM from 'react-dom';
import { StopkyView } from './StopkyView';

const fakeStartAction = base => ({});
const fakeStopAction = () => ({});

it('před startem', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <StopkyView
      running={false}
      base={null}
      startAction={fakeStartAction}
      stopAction={fakeStopAction}
      startEnabled={true}
      stopEnabled={false}
    />,
    div
  );
});

it('po startu', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <StopkyView
      running={true}
      base={new Date()}
      startAction={fakeStartAction}
      stopAction={fakeStopAction}
      startEnabled={false}
      stopEnabled={true}
    />,
    div
  );
});

it('po stopce', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <StopkyView
      running={false}
      base={new Date()}
      startAction={fakeStartAction}
      stopAction={fakeStopAction}
      startEnabled={true}
      stopEnabled={false}
    />,
    div
  );
});
