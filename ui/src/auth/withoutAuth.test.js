import React from 'react';
import { Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import renderer from 'react-test-renderer';
import MockRouter from 'react-mock-router';
import configureStore from 'redux-mock-store';
import LoadingIndicator from '../App/LoadingIndicator';
import withoutAuth from './withoutAuth';

const mockStore = configureStore();

test('navigates to / when authenticated', () => {
  const store = mockStore({ auth: { authenticated: true } });
  const push = jest.fn();

  renderer.create(
    <Provider store={store}>
      <MockRouter push={push}>
        <Route component={withoutAuth(LoadingIndicator)} />
      </MockRouter>
    </Provider>
  );

  expect(push).toHaveBeenCalledWith('/');
});

test('shows wrapped component when not authenticated', () => {
  const store = mockStore({ auth: { authenticated: false } });
  const push = jest.fn();

  const component = renderer.create(
    <Provider store={store}>
      <MockRouter push={push}>
        <Route component={withoutAuth(LoadingIndicator)} />
      </MockRouter>
    </Provider>
  );

  expect(push).not.toHaveBeenCalled();
  expect(component.toJSON()).toMatchSnapshot();
});
