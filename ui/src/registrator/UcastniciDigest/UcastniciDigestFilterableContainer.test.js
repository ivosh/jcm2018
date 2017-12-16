import React from 'react';
import { shallow } from 'enzyme';
import configureStore from 'redux-mock-store';
import { SortDirTypes } from './ucastniciDigestReducer';
import UcastniciDigestFilterableContainer from './UcastniciDigestFilterableContainer';

const mockStore = configureStore();

let store;
let wrapper;
beforeEach(() => {
  const state = {
    registrator: {
      ucastniciDigest: { sortColumn: 'prijmeni', sortDir: SortDirTypes.DESC, filter: '' }
    }
  };
  store = mockStore(state);
  store.dispatch = jest.fn();
  wrapper = shallow(<UcastniciDigestFilterableContainer store={store} />);
});

it('maps state and dispatch to props', () => {
  expect(wrapper.props().filter).toEqual('');
  expect(wrapper.props().onFilterChange).toBeTruthy();
});

it('maps onFilterChange to dispatch sortDirChange action', () => {
  wrapper.props().onFilterChange('Kl');

  expect(store.dispatch).toHaveBeenCalledWith({
    type: 'UCASTNICI_DIGEST_FILTER_CHANGE',
    filter: 'Kl'
  });
});
