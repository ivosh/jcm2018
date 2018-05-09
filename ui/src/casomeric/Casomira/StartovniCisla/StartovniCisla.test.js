import React from 'react';
import { Provider } from 'react-redux';
import { mount } from 'enzyme';
import toJSON from 'enzyme-to-json';
import configureStore from 'redux-mock-store';
import ucastniciTestData from '../../../entities/ucastnici/ucastniciTestData';
import StartovniCislaDnD from './StartovniCislaDnD';

const mockStore = configureStore();

let store;
beforeEach(() => {
  const state = ucastniciTestData;

  store = mockStore(state);
  store.dispatch = jest.fn();
});

it('maraton', () => {
  const wrapper = mount(
    <Provider store={store}>
      <StartovniCislaDnD typ="maraton" />
    </Provider>
  );
  expect(toJSON(wrapper)).toMatchSnapshot();
});
