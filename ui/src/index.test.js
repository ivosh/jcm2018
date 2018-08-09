import React from 'react';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { MemoryRouter, Route } from 'react-router-dom';
import { mount } from 'enzyme';
import configureStore from 'redux-mock-store';
import AppContainer from './App/AppContainer';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);
const store = mockStore({
  auth: {
    authenticated: true,
    decodedToken: null,
    token: null,
    signIn: { errorCode: '', errorMessage: '', signingIn: false, showError: false }
  },
  casomeric: { mezicasy: [], stopky: { base: null, running: false } },
  connected: true,
  entities: {
    kategorie: {},
    rocniky: { byRoky: {}, roky: [] },
    ucastnici: { allIds: [], byIds: {} }
  },
  error: { code: '', message: '', show: false },
  fetchingStopky: 'done',
  fetchingUcastnici: 'done',
  registrator: {
    prihlaseni: {
      kategorieFilter: '',
      sortColumn: undefined,
      sortDir: 'none',
      textFilter: ''
    },
    ucastniciDigest: {
      kategorieFilter: '',
      sortColumn: undefined,
      sortDir: 'none',
      textFilter: ''
    }
  },
  startujici: []
});

test('navigates to / by default', () => {
  const wrapper = mount(
    <Provider store={store}>
      <MemoryRouter>
        <Route component={AppContainer} />
      </MemoryRouter>
    </Provider>
  );

  expect(wrapper.find('Main')).toHaveLength(1);
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
