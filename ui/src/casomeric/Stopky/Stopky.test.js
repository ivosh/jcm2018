import React from 'react';
import renderer from 'react-test-renderer';
import Stopky from './Stopky';

const fakeOnStart = () => ({});
const fakeOnAddMezicas = () => ({});
const fakeOnStop = () => ({});

it('před startem', () => {
  const component = renderer.create(
    <Stopky
      running={false}
      base={null}
      startEnabled={true}
      mezicasEnabled={false}
      stopEnabled={false}
      onStart={fakeOnStart}
      onAddMezicas={fakeOnAddMezicas}
      onStop={fakeOnStop}
    />
  );
  expect(component.toJSON()).toMatchSnapshot();
});

it('po startu', () => {
  const component = renderer.create(
    <Stopky
      running={true}
      base={new Date()}
      startEnabled={false}
      mezicasEnabled={true}
      stopEnabled={true}
      onStart={fakeOnStart}
      onAddMezicas={fakeOnAddMezicas}
      onStop={fakeOnStop}
    />
  );
  expect(component.toJSON()).toMatchSnapshot();
});

it('po stopce', () => {
  const component = renderer.create(
    <Stopky
      running={false}
      base={new Date()}
      startEnabled={true}
      mezicasEnabled={false}
      stopEnabled={false}
      onStart={fakeOnStart}
      onAddMezicas={fakeOnAddMezicas}
      onStop={fakeOnStop}
    />
  );
  expect(component.toJSON()).toMatchSnapshot();
});
