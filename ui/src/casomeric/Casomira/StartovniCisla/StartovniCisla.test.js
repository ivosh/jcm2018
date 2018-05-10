import React from 'react';
import { Provider } from 'react-redux';
import { mount } from 'enzyme';
import toJSON from 'enzyme-to-json';
import configureStore from 'redux-mock-store';
import { wrapInDnDTestContext } from '../../../testing';
import ucastniciTestData from '../../../entities/ucastnici/ucastniciTestData';
import StartovniCisla from './StartovniCisla';

const mockStore = configureStore();
// Render with the test context that uses the test backend.
const StartovniCislaDnD = wrapInDnDTestContext(StartovniCisla);

let store;
beforeEach(() => {
  const state = ucastniciTestData;

  store = mockStore(state);
  store.dispatch = jest.fn();
});

it('maraton', () => {
  const wrapper = mount(
    <Provider store={store}>
      <StartovniCislaDnD typ="maraton" canDrop={jest.fn()} onDrop={jest.fn()} />
    </Provider>
  );
  expect(toJSON(wrapper)).toMatchSnapshot();
});
