import React from 'react';
import { shallow } from 'enzyme';
import configureStore from 'redux-mock-store';
import ucastniciTestData from '../../entities/ucastnici/ucastniciTestData';
import PoznamkyContainer from './PoznamkyContainer';

const mockStore = configureStore();

let store;
let wrapper;
beforeEach(() => {
  const state = { ...ucastniciTestData };
  store = mockStore(state);
  store.dispatch = jest.fn();
  wrapper = shallow(<PoznamkyContainer id="8344bc71dec1e99b7e1d01e" store={store} />);
});

it('maps state to props', () => {
  expect(wrapper.props().poznamky).toBeTruthy();
  expect(wrapper.props().poznamky).toMatchSnapshot();
});
