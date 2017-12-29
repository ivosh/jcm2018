import React from 'react';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import UcastniciDigestFilterable from './UcastniciDigestFilterable';

jest.useFakeTimers();

const roky = [2001, 2002, 2003, 2004, 2005, 2006, 2007, 2008, 2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018];
const ucastniciDigest = [];

it('renders', () => {
  const wrapper = shallow(
    <UcastniciDigestFilterable
      roky={roky}
      ucastniciDigest={ucastniciDigest}
      onFilterChange={jest.fn()}
      fetchUcastnici={jest.fn()}
      onSortDirChange={jest.fn()}
    />
  );
  expect(toJSON(wrapper)).toMatchSnapshot();
});

it('maps onChange to dispatch onFilterChange action', () => {
  const onFilterChange = jest.fn();
  const wrapper = shallow(
    <UcastniciDigestFilterable
      roky={roky}
      ucastniciDigest={ucastniciDigest}
      onFilterChange={onFilterChange}
      fetchUcastnici={jest.fn()}
      onSortDirChange={jest.fn()}
    />
  );
  expect(wrapper.find('.UcastniciDigestFilterable_input')).toHaveLength(1);
  wrapper.find('.UcastniciDigestFilterable_input').simulate('change', { target: { value: 'K' } });

  jest.runAllTimers();
  expect(onFilterChange).toHaveBeenCalled();
});
