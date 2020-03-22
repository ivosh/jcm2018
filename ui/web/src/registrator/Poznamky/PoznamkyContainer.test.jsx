import React from 'react';
import { shallow } from 'enzyme';
import configureStore from 'redux-mock-store';
import { API_ADD_POZNAMKA, API_DELETE_POZNAMKA, API_MODIFY_POZNAMKA } from 'ui-common/common';
import { WS_API } from 'ui-common/store/wsAPI';
import { AKTUALNI_ROK } from '../../constants';
import ucastniciTestData, {
  AKTUALNI_DATUM_KONANI,
} from '../../entities/ucastnici/ucastniciTestData';
import { POZNAMKA_ADD, POZNAMKA_DELETE, POZNAMKA_MODIFY } from './PoznamkyActions';
import PoznamkyContainer from './PoznamkyContainer';

const mockStore = configureStore();

let store;
let wrapper;
beforeEach(() => {
  const state = { ...ucastniciTestData };
  store = mockStore(state);
  store.dispatch = jest.fn();
  wrapper = shallow(<PoznamkyContainer id="8344bc71dec1e99b7e1d01e" store={store} />);
});

it('maps state to props', () => {
  expect(wrapper.props().poznamky).toBeTruthy();
  expect(wrapper.props().poznamky).toMatchSnapshot();
});

it('maps addPoznamka to dispatch POZNAMKA_ADD action', () => {
  wrapper.props().addPoznamka({ target: { value: 'text nějaké poznámky' } });

  expect(store.dispatch).toHaveBeenCalledWith({
    [WS_API]: {
      type: POZNAMKA_ADD,
      endpoint: API_ADD_POZNAMKA,
      normalize: expect.any(Function),
      request: {
        id: '8344bc71dec1e99b7e1d01e',
        poznamka: {
          datum: expect.any(String),
          text: 'text nějaké poznámky',
        },
        rok: AKTUALNI_ROK,
      },
      title: 'přidávání poznámky',
    },
  });
});

it('maps deletePoznamka to dispatch POZNAMKA_DELETE action', () => {
  wrapper.props().poznamky[1].deletePoznamka();

  expect(store.dispatch).toHaveBeenCalledWith({
    [WS_API]: {
      type: POZNAMKA_DELETE,
      endpoint: API_DELETE_POZNAMKA,
      normalize: expect.any(Function),
      request: {
        id: '8344bc71dec1e99b7e1d01e',
        index: 1,
        rok: AKTUALNI_ROK,
      },
      title: 'mazání poznámky',
    },
  });
});

it('maps modifyPoznamka to dispatch POZNAMKA_MODIFY action', () => {
  wrapper.props().poznamky[1].modifyPoznamka('text nějaké poznámky');

  expect(store.dispatch).toHaveBeenCalledWith({
    [WS_API]: {
      type: POZNAMKA_MODIFY,
      endpoint: API_MODIFY_POZNAMKA,
      normalize: expect.any(Function),
      request: {
        id: '8344bc71dec1e99b7e1d01e',
        index: 1,
        poznamka: {
          datum: AKTUALNI_DATUM_KONANI,
          text: 'text nějaké poznámky',
        },
        rok: AKTUALNI_ROK,
      },
      title: 'ukládání poznámky',
    },
  });
});
