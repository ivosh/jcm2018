import React from 'react';
import { shallow } from 'enzyme';
import configureStore from 'redux-mock-store';
import { API_MODIFY_UBYTOVANI, UBYTOVANI_ODHLASIT } from '../../common';
import { AKTUALNI_ROK } from '../../constants';
import ucastniciTestData from '../../entities/ucastnici/ucastniciTestData';
import { WS_API } from '../../store/wsAPI';
import { MODIFY_UBYTOVANI } from './UbytovaniActions';
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

  expect(store.dispatch).toHaveBeenCalledWith({ type: 'UBYTOVANI_CHANGE_FILTER' });
});

it('maps onTextFilterChange to dispatch textFilterChange action', () => {
  wrapper.props().onTextFilterChange('Kl');

  expect(store.dispatch).toHaveBeenCalledWith({
    type: 'UBYTOVANI_TEXT_FILTER_CHANGE',
    textFilter: 'Kl'
  });
});

it('maps onSelect to dispatch saveUbytovani action', () => {
  wrapper.props().ubytovani[0].akce.onSelect({ target: { value: UBYTOVANI_ODHLASIT } });

  expect(store.dispatch).toHaveBeenCalledWith({
    [WS_API]: {
      type: MODIFY_UBYTOVANI,
      endpoint: API_MODIFY_UBYTOVANI,
      normalize: expect.any(Function),
      request: {
        den: 'pátek',
        id: expect.any(String),
        modifikace: UBYTOVANI_ODHLASIT,
        rok: AKTUALNI_ROK
      },
      title: 'ukládání ubytování'
    }
  });
});
