import React from 'react';
import renderer from 'react-test-renderer';
import { mount } from 'enzyme';
import Stopky from './Stopky';

it('snapshot před startem', () => {
  const component = renderer.create(
    <Stopky
      running={false}
      base={null}
      startEnabled={true}
      mezicasEnabled={false}
      stopEnabled={false}
      onStart={jest.fn()}
      onAddMezicas={jest.fn()}
      onStop={jest.fn()}
    />
  );
  expect(component.toJSON()).toMatchSnapshot();
});

it('snapshort po startu', () => {
  const component = renderer.create(
    <Stopky
      running={true}
      base={new Date()}
      startEnabled={false}
      mezicasEnabled={true}
      stopEnabled={true}
      onStart={jest.fn()}
      onAddMezicas={jest.fn()}
      onStop={jest.fn()}
    />
  );
  expect(component.toJSON()).toMatchSnapshot();
});

it('maps button Start to dispatch onStart action', () => {
  const onStart = jest.fn();
  const wrapper = mount(
    <Stopky
      running={false}
      base={null}
      startEnabled={true}
      mezicasEnabled={false}
      stopEnabled={false}
      onStart={onStart}
      onAddMezicas={jest.fn()}
      onStop={jest.fn()}
    />
  );
  expect(wrapper.find('button.btn-success')).toHaveLength(1);
  wrapper.find('button.btn-success').simulate('click');

  expect(onStart).toHaveBeenCalledWith(expect.any(Date));
});

it('maps button Mezičas to dispatch onAddMezicas action', () => {
  const onAddMezicas = jest.fn();
  const wrapper = mount(
    <Stopky
      running={true}
      base={new Date()}
      startEnabled={false}
      mezicasEnabled={true}
      stopEnabled={true}
      onStart={jest.fn()}
      onAddMezicas={onAddMezicas}
      onStop={jest.fn()}
    />
  );
  expect(wrapper.find('button.btn-info')).toHaveLength(1);
  wrapper.find('button.btn-info').simulate('click');

  expect(onAddMezicas).toHaveBeenCalled();
});

it('maps button Stop to dispatch onStop action', () => {
  const onStop = jest.fn();
  const wrapper = mount(
    <Stopky
      running={true}
      base={new Date()}
      startEnabled={false}
      mezicasEnabled={true}
      stopEnabled={true}
      onStart={jest.fn()}
      onAddMezicas={jest.fn()}
      onStop={onStop}
    />
  );
  expect(wrapper.find('button.btn-danger')).toHaveLength(1);
  wrapper.find('button.btn-danger').simulate('click');

  expect(onStop).toHaveBeenCalled();
});
