import React from 'react';
import moment from 'moment';
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
          delta: 'P0D',
          running: true
        }
      }
    }
  };
  setupComponent({ state, typ: 'maraton' });

  expect(wrapper.props().base).toEqual(expect.any(Date));
  expect(wrapper.props().delta).toEqual(moment.duration(0));
  expect(wrapper.props().running).toBe(true);
  expect(wrapper.props().startEnabled).toBe(false);
  expect(wrapper.props().stopEnabled).toBe(true);
});

it('maps onStart to dispatch stopkyStart action', () => {
  const state = {
    casomeric: {
      půlmaraton: {
        stopky: {
          base: null,
          delta: moment.duration('PT0H1M23.54S'),
          running: false
        }
      }
    }
  };
  setupComponent({ state, typ: 'půlmaraton' });

  const now = new Date();
  wrapper.props().onStart();

  expect(store.dispatch).toHaveBeenCalledWith({ type: 'STOPKY_START', now, typ: 'půlmaraton' });
});

it('maps onStop to dispatch stopkyStop action', () => {
  const state = {
    casomeric: {
      cyklo: {
        stopky: {
          base: new Date().toISOString(),
          delta: moment.duration(0),
          running: true
        }
      }
    }
  };
  setupComponent({ state, typ: 'cyklo' });

  const now = new Date();
  wrapper.props().onStop();

  expect(store.dispatch).toHaveBeenCalledWith({ type: 'STOPKY_STOP', now, typ: 'cyklo' });
});
