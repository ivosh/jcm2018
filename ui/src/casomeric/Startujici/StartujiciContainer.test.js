import React from 'react';
import { shallow } from 'enzyme';
import configureStore from 'redux-mock-store';
import StartujiciContainer from './StartujiciContainer';

const mockStore = configureStore();

let store;
let wrapper;
const onStartujiciClick = jest.fn();
beforeEach(() => {
  const state = {
    startujici: [
      { id: 0, cislo: 8, dokonceno: true, duration: 'PT2H32M14.2S' },
      { id: 1, cislo: 7, dokonceno: null },
      { id: 3, cislo: 25, dokonceno: false },
      { id: 2, cislo: 5, dokonceno: null }
    ]
  };
  store = mockStore(state);
  store.dispatch = jest.fn();
  wrapper = shallow(<StartujiciContainer onStartujiciClick={onStartujiciClick} store={store} />);
});

it('maps state and dispatch to props', () => {
  expect(wrapper.props().startujici).toBeTruthy();
  expect(wrapper.props().startujici).toMatchSnapshot();
});
