import React from 'react';
import { shallow } from 'enzyme';
import configureStore from 'redux-mock-store';
import ucastniciTestData from '../../entities/ucastnici/ucastniciTestData';
import StartujiciContainer from './StartujiciContainer';

const mockStore = configureStore();

let store;
let wrapper;
beforeEach(() => {
  const state = ucastniciTestData;
  store = mockStore(state);
  store.dispatch = jest.fn();
  wrapper = shallow(<StartujiciContainer store={store} />);
});

it('maps state and dispatch to props', () => {
  expect(wrapper.props().typy).toBeTruthy();
  expect(wrapper.props().typy).toMatchSnapshot();
});

it('maps onOdstartovaniChange to dispatch changeOdstartovani action', () => {
  wrapper.props().onOdstartovaniChange();

  expect(store.dispatch).toHaveBeenCalledWith({ type: 'STARTUJICI_CHANGE_ODSTARTOVANI' });
});
