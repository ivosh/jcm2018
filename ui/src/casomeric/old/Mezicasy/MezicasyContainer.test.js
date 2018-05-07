import React from 'react';
import { shallow } from 'enzyme';
import configureStore from 'redux-mock-store';
import MezicasyContainer from './MezicasyContainer';

const mockStore = configureStore();

let store;
let wrapper;
beforeEach(() => {
  const state = {
    casomeric: {
      maraton: {
        mezicasy: [{ id: 0, duration: 'PT4.950S' }, { id: 1, duration: 'PT12.101S' }],
        startujici: [
          { id: 0, cislo: 8, dokonceno: true, duration: 'PT2H32M14.2S' },
          { id: 1, cislo: 7, dokonceno: null },
          { id: 2, cislo: 5, dokonceno: null },
          { id: 3, cislo: 25, dokonceno: false }
        ]
      }
    }
  };
  store = mockStore(state);
  store.dispatch = jest.fn();
  wrapper = shallow(<MezicasyContainer store={store} />);
});

it('maps state and dispatch to props', () => {
  expect(wrapper.props().mezicasy).toBeTruthy();
  expect(wrapper.props().mezicasy).toMatchSnapshot();
});

it('maps [0].onRemove to dispatch onRemoveMezicas action', () => {
  wrapper.props().mezicasy[0].onRemove();

  expect(store.dispatch).toHaveBeenCalledWith({ id: 0, type: 'REMOVE_MEZICAS' });
});

it('maps [2].onRemove to dispatch onRemoveMezicas action', () => {
  wrapper.props().mezicasy[2].onRemove();

  expect(store.dispatch).toHaveBeenCalledTimes(2);
  expect(store.dispatch).toHaveBeenLastCalledWith({
    id: 0,
    type: 'ADD_MEZICAS',
    duration: 'PT2H32M14.2S'
  });
});
