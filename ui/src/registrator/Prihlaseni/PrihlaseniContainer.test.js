import React from 'react';
import { shallow } from 'enzyme';
import configureStore from 'redux-mock-store';
import ucastniciTestData from '../../entities/ucastnici/ucastniciTestData';
import PrihlaseniContainer from './PrihlaseniContainer';

const mockStore = configureStore();

let store;
let wrapper;
beforeEach(() => {
  const state = {
    ...ucastniciTestData,
    registrator: {
      prihlaseni: {
        kategorieFilter: '',
        textFilter: ''
      }
    }
  };
  store = mockStore(state);
  store.dispatch = jest.fn();
  wrapper = shallow(<PrihlaseniContainer store={store} />);
});

it('maps state and dispatch to props', () => {
  expect(wrapper.props().prihlaseni).toBeTruthy();
  expect(wrapper.props().prihlaseni).toMatchSnapshot();
});
