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
        fetching: false,
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
  expect(wrapper.props().fetching).toBe(false);
  expect(wrapper.props().prihlaseni).toBeTruthy();
  expect(wrapper.props().prihlaseni).toMatchSnapshot();
});

it('maps fetchUcastnici to dispatch', () => {
  wrapper.props().fetchUcastnici();

  expect(store.dispatch).toHaveBeenCalledWith(expect.any(Function));
});
