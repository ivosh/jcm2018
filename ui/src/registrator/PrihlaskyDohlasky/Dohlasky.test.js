import React from 'react';
import { MemoryRouter, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import configureStore from 'redux-mock-store';
import { mount } from 'enzyme';
import ucastniciTestData from '../../entities/ucastnici/ucastniciTestData';
import Dohlasky from './Dohlasky';
import PrihlaskyDohlaskyMain from './PrihlaskyDohlaskyMain';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const store = mockStore({
  ...ucastniciTestData,
  fetchingUcastnici: 'done',
  registrator: {
    dohlasky: {
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
    type: 'DOHLASKY_RESET',
    datum: '2018-06-09T00:00:00.000Z'
  });
  expect(store.dispatch).toHaveBeenCalledWith({ type: 'DOHLASKY_NOVA_PLATBA_RESET' });
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
    id: '6f09b1fd371dec1e99b7e1c9',
    type: 'DOHLASKY_UCASTNIK_LOAD',
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
