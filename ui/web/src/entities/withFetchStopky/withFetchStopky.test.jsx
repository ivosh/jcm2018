import React from 'react';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
import renderer from 'react-test-renderer';
import configureStore from 'redux-mock-store';
import wsAPI from 'ui-common/store/wsAPI';
import { fetchStopky } from '../stopky/stopkyActions';
import withFetchStopky from './withFetchStopky';

const middlewares = [wsAPI];
const mockStore = configureStore(middlewares);

const Foo = ({ bar }) => <div>{bar}</div>;
Foo.propTypes = {
  bar: PropTypes.node.isRequired,
};
const FooWithFetchStopky = withFetchStopky(Foo);

it('na začátku', () => {
  const store = mockStore({ fetchingStopky: 'init' });
  store.dispatch = jest.fn();

  const component = renderer.create(
    <Provider store={store}>
      <FooWithFetchStopky bar="baz" />
    </Provider>
  );

  expect(store.dispatch).toHaveBeenCalledWith(fetchStopky());
  expect(component.toJSON()).toMatchSnapshot();
});

it('při načítání', () => {
  const store = mockStore({ fetchingStopky: 'fetching' });
  store.dispatch = jest.fn();

  const component = renderer.create(
    <Provider store={store}>
      <FooWithFetchStopky bar="baz" />
    </Provider>
  );

  expect(store.dispatch).toHaveBeenCalledWith(fetchStopky());
  expect(component.toJSON()).toMatchSnapshot();
});

it('po načtení', () => {
  const store = mockStore({ fetchingStopky: 'done' });
  store.dispatch = jest.fn();

  const component = renderer.create(
    <Provider store={store}>
      <FooWithFetchStopky bar="baz" />
    </Provider>
  );

  expect(store.dispatch).toHaveBeenCalledWith(fetchStopky());
  expect(component.toJSON()).toMatchSnapshot();
});
