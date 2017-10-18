import React from 'react';
import ReactDOM from 'react-dom';
import { StopkyView } from './StopkyView';

const fakeOnStart = base => ({});
const fakeOnMezicas = duration => ({});
const fakeOnStop = () => ({});

it('před startem', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <StopkyView
      running={false}
      base={null}
      startEnabled={true}
      mezicasEnabled={false}
      stopEnabled={false}
      onStart={fakeOnStart}
      onMezicas={fakeOnMezicas}
      onStop={fakeOnStop}
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
      startEnabled={false}
      mezicasEnabled={true}
      stopEnabled={true}
      onStart={fakeOnStart}
      onMezicas={fakeOnMezicas}
      onStop={fakeOnStop}
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
      startEnabled={true}
      mezicasEnabled={false}
      stopEnabled={false}
      onStart={fakeOnStart}
      onMezicas={fakeOnMezicas}
      onStop={fakeOnStop}
    />,
    div
  );
});
