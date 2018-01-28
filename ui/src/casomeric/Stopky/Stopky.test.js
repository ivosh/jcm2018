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

  /* Manually set all Displej digits to 0. */
  const json = component.toJSON();
  const displej = json.children[0].children[0];
  expect(displej.props.className).toEqual('Displej');
  expect(displej.children).toHaveLength(7);
  displej.children[0].children[0] = '0';
  displej.children[2].children[0] = '00';
  displej.children[4].children[0] = '00';
  displej.children[6].children[0] = '00';
  expect(json).toMatchSnapshot();
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

  expect(onAddMezicas).toHaveBeenCalledTimes(1);
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

  expect(onStop).toHaveBeenCalledWith();
});
