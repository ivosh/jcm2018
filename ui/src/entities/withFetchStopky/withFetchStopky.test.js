import React from 'react';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
import renderer from 'react-test-renderer';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import withFetchStopky from './withFetchStopky';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const Foo = ({ bar }) => <div>{bar}</div>;
Foo.propTypes = {
  bar: PropTypes.node.isRequired
};
const FooWithFetchStopky = withFetchStopky(Foo);

it('na začátku', () => {
  const store = mockStore({ fetching: 'init' });
  store.dispatch = jest.fn();

  const component = renderer.create(
    <Provider store={store}>
      <FooWithFetchStopky bar="baz" />
    </Provider>
  );

  expect(store.dispatch).toHaveBeenCalledWith(expect.any(Function));
  expect(component.toJSON()).toMatchSnapshot();
});

it('při načítání', () => {
  const store = mockStore({ fetching: 'fetching' });
  store.dispatch = jest.fn();

  const component = renderer.create(
    <Provider store={store}>
      <FooWithFetchStopky bar="baz" />
    </Provider>
  );

  expect(store.dispatch).toHaveBeenCalledWith(expect.any(Function));
  expect(component.toJSON()).toMatchSnapshot();
});

it('po načtení', () => {
  const store = mockStore({ fetching: 'done' });
  store.dispatch = jest.fn();

  const component = renderer.create(
    <Provider store={store}>
      <FooWithFetchStopky bar="baz" />
    </Provider>
  );

  expect(store.dispatch).toHaveBeenCalledWith(expect.any(Function));
  expect(component.toJSON()).toMatchSnapshot();
});
