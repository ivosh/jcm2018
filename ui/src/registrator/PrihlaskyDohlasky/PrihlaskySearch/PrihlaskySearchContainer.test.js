import React from 'react';
import { shallow } from 'enzyme';
import configureStore from 'redux-mock-store';
import ucastniciTestData from '../../../entities/ucastnici/ucastniciTestData';
import PrihlaskySearchContainer from './PrihlaskySearchContainer';

const mockStore = configureStore();

let routeOnSelect;
let store;
let wrapper;
beforeEach(() => {
  const state = { ...ucastniciTestData };
  store = mockStore(state);
  store.dispatch = jest.fn();
  routeOnSelect = jest.fn();
  wrapper = shallow(<PrihlaskySearchContainer routeOnSelect={routeOnSelect} store={store} />);
});

it('maps state and dispatch to props', () => {
  expect(wrapper.props().options).toMatchSnapshot();
  expect(wrapper.props().onSelect).toEqual(expect.any(Function));
});

it('maps onSelect to dispatch ucastnikSelected action - existující přihláška', () => {
  wrapper.props().onSelect({ id: '5a09b1fd371dec1e99b7e1c9' });

  expect(routeOnSelect).toHaveBeenCalledWith('5a09b1fd371dec1e99b7e1c9');
});

it('maps onSelect to dispatch ucastnikSelected action - starší účast', () => {
  wrapper.props().onSelect({ id: '6f09b1fd371dec1e99b7e1c9' });

  expect(routeOnSelect).toHaveBeenCalledWith('6f09b1fd371dec1e99b7e1c9');
});
