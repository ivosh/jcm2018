import React from 'react';
import { mount } from 'enzyme';
import renderer from 'react-test-renderer';
import Timesync from './Timesync';

it('renders', () => {
  const component = renderer.create(
    <Timesync
      startEnabled={true}
      stopEnabled={false}
      timeOffset={5}
      onStart={jest.fn()}
      onStop={jest.fn()}
    />
  );
  expect(component.toJSON()).toMatchSnapshot();
});

it('maps button Start to dispatch onStart action', () => {
  const onStart = jest.fn();
  const wrapper = mount(
    <Timesync
      startEnabled={true}
      stopEnabled={false}
      timeOffset={-1}
      onStart={onStart}
      onStop={jest.fn()}
    />
  );
  expect(wrapper.find('button.btn-success')).toHaveLength(1);
  wrapper.find('button.btn-success').simulate('click');

  expect(onStart).toHaveBeenCalledWith();
});

it('maps button Stop to dispatch onStop action', () => {
  const onStop = jest.fn();
  const wrapper = mount(
    <Timesync
      startEnabled={false}
      stopEnabled={true}
      timeOffset={3}
      onStart={jest.fn()}
      onStop={onStop}
    />
  );
  expect(wrapper.find('button.btn-danger')).toHaveLength(1);
  wrapper.find('button.btn-danger').simulate('click');

  expect(onStop).toHaveBeenCalledWith();
});
