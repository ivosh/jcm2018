import React from 'react';
import { Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import renderer from 'react-test-renderer';
import MockRouter from 'react-mock-router';
import configureStore from 'redux-mock-store';
import LoadingIndicator from '../shared/LoadingIndicator';
import withAuth from './withAuth';

const mockStore = configureStore();

test('navigates to /signin when not authenticated', () => {
  const store = mockStore({ auth: { authenticated: false } });
  const push = jest.fn();

  renderer.create(
    <Provider store={store}>
      <MockRouter push={push}>
        <Route component={withAuth(LoadingIndicator)} />
      </MockRouter>
    </Provider>
  );

  expect(push).toHaveBeenCalledWith('/signin');
});

test('shows wrapped component when authenticated', () => {
  const store = mockStore({ auth: { authenticated: true } });
  const push = jest.fn();

  const component = renderer.create(
    <Provider store={store}>
      <MockRouter push={push}>
        <Route component={withAuth(LoadingIndicator)} />
      </MockRouter>
    </Provider>
  );

  expect(push).not.toHaveBeenCalled();
  expect(component.toJSON()).toMatchSnapshot();
});
