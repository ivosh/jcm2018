import React from 'react';
import { Provider } from 'react-redux';
import { MemoryRouter, Route } from 'react-router-dom';
import { mount } from 'enzyme';
import configureStore from 'redux-mock-store';
import AppContainer from './App/AppContainer';

const mockStore = configureStore();
const store = mockStore({
  casomeric: { mezicasy: [], stopky: { base: null, running: false } },
  registrator: { ucastniciDigest: { filter: '', sortColumn: undefined, sortDir: 'none' } },
  startujici: [],
  ucastnici: { allIds: [], byIds: {} },
  connected: true
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

test('navigates correctly to /registrace', () => {
  const wrapper = mount(
    <Provider store={store}>
      <MemoryRouter initialEntries={['/registrace']}>
        <Route component={AppContainer} />
      </MemoryRouter>
    </Provider>
  );

  expect(wrapper.find('Registrace')).toHaveLength(1);
});
