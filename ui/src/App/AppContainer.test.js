import React from 'react';
import { shallow } from 'enzyme';
import configureStore from 'redux-mock-store';
import AppContainer from './AppContainer';

const mockStore = configureStore();

let store;
let wrapper;
beforeEach(() => {
  const state = { connected: true };
  store = mockStore(state);
  store.dispatch = jest.fn();
  wrapper = shallow(<AppContainer store={store} />);
});

it('maps state to props', () => {
  expect(wrapper.props().connected).toBe(true);
});
