import React from 'react';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
import renderer from 'react-test-renderer';
import configureStore from 'redux-mock-store';
import AuthorizedRoute from './AuthorizedRoute';

const mockStore = configureStore();
const navigation = { navigate: jest.fn() };

const MockComponent = ({ text }) => <div>{text}</div>;
MockComponent.propTypes = { text: PropTypes.string.isRequired };

test('navigates to Auth when not authenticated', () => {
  const store = mockStore({ auth: { authenticated: false } });

  const component = renderer.create(
    <Provider store={store}>
      <AuthorizedRoute component={MockComponent} navigation={navigation} text="super secret" />
    </Provider>
  );

  expect(component.toJSON()).toMatchSnapshot();
});

test('shows wrapped component when authenticated', () => {
  const store = mockStore({ auth: { authenticated: true } });

  const component = renderer.create(
    <Provider store={store}>
      <AuthorizedRoute component={MockComponent} navigation={navigation} text="super secret" />
    </Provider>
  );

  expect(component.toJSON()).toMatchSnapshot();
});
