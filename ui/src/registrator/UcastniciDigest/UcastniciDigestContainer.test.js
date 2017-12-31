import React from 'react';
import { shallow } from 'enzyme';
import configureStore from 'redux-mock-store';
import { SortDirTypes } from './ucastniciDigestReducer';
import UcastniciDigestContainer from './UcastniciDigestContainer';

const mockStore = configureStore();

let store;
let wrapper;
beforeEach(() => {
  const state = {
    entities: {
      rocniky: {
        roky: [2016, 2017, 2018]
      },
      ucastnici: {
        allIds: ['6f09b1fd371dec1e99b7e1c9', '5a09b1fd371dec1e99b7e1c9'],
        byIds: {
          '6f09b1fd371dec1e99b7e1c9': {
            roky: [2016],
            2016: {
              udaje: {
                prijmeni: 'Sukdoláková',
                jmeno: 'Martina',
                narozeni: { rok: 1963 },
                pohlavi: 'zena',
                obec: 'Zlín',
                stat: 'Česká republika'
              }
            }
          },
          '5a09b1fd371dec1e99b7e1c9': {
            roky: [2018, 2017],
            2018: {
              udaje: {
                prijmeni: 'Balabák',
                jmeno: 'Roman',
                narozeni: { rok: 1956, mesic: 5, den: 15 },
                pohlavi: 'muz',
                obec: 'Ostrava 2',
                stat: 'Česká republika'
              }
            },
            2017: {
              udaje: {
                prijmeni: 'Balabák',
                jmeno: 'Roman',
                narozeni: { rok: 1956 },
                pohlavi: 'muz',
                obec: 'Ostrava 1',
                stat: 'Česká republika'
              }
            }
          }
        }
      }
    },
    registrator: {
      ucastniciDigest: { sortColumn: 'prijmeni', sortDir: SortDirTypes.DESC, textFilter: '' }
    }
  };
  store = mockStore(state);
  store.dispatch = jest.fn();
  wrapper = shallow(
    <UcastniciDigestContainer store={store} containerWidth={500} containerHeight={500} />
  );
});

it('maps state and dispatch to props', () => {
  expect(wrapper.props().ucastniciDigest).toBeTruthy();
  expect(wrapper.props().ucastniciDigest).toMatchSnapshot();
  expect(wrapper.props().textFilter).toEqual('');
  expect(wrapper.props().sortColumn).toEqual('prijmeni');
  expect(wrapper.props().sortDir).toEqual('desc');
});

it('maps onSortDirChange to dispatch sortDirChange action', () => {
  wrapper.props().onSortDirChange('jmeno');

  expect(store.dispatch).toHaveBeenCalledWith({
    type: 'UCASTNICI_DIGEST_SORT_DIR_CHANGE',
    sortColumn: 'jmeno'
  });
});

it('maps onFilterChange to dispatch sortDirChange action', () => {
  wrapper.props().onTextFilterChange('Kl');

  expect(store.dispatch).toHaveBeenCalledWith({
    type: 'UCASTNICI_DIGEST_TEXT_FILTER_CHANGE',
    textFilter: 'Kl'
  });
});
