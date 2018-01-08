import React from 'react';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import App from './App';

it('with websocket connected, authenticated', () => {
  const wrapper = shallow(<App authenticated={true} connected={true} />);
  expect(toJSON(wrapper)).toMatchSnapshot();
});

it('with websocket disconnected, authenticated', () => {
  const wrapper = shallow(<App authenticated={true} connected={false} />);
  expect(toJSON(wrapper)).toMatchSnapshot();
});

it('with websocket connected, not authenticated', () => {
  const wrapper = shallow(<App authenticated={false} connected={true} />);
  expect(toJSON(wrapper)).toMatchSnapshot();
});
