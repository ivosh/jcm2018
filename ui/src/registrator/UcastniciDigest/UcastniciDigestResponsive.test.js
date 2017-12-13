import React from 'react';
import { mount } from 'enzyme';
import toJSON from 'enzyme-to-json';
import configureStore from 'redux-mock-store';
import UcastniciDigestResponsive from './UcastniciDigestResponsive';

const mockStore = configureStore();

let store;
beforeEach(() => {
  const state = { ucastnici: { allIds: [], byIds: {} }, registrator: { ucastniciDigest: {} } };
  store = mockStore(state);
  store.dispatch = jest.fn();
});

it('renders', () => {
  global.window = { innerHeight: 700, innerWidth: 700 };
  const wrapper = mount(
    <div height={500} width={500}>
      <UcastniciDigestResponsive store={store} />
    </div>
  );
  expect(toJSON(wrapper)).toMatchSnapshot();
});
