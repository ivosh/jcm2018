import React from 'react';
import { shallow } from 'enzyme';
import configureStore from 'redux-mock-store';
import { API_DELETE_VYKON, API_SAVE_VYKON } from '../../common';
import { AKTUALNI_ROK } from '../../constants';
import ucastniciTestData from '../../entities/ucastnici/ucastniciTestData';
import { WS_API } from '../../store/wsAPI';
import { STARTUJICI_CREATE_VYKON, STARTUJICI_DELETE_VYKON } from './StartujiciActions';
import StartujiciContainer from './StartujiciContainer';

const mockStore = configureStore();

let store;
let wrapper;
beforeEach(() => {
  const state = { ...ucastniciTestData };
  store = mockStore(state);
  store.dispatch = jest.fn();
  wrapper = shallow(<StartujiciContainer store={store} />);
});

it('maps state to props', () => {
  expect(wrapper.props().prihlaseni).toBeTruthy();
  expect(wrapper.props().prihlaseni).toMatchSnapshot();
  expect(wrapper.props().odstartovani).toBeTruthy();
  expect(wrapper.props().odstartovani).toMatchSnapshot();
});

it('maps movePrihlasen to dispatch createVykon', () => {
  wrapper.props().movePrihlasen('8344bc71dec1e99b7e1d01e');

  expect(store.dispatch).toHaveBeenCalledWith({
    [WS_API]: {
      type: STARTUJICI_CREATE_VYKON,
      endpoint: API_SAVE_VYKON,
      request: expect.any(Function),
      title: 'vytváření registrace na start'
    }
  });
});

it('maps moveOdstartovan to dispatch deleteVykon', () => {
  wrapper.props().moveOdstartovan('8344bc71dec1e99b7e1d01e');

  expect(store.dispatch).toHaveBeenCalledWith({
    [WS_API]: {
      type: STARTUJICI_DELETE_VYKON,
      endpoint: API_DELETE_VYKON,
      request: { id: '8344bc71dec1e99b7e1d01e', rok: AKTUALNI_ROK },
      title: 'rušení registrace na start'
    }
  });
});
