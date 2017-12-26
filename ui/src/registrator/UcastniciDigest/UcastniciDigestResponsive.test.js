import React from 'react';
import { mount } from 'enzyme';
import toJSON from 'enzyme-to-json';
import UcastniciDigestResponsive from './UcastniciDigestResponsive';

const ucastniciDigest = [];

it('renders', () => {
  global.window = { innerHeight: 700, innerWidth: 700 };
  const wrapper = mount(
    <div height={500} width={500}>
      <UcastniciDigestResponsive
        ucastniciDigest={ucastniciDigest}
        fetchUcastnici={jest.fn()}
        onSortDirChange={jest.fn()}
      />
    </div>
  );
  expect(toJSON(wrapper)).toMatchSnapshot();
});
