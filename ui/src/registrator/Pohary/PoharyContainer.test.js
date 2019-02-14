import React from 'react';
import { shallow } from 'enzyme';
import configureStore from 'redux-mock-store';
import ucastniciTestData from '../../entities/ucastnici/ucastniciTestData';
import PoharyContainer from './PoharyContainer';

const mockStore = configureStore();

let store;
let wrapper;
beforeEach(() => {
  const state = {
    ...ucastniciTestData,
    registrator: {
      pohary: {
        narokovaneFilter: true,
        neprevzateFilter: false,
        textFilter: ''
      }
    }
  };
  store = mockStore(state);
  store.dispatch = jest.fn();
  wrapper = shallow(<PoharyContainer store={store} />);
});

it('maps state and dispatch to props', () => {
  expect(wrapper.props().narokovaneFilter).toBe(true);
  expect(wrapper.props().neprevzateFilter).toBe(false);
  expect(wrapper.props().textFilter).toEqual('');
  expect(wrapper.props().pohary).toBeTruthy();
  expect(wrapper.props().pohary).toMatchSnapshot();
});

it('maps onNarokovaneFilterChange to dispatch narokovaneFilterChange action', () => {
  wrapper.props().onNarokovaneFilterChange();

  expect(store.dispatch).toHaveBeenCalledWith({ type: 'POHARY_NAROKOVANE_FILTER_CHANGE' });
});

it('maps onNeprevzateFilterChange to dispatch neprevzateFilterChange action', () => {
  wrapper.props().onNeprevzateFilterChange();

  expect(store.dispatch).toHaveBeenCalledWith({ type: 'POHARY_NEPREVZATE_FILTER_CHANGE' });
});

it('maps onTextFilterChange to dispatch textFilterChange action', () => {
  wrapper.props().onTextFilterChange('Kl');

  expect(store.dispatch).toHaveBeenCalledWith({
    type: 'POHARY_TEXT_FILTER_CHANGE',
    textFilter: 'Kl'
  });
});
