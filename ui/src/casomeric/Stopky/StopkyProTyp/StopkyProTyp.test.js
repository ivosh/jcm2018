import React from 'react';
import renderer from 'react-test-renderer';
import { mount } from 'enzyme';
import moment from 'moment';
import StopkyProTyp from './StopkyProTyp';

const cudl = { popisek: '+X', step: 10, onClick: jest.fn() };
const cudly = [
  cudl,
  cudl,
  cudl,
  cudl,
  cudl,
  cudl,
  cudl,
  cudl,
  cudl,
  cudl,
  cudl,
  cudl,
  cudl,
  cudl,
  cudl,
  cudl
];

const rozdily = [
  { name: 'maraton', rozdil: { hours: '-', mins: '--', secs: '--', subsecs: '--' } },
  { name: 'půlmaraton', rozdil: { hours: '1', mins: '57', secs: '45', subsecs: '40' } },
  { name: 'koloběžka', rozdil: { hours: '0', mins: '14', secs: '46', subsecs: '80' } }
];

it('snapshot před startem', () => {
  const component = renderer.create(
    <StopkyProTyp
      running={false}
      base={null}
      cudly={cudly}
      delta={moment.duration('PT0H0M0.0S')}
      rozdily={rozdily}
      startEnabled={true}
      stopEnabled={false}
      typ="půlmaraton"
      onStart={jest.fn()}
      onStop={jest.fn()}
    />
  );
  expect(component.toJSON()).toMatchSnapshot();
});

it('snapshort po startu', () => {
  const component = renderer.create(
    <StopkyProTyp
      running={true}
      base={new Date()}
      cudly={cudly}
      delta={moment.duration(0)}
      rozdily={rozdily}
      startEnabled={false}
      stopEnabled={true}
      typ="maraton"
      onStart={jest.fn()}
      onStop={jest.fn()}
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
      cudly={cudly}
      delta={moment.duration(0)}
      rozdily={rozdily}
      startEnabled={true}
      stopEnabled={false}
      typ="cyklo"
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
    <StopkyProTyp
      running={true}
      base={new Date()}
      cudly={cudly}
      delta={moment.duration('PT2H15M34.72S')}
      rozdily={rozdily}
      startEnabled={false}
      stopEnabled={true}
      typ="koloběžka"
      onStart={jest.fn()}
      onStop={onStop}
    />
  );
  expect(wrapper.find('button.btn-danger')).toHaveLength(1);
  wrapper.find('button.btn-danger').simulate('click');

  expect(onStop).toHaveBeenCalledWith();
});
