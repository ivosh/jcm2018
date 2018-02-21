import React from 'react';
import { shallow } from 'enzyme';
import configureStore from 'redux-mock-store';
import ucastniciTestData from '../../entities/ucastnici/ucastniciTestData';
import StartujiciContainer from './StartujiciContainer';

const mockStore = configureStore();

let store;
beforeEach(() => {
  const state = ucastniciTestData;
  store = mockStore(state);
  store.dispatch = jest.fn();
});

it('maps state to props', () => {
  const wrapper = shallow(<StartujiciContainer store={store} />);
  expect(wrapper.props().typy).toBeTruthy();
  expect(wrapper.props().typy).toMatchSnapshot();
});
