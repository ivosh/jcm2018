import React from 'react';
import renderer from 'react-test-renderer';
import { mount } from 'enzyme';
import Stopky from './Stopky';

it('snapshot před startem', () => {
  const component = renderer.create(
    <Stopky running={false} base={null} mezicasEnabled={false} onAddMezicas={jest.fn()} />
  );
  expect(component.toJSON()).toMatchSnapshot();
});

it('snapshort po startu', () => {
  const component = renderer.create(
    <Stopky running={true} base={new Date()} mezicasEnabled={true} onAddMezicas={jest.fn()} />
  );

  /* Manually set all Displej digits to 0. */
  const json = component.toJSON();
  const displej = json.children[0];
  expect(displej.children).toHaveLength(7);
  expect(displej.children[0].props.className).toEqual('Displej__segment');
  displej.children[0].children[0] = '0';
  displej.children[2].children[0] = '00';
  displej.children[4].children[0] = '00';
  displej.children[6].children[0] = '00';
  expect(json).toMatchSnapshot();
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
