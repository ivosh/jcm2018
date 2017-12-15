import React from 'react';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import UcastniciDigestFilterable from './UcastniciDigestFilterable';

jest.useFakeTimers();

it('renders', () => {
  const wrapper = shallow(<UcastniciDigestFilterable onFilterChange={jest.fn()} />);
  expect(toJSON(wrapper)).toMatchSnapshot();
});

it('maps onChange to dispatch onFilterChange action', () => {
  const onFilterChange = jest.fn();
  const wrapper = shallow(<UcastniciDigestFilterable onFilterChange={onFilterChange} />);
  expect(wrapper.find('.UcastniciDigestFilterable_input')).toHaveLength(1);
  wrapper.find('.UcastniciDigestFilterable_input').simulate('change', { target: { value: 'K' } });

  jest.runAllTimers();
  expect(onFilterChange).toHaveBeenCalled();
});
