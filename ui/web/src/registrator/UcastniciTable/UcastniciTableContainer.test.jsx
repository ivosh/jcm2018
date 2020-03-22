import React from 'react';
import { shallow } from 'enzyme';
import configureStore from 'redux-mock-store';
import { SortDirTypes } from '../../sort';
import UcastniciTableContainer from './UcastniciTableContainer';

const mockStore = configureStore();

const columns = [];
const data = [];

let store;
let wrapper;
beforeEach(() => {
  const state = {
    registrator: {
      yyyDigest: {
        sortColumn: 'prijmeni',
        sortDir: SortDirTypes.DESC,
      },
    },
  };
  store = mockStore(state);
  store.dispatch = jest.fn();
  wrapper = shallow(
    <UcastniciTableContainer
      actionPrefix="YYY_DIGEST"
      columns={columns}
      data={data}
      fixedColumnCount={0}
      reduxName="yyyDigest"
      rowHeight={30}
      store={store}
    />
  );
});

it('maps state and dispatch to props', () => {
  expect(wrapper.props().sortColumn).toEqual('prijmeni');
  expect(wrapper.props().sortDir).toEqual('desc');
});

it('maps onSortDirChange to dispatch sortDirChange action', () => {
  wrapper.props().onSortDirChange('jmeno');

  expect(store.dispatch).toHaveBeenCalledWith({
    type: 'YYY_DIGEST_SORT_DIR_CHANGE',
    sortColumn: 'jmeno',
  });
});
