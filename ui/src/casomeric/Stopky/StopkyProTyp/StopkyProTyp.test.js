import React from 'react';
import renderer from 'react-test-renderer';
import { mount } from 'enzyme';
import moment from 'moment';
import StopkyProTyp from './StopkyProTyp';

const funcs = [
  jest.fn(),
  jest.fn(),
  jest.fn(),
  jest.fn(),
  jest.fn(),
  jest.fn(),
  jest.fn(),
  jest.fn()
];

it('snapshot před startem', () => {
  const component = renderer.create(
    <StopkyProTyp
      running={false}
      base={null}
      delta={moment.duration('PT0H0M0.0S')}
      startEnabled={true}
      stopEnabled={false}
      typ="půlmaraton"
      onAdd={funcs}
      onStart={jest.fn()}
      onStop={jest.fn()}
      onSub={funcs}
    />
  );
  expect(component.toJSON()).toMatchSnapshot();
});

it('snapshort po startu', () => {
  const component = renderer.create(
    <StopkyProTyp
      running={true}
      base={new Date()}
      delta={moment.duration(0)}
      startEnabled={false}
      stopEnabled={true}
      typ="maraton"
      onAdd={funcs}
      onStart={jest.fn()}
      onStop={jest.fn()}
      onSub={funcs}
    />
  );

  /* Manually set all Displej digits to 0. */
  const json = component.toJSON();
  const displej = json.children[1].children[0];
  expect(displej.children).toHaveLength(21);
  expect(displej.children[7].props.className).toEqual('Displej__segment');
  displej.children[7].children[0] = '0';
  displej.children[9].children[0] = '00';
  displej.children[11].children[0] = '00';
  displej.children[13].children[0] = '00';
  expect(json).toMatchSnapshot();
});

it('maps button Start to dispatch onStart action', () => {
  const onStart = jest.fn();
  const wrapper = mount(
    <StopkyProTyp
      running={false}
      base={null}
      delta={moment.duration(0)}
      startEnabled={true}
      stopEnabled={false}
      typ="cyklo"
      onAdd={funcs}
      onStart={onStart}
      onStop={jest.fn()}
      onSub={funcs}
    />
  );
  expect(wrapper.find('button.btn-success')).toHaveLength(1);
  wrapper.find('button.btn-success').simulate('click');

  expect(onStart).toHaveBeenCalledWith();
});

it('maps button Stop to dispatch onStop action', () => {
  const onStop = jest.fn();
  const wrapper = mount(
    <StopkyProTyp
      running={true}
      base={new Date()}
      delta={moment.duration('PT2H15M34.72S')}
      startEnabled={false}
      stopEnabled={true}
      typ="koloběžka"
      onAdd={funcs}
      onStart={jest.fn()}
      onStop={onStop}
      onSub={funcs}
    />
  );
  expect(wrapper.find('button.btn-danger')).toHaveLength(1);
  wrapper.find('button.btn-danger').simulate('click');

  expect(onStop).toHaveBeenCalledWith();
});
