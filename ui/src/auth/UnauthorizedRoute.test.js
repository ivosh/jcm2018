import React from 'react';
import { Provider } from 'react-redux';
import renderer from 'react-test-renderer';
import MockRouter from 'react-mock-router';
import configureStore from 'redux-mock-store';
import LoadingIndicator from '../shared/LoadingIndicator';
import AuthorizedRoute from './AuthorizedRoute';

const mockStore = configureStore();

test('navigates to / when authenticated', () => {
  const store = mockStore({ auth: { authenticated: false } });

  const component = renderer.create(
    <Provider store={store}>
      <MockRouter>
        <AuthorizedRoute component={LoadingIndicator} />
      </MockRouter>
    </Provider>
  );

  expect(component.toJSON()).toMatchSnapshot();
});

test('shows wrapped component when not authenticated', () => {
  const store = mockStore({ auth: { authenticated: true } });

  const component = renderer.create(
    <Provider store={store}>
      <MockRouter>
        <AuthorizedRoute component={LoadingIndicator} />
      </MockRouter>
    </Provider>
  );

  expect(component.toJSON()).toMatchSnapshot();
});
