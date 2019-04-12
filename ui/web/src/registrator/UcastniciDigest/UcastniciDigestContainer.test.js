import React from 'react';
import { shallow } from 'enzyme';
import configureStore from 'redux-mock-store';
import ucastniciTestData from '../../entities/ucastnici/ucastniciTestData';
import UcastniciDigestContainer from './UcastniciDigestContainer';

const mockStore = configureStore();

let store;
let wrapper;
beforeEach(() => {
  const state = {
    ...ucastniciTestData,
    registrator: {
      ucastniciDigest: {
        kategorieFilter: '',
        textFilter: ''
      }
    }
  };
  store = mockStore(state);
  store.dispatch = jest.fn();
  wrapper = shallow(<UcastniciDigestContainer store={store} />);
});

it('maps state and dispatch to props', () => {
  expect(wrapper.props().ucastniciDigest).toBeTruthy();
  expect(wrapper.props().ucastniciDigest).toMatchSnapshot();
});
