import React from 'react';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
import renderer from 'react-test-renderer';
import configureStore from 'redux-mock-store';
import wsAPI from '../../store/wsAPI';
import { fetchUcastnici } from '../ucastnici/ucastniciActions';
import withFetchUcastnici from './withFetchUcastnici';

const middlewares = [wsAPI];
const mockStore = configureStore(middlewares);

const Foo = ({ bar }) => <div>{bar}</div>;
Foo.propTypes = {
  bar: PropTypes.node.isRequired
};
const FooWithFetchUcastnici = withFetchUcastnici(Foo);

it('na začátku', () => {
  const store = mockStore({ fetchingUcastnici: 'init' });
  store.dispatch = jest.fn();

  const component = renderer.create(
    <Provider store={store}>
      <FooWithFetchUcastnici bar="baz" />
    </Provider>
  );

  expect(store.dispatch).toHaveBeenCalledWith(fetchUcastnici());
  expect(component.toJSON()).toMatchSnapshot();
});

it('při načítání', () => {
  const store = mockStore({ fetchingUcastnici: 'fetching' });
  store.dispatch = jest.fn();

  const component = renderer.create(
    <Provider store={store}>
      <FooWithFetchUcastnici bar="baz" />
    </Provider>
  );

  expect(store.dispatch).toHaveBeenCalledWith(fetchUcastnici());
  expect(component.toJSON()).toMatchSnapshot();
});

it('po načtení', () => {
  const store = mockStore({ fetchingUcastnici: 'done' });
  store.dispatch = jest.fn();

  const component = renderer.create(
    <Provider store={store}>
      <FooWithFetchUcastnici bar="baz" />
    </Provider>
  );

  expect(store.dispatch).toHaveBeenCalledWith(fetchUcastnici());
  expect(component.toJSON()).toMatchSnapshot();
});
