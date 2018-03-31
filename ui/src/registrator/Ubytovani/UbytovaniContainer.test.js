import React from 'react';
import { shallow } from 'enzyme';
import configureStore from 'redux-mock-store';
import ucastniciTestData from '../../entities/ucastnici/ucastniciTestData';
import UbytovaniContainer from './UbytovaniContainer';

const mockStore = configureStore();

let store;
let wrapper;
beforeEach(() => {
  const state = {
    ...ucastniciTestData,
    registrator: {
      ubytovani: {
        loading: {},
        jenUbytovani: true,
        textFilter: ''
      }
    }
  };
  store = mockStore(state);
  store.dispatch = jest.fn();
  wrapper = shallow(<UbytovaniContainer store={store} />);
});

it('maps state and dispatch to props', () => {
  expect(wrapper.props().jenUbytovani).toBe(true);
  expect(wrapper.props().textFilter).toEqual('');
  expect(wrapper.props().ubytovani).toBeTruthy();
  expect(wrapper.props().ubytovani).toMatchSnapshot();
});

it('maps onUbytovaniChange to dispatch changeUbytovani action', () => {
  wrapper.props().onUbytovaniChange();

  expect(store.dispatch).toHaveBeenCalledWith({ type: 'UBYTOVANI_CHANGE_UBYTOVANI' });
});

it('maps onTextFilterChange to dispatch textFilterChange action', () => {
  wrapper.props().onTextFilterChange('Kl');

  expect(store.dispatch).toHaveBeenCalledWith({
    type: 'UBYTOVANI_TEXT_FILTER_CHANGE',
    textFilter: 'Kl'
  });
});

it('maps onSelect to dispatch saveUbytovani action', () => {
  wrapper.props().ubytovani[0].akce.onSelect({ target: { value: 'Odhlásit' } });

  expect(store.dispatch).toHaveBeenCalledWith(expect.any(Function));
});
