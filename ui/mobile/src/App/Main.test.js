import React from 'react';
import { Provider } from 'react-redux';
import renderer from 'react-test-renderer';
import configureStore from 'redux-mock-store';
import Main from './Main';

const mockStore = configureStore();
const state = { auth: { signIn: { signingIn: false } } };
const store = mockStore(state);

it('renders', () => {
  const component = renderer.create(
    <Provider store={store}>
      <Main />
    </Provider>
  );
  expect(component.toJSON()).toMatchSnapshot();
});
