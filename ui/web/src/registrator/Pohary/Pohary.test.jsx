import React from 'react';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import Pohary from './Pohary';

it('dva nepřevzaté poháry', () => {
  const wrapper = shallow(<Pohary count={2} id="98abc09823e484af4c" type="nepřevzato" />);
  expect(toJSON(wrapper)).toMatchSnapshot();
});
