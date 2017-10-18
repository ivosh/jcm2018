import React from 'react';
import ReactDOM from 'react-dom';
import { Stopky } from './Stopky';

const fakeOnStart = base => ({});
const fakeOnAddMezicas = duration => ({});
const fakeOnStop = () => ({});

it('před startem', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <Stopky
      running={false}
      base={null}
      startEnabled={true}
      mezicasEnabled={false}
      stopEnabled={false}
      onStart={fakeOnStart}
      onAddMezicas={fakeOnAddMezicas}
      onStop={fakeOnStop}
    />,
    div
  );
});

it('po startu', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <Stopky
      running={true}
      base={new Date()}
      startEnabled={false}
      mezicasEnabled={true}
      stopEnabled={true}
      onStart={fakeOnStart}
      onAddMezicas={fakeOnAddMezicas}
      onStop={fakeOnStop}
    />,
    div
  );
});

it('po stopce', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <Stopky
      running={false}
      base={new Date()}
      startEnabled={true}
      mezicasEnabled={false}
      stopEnabled={false}
      onStart={fakeOnStart}
      onAddMezicas={fakeOnAddMezicas}
      onStop={fakeOnStop}
    />,
    div
  );
});
