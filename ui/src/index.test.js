import React from 'react';
import { Provider } from 'react-redux';
import { MemoryRouter, Route } from 'react-router-dom';
import { mount } from 'enzyme';
import configureStore from 'redux-mock-store';
import AppContainer from './App/AppContainer';

const mockStore = configureStore();
const store = mockStore({
  auth: {
    authenticated: true,
    decodedToken: null,
    token: null,
    signIn: { errorCode: '', errorMessage: '', isSigningIn: false, showError: false }
  },
  casomeric: { mezicasy: [], stopky: { base: null, running: false } },
  connected: true,
  entities: {
    kategorie: {},
    rocniky: { byRoky: {}, roky: [] },
    ucastnici: { allIds: [], byIds: {} }
  },
  registrator: {
    ucastniciDigest: {
      isFetching: false,
      kategorieVykonuFilter: '',
      sortColumn: undefined,
      sortDir: 'none',
      textFilter: ''
    }
  },
  startujici: []
});

test('navigates to /casomeric by default', () => {
  const wrapper = mount(
    <Provider store={store}>
      <MemoryRouter>
        <Route component={AppContainer} />
      </MemoryRouter>
    </Provider>
  );

  expect(wrapper.find('Stopky')).toHaveLength(1);
});

test('navigates correctly to /about', () => {
  const wrapper = mount(
    <Provider store={store}>
      <MemoryRouter initialEntries={['/about']}>
        <Route component={AppContainer} />
      </MemoryRouter>
    </Provider>
  );

  expect(wrapper.find('About')).toHaveLength(1);
});
