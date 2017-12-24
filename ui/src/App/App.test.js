import React from 'react';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import App from './App';

it('with websocket connected', () => {
  const wrapper = shallow(<App connected={true} />);
  expect(toJSON(wrapper)).toMatchSnapshot();
});

it('with websocket disconnected', () => {
  const wrapper = shallow(<App connected={false} />);
  expect(toJSON(wrapper)).toMatchSnapshot();
});
