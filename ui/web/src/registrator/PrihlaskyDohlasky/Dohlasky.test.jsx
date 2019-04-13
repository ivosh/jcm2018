import React from 'react';
import { MemoryRouter, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import configureStore from 'redux-mock-store';
import { mount } from 'enzyme';
import { ActionPrefixes, ReduxNames } from '../../constants';
import ucastniciTestData, {
  AKTUALNI_DATUM_KONANI
} from '../../entities/ucastnici/ucastniciTestData';
import Dohlasky from './Dohlasky';
import PrihlaskyDohlaskyMain from './PrihlaskyDohlaskyMain';

const actionPrefix = ActionPrefixes.DOHLASKY;
const middlewares = [thunk];
const mockStore = configureStore(middlewares);
const reduxName = ReduxNames.dohlasky;

const store = mockStore({
  ...ucastniciTestData,
  fetchingUcastnici: 'done',
  registrator: {
    [reduxName]: {
      form: {
        saved: false,
        saving: false,
        udaje: { narozeni: {} },
        prihlaska: {},
        platby: [],
        ubytovani: {}
      },
      platby: {
        novaPlatbaMinified: true
      },
      startCislo: { showing: false }
    }
  }
});

it('renders /dohlasky route', () => {
  const wrapper = mount(
    <Provider store={store}>
      <MemoryRouter initialEntries={['/dohlasky']}>
        <Route path="/dohlasky" component={Dohlasky} />
      </MemoryRouter>
    </Provider>
  );

  expect(wrapper.find(PrihlaskyDohlaskyMain)).toHaveLength(1);
});

it('renders /dohlasky/edit route', () => {
  store.dispatch = jest.fn();
  const wrapper = mount(
    <Provider store={store}>
      <MemoryRouter initialEntries={['/dohlasky/edit']}>
        <Route path="/dohlasky" component={Dohlasky} />
      </MemoryRouter>
    </Provider>
  );

  expect(wrapper.find('Connect(PrihlaskyForm)')).toHaveLength(1);
  expect(wrapper.find('Connect(PrihlaskyForm)').props()).toMatchSnapshot();
  expect(store.dispatch).toHaveBeenCalledTimes(1); // fetchUcastnici
});

it('renders /dohlasky/reset route', () => {
  store.dispatch = jest.fn();
  const wrapper = mount(
    <Provider store={store}>
      <MemoryRouter initialEntries={['/dohlasky/reset']}>
        <Route path="/dohlasky" component={Dohlasky} />
      </MemoryRouter>
    </Provider>
  );

  expect(wrapper.find('Connect(PrihlaskyForm)')).toHaveLength(1);
  expect(wrapper.find('Connect(PrihlaskyForm)').props()).toMatchSnapshot();
  expect(store.dispatch).toHaveBeenCalledTimes(3); // fetchUcastnici + Form/reset + Platby/reset
  expect(store.dispatch).toHaveBeenCalledWith({
    type: `${actionPrefix}_RESET`,
    datumKonani: AKTUALNI_DATUM_KONANI
  });
  expect(store.dispatch).toHaveBeenCalledWith({
    type: `${actionPrefix}_NOVA_PLATBA_RESET`,
    datumKonani: AKTUALNI_DATUM_KONANI
  });
});

it('renders /dohlasky/:id route', () => {
  store.dispatch = jest.fn();
  const wrapper = mount(
    <Provider store={store}>
      <MemoryRouter initialEntries={['/dohlasky/6f09b1fd371dec1e99b7e1c9']}>
        <Route path="/dohlasky" component={Dohlasky} />
      </MemoryRouter>
    </Provider>
  );

  expect(wrapper.find('Connect(PrihlaskyForm)')).toHaveLength(1);
  expect(wrapper.find('Connect(PrihlaskyForm)').props()).toMatchSnapshot();
  expect(store.dispatch).toHaveBeenCalledTimes(2); // fetchUcastnici + load
  expect(store.dispatch).toHaveBeenCalledWith({
    datumKonani: AKTUALNI_DATUM_KONANI,
    id: '6f09b1fd371dec1e99b7e1c9',
    type: `${actionPrefix}_UCASTNIK_LOAD`,
    udaje: {
      jmeno: 'Martina',
      narozeni: { den: 7, mesic: 12, rok: 1963 },
      obec: 'Zlín',
      pohlavi: 'žena',
      prijmeni: 'Sukdoláková',
      stat: 'Česká republika'
    }
  });
});
