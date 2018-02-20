import React from 'react';
import { MemoryRouter, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { mount } from 'enzyme';
import ucastniciTestData from '../../entities/ucastnici/ucastniciTestData';
import Prihlasky from './Prihlasky';
import PrihlaskyMain from './PrihlaskyMain';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const store = mockStore({
  ...ucastniciTestData,
  fetching: 'done',
  registrator: {
    prihlasky: {
      form: {
        saved: false,
        saving: false,
        udaje: { narozeni: {} },
        prihlaska: {},
        platby: [],
        novaPlatba: {}
      }
    }
  }
});

it('renders /prihlasky route', () => {
  store.dispatch = jest.fn();
  const wrapper = mount(
    <Provider store={store}>
      <MemoryRouter initialEntries={['/prihlasky']}>
        <Route path="/prihlasky" component={Prihlasky} />
      </MemoryRouter>
    </Provider>
  );

  expect(wrapper.find(PrihlaskyMain)).toHaveLength(1);
  expect(store.dispatch).toHaveBeenCalledTimes(1); // fetchUcastnici
});

it('renders /prihlasky/edit route', () => {
  store.dispatch = jest.fn();
  const wrapper = mount(
    <Provider store={store}>
      <MemoryRouter initialEntries={['/prihlasky/edit']}>
        <Route path="/prihlasky" component={Prihlasky} />
      </MemoryRouter>
    </Provider>
  );

  expect(wrapper.find('Connect(PrihlaskyForm)')).toHaveLength(1);
  expect(wrapper.find('Connect(PrihlaskyForm)').props()).toMatchSnapshot();
  expect(store.dispatch).toHaveBeenCalledTimes(1); // fetchUcastnici
});

it('renders /prihlasky/reset route', () => {
  store.dispatch = jest.fn();
  const wrapper = mount(
    <Provider store={store}>
      <MemoryRouter initialEntries={['/prihlasky/reset']}>
        <Route path="/prihlasky" component={Prihlasky} />
      </MemoryRouter>
    </Provider>
  );

  expect(wrapper.find('Connect(PrihlaskyForm)')).toHaveLength(1);
  expect(wrapper.find('Connect(PrihlaskyForm)').props()).toMatchSnapshot();
  expect(store.dispatch).toHaveBeenCalledTimes(2); // fetchUcastnici + reset
  expect(store.dispatch).toHaveBeenCalledWith({ type: 'PRIHLASKY_RESET' });
});

it('renders /prihlasky/:id route', () => {
  store.dispatch = jest.fn();
  const wrapper = mount(
    <Provider store={store}>
      <MemoryRouter initialEntries={['/prihlasky/6f09b1fd371dec1e99b7e1c9']}>
        <Route path="/prihlasky" component={Prihlasky} />
      </MemoryRouter>
    </Provider>
  );

  expect(wrapper.find('Connect(PrihlaskyForm)')).toHaveLength(1);
  expect(wrapper.find('Connect(PrihlaskyForm)').props()).toMatchSnapshot();
  expect(store.dispatch).toHaveBeenCalledTimes(2); // fetchUcastnici + reset
  expect(store.dispatch).toHaveBeenCalledWith({
    id: '6f09b1fd371dec1e99b7e1c9',
    type: 'PRIHLASKY_UCASTNIK_LOAD',
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
