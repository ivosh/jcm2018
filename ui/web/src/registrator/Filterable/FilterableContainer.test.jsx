import React from 'react';
import { shallow } from 'enzyme';
import configureStore from 'redux-mock-store';
import FilterableContainer from './FilterableContainer';

const mockStore = configureStore();

let store;
let wrapper;
beforeEach(() => {
  const state = {
    registrator: {
      yyyDigest: {
        kategorieFilter: '',
        textFilter: '',
      },
    },
  };
  store = mockStore(state);
  store.dispatch = jest.fn();
  wrapper = shallow(
    <FilterableContainer
      actionPrefix="YYY_DIGEST"
      reduxName="yyyDigest"
      numberOfItems={1}
      store={store}
    />
  );
});

it('maps state and dispatch to props', () => {
  expect(wrapper.props().kategorieFilter).toEqual('');
  expect(wrapper.props().textFilter).toEqual('');
});

it('maps onKategorieFilterChange to dispatch kategorieFilterChange action', () => {
  wrapper.props().onKategorieFilterChange('pěší');

  expect(store.dispatch).toHaveBeenCalledWith({
    type: 'YYY_DIGEST_KATEGORIE_FILTER_CHANGE',
    typKategorie: 'pěší',
  });
});

it('maps onTextFilterChange to dispatch textFilterChange action', () => {
  wrapper.props().onTextFilterChange('Kl');

  expect(store.dispatch).toHaveBeenCalledWith({
    type: 'YYY_DIGEST_TEXT_FILTER_CHANGE',
    textFilter: 'Kl',
  });
});
