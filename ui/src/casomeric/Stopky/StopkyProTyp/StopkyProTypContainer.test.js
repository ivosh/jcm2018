import React from 'react';
import { shallow } from 'enzyme';
import configureStore from 'redux-mock-store';
import StopkyProTypContainer from './StopkyProTypContainer';

const mockStore = configureStore();

let store;
let wrapper;

const setupComponent = ({ state, typ }) => {
  store = mockStore(state);
  store.dispatch = jest.fn();
  wrapper = shallow(<StopkyProTypContainer store={store} typ={typ} />);
};

it('maps state and dispatch to props', () => {
  const state = {
    casomeric: {
      maraton: {
        stopky: {
          base: new Date().toISOString(),
          running: false
        }
      }
    }
  };
  setupComponent({ state, typ: 'maraton' });

  expect(wrapper.props().base).toEqual(expect.any(Date));
  expect(wrapper.props().running).toBe(false);
  expect(wrapper.props().startEnabled).toBe(true);
  expect(wrapper.props().stopEnabled).toBe(false);
});

it('maps onStart to dispatch stopkyStart action', () => {
  const state = {
    casomeric: {
      půlmaraton: {
        stopky: {
          base: new Date().toISOString(),
          running: false
        }
      }
    }
  };
  setupComponent({ state, typ: 'půlmaraton' });

  const now = new Date();
  wrapper.props().onStart(now);

  expect(store.dispatch).toHaveBeenCalledWith({
    type: 'STOPKY_START',
    base: now.toISOString(),
    typ: 'půlmaraton'
  });
});

it('maps onStop to dispatch stopkyStop action', () => {
  const state = {
    casomeric: {
      cyklo: {
        stopky: {
          base: new Date().toISOString(),
          running: true
        }
      }
    }
  };
  setupComponent({ state, typ: 'cyklo' });

  wrapper.props().onStop();

  expect(store.dispatch).toHaveBeenCalledWith({ type: 'STOPKY_STOP', typ: 'cyklo' });
});
