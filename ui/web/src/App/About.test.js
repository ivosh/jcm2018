import React from 'react';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import About from './About';

it('it renders', () => {
  const wrapper = shallow(<About />);
  expect(toJSON(wrapper)).toMatchSnapshot();
});
