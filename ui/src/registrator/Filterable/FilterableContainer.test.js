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
        kategorieVykonuFilter: '',
        textFilter: ''
      }
    }
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
  expect(wrapper.props().kategorieVykonuFilter).toEqual('');
  expect(wrapper.props().textFilter).toEqual('');
});

it('maps onKategorieVykonuFilterChange to dispatch kategorieVykonuFilterChange action', () => {
  wrapper.props().onKategorieVykonuFilterChange('pěší');

  expect(store.dispatch).toHaveBeenCalledWith({
    type: 'YYY_DIGEST_KATEGORIE_VYKONU_FILTER_CHANGE',
    typKategorie: 'pěší'
  });
});

it('maps onTextFilterChange to dispatch textFilterChange action', () => {
  wrapper.props().onTextFilterChange('Kl');

  expect(store.dispatch).toHaveBeenCalledWith({
    type: 'YYY_DIGEST_TEXT_FILTER_CHANGE',
    textFilter: 'Kl'
  });
});
