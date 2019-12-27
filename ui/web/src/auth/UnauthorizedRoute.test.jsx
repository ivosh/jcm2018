import React from 'react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import renderer from 'react-test-renderer';
import configureStore from 'redux-mock-store';
import LoadingIndicator from '../shared/LoadingIndicator';
import AuthorizedRoute from './AuthorizedRoute';

const mockStore = configureStore();

test('navigates to / when authenticated', () => {
  const store = mockStore({ auth: { authenticated: false } });

  const component = renderer.create(
    <Provider store={store}>
      <MemoryRouter>
        <AuthorizedRoute component={LoadingIndicator} />
      </MemoryRouter>
    </Provider>
  );

  expect(component.toJSON()).toMatchSnapshot();
});

test('shows wrapped component when not authenticated', () => {
  const store = mockStore({ auth: { authenticated: true } });

  const component = renderer.create(
    <Provider store={store}>
      <MemoryRouter>
        <AuthorizedRoute component={LoadingIndicator} />
      </MemoryRouter>
    </Provider>
  );

  expect(component.toJSON()).toMatchSnapshot();
});
