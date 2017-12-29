import React from 'react';
import { mount } from 'enzyme';
import toJSON from 'enzyme-to-json';
import UcastniciDigestResponsive from './UcastniciDigestResponsive';

const roky = [
  2001,
  2002,
  2003,
  2004,
  2005,
  2006,
  2007,
  2008,
  2009,
  2010,
  2011,
  2012,
  2013,
  2014,
  2015,
  2016,
  2017,
  2018
];
const ucastniciDigest = [];

it('renders', () => {
  global.window = { innerHeight: 700, innerWidth: 700 };
  const wrapper = mount(
    <div height={500} width={500}>
      <UcastniciDigestResponsive
        roky={roky}
        ucastniciDigest={ucastniciDigest}
        fetchUcastnici={jest.fn()}
        onSortDirChange={jest.fn()}
      />
    </div>
  );
  expect(toJSON(wrapper)).toMatchSnapshot();
});
