import React from 'react';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
import renderer from 'react-test-renderer';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import withFetchUcastnici from './withFetchUcastnici';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const Foo = ({ bar }) => <div>{bar}</div>;
Foo.propTypes = {
  bar: PropTypes.node.isRequired
};
const FooWithFetchUcastnici = withFetchUcastnici(Foo);

it('při načítání', () => {
  const store = mockStore({ fetching: true });
  store.dispatch = jest.fn();

  const component = renderer.create(
    <Provider store={store}>
      <FooWithFetchUcastnici bar="baz" />
    </Provider>
  );

  expect(store.dispatch).toHaveBeenCalledWith(expect.any(Function));
  expect(component.toJSON()).toMatchSnapshot();
});

it('po načtení', () => {
  const store = mockStore({ fetching: false });
  store.dispatch = jest.fn();

  const component = renderer.create(
    <Provider store={store}>
      <FooWithFetchUcastnici bar="baz" />
    </Provider>
  );

  expect(store.dispatch).toHaveBeenCalledWith(expect.any(Function));
  expect(component.toJSON()).toMatchSnapshot();
});
