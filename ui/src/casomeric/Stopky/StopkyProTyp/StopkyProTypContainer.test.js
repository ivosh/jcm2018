import React from 'react';
import moment from 'moment';
import { shallow } from 'enzyme';
import configureStore from 'redux-mock-store';
import WsClient from '../../../WsClient';
import StopkyProTypContainer from './StopkyProTypContainer';

const mockStore = configureStore();

let store;
let wrapper;
const setupComponent = ({ state, typ }) => {
  store = mockStore(state);
  store.dispatch = jest.fn();
  wrapper = shallow(<StopkyProTypContainer store={store} typ={typ} />);
};

const successfulResponse = {
  code: 'ok',
  response: {
    id: '===id==='
  },
  requestId: '0.9310306652587377'
};
const mockWsClient = new WsClient();
mockWsClient.sendRequest = async () => successfulResponse;

it('maps state and dispatch to props', () => {
  const state = {
    entities: {
      stopky: {
        byTypy: {
          maraton: {
            base: new Date().toISOString(),
            delta: 'P0D',
            running: true,
            typ: 'maraton'
          }
        },
        typy: ['maraton']
      }
    }
  };
  setupComponent({ state, typ: 'maraton' });

  expect(wrapper.props().base).toEqual(expect.any(Date));
  expect(wrapper.props().cudly).toBeTruthy();
  expect(wrapper.props().delta).toEqual(moment.duration(0));
  expect(wrapper.props().running).toBe(true);
  expect(wrapper.props().startEnabled).toBe(false);
  expect(wrapper.props().stopEnabled).toBe(true);
});

it('maps onStart to dispatch stopkyStart action', async () => {
  const state = {
    auth: {},
    entities: {
      stopky: {
        byTypy: {
          půlmaraton: {
            base: null,
            delta: moment.duration('PT0H1M23.54S'),
            running: false,
            typ: 'půlmaraton'
          }
        },
        typy: ['půlmaraton']
      }
    }
  };
  setupComponent({ state, typ: 'půlmaraton' });

  wrapper.props().onStart();

  expect(store.dispatch).toHaveBeenCalledWith(expect.any(Function));

  const fun = store.dispatch.mock.calls[0][0];
  await fun(store.dispatch, () => state, mockWsClient);
  expect(store.dispatch).toHaveBeenCalledWith(
    expect.objectContaining({
      type: 'SAVE_STOPKY_SUCCESS',
      typ: 'půlmaraton',
      stopky: expect.objectContaining({
        delta: 'P0D',
        running: true
      })
    })
  );
});

it('maps onStop to dispatch stopkyStop action', async () => {
  const state = {
    auth: {},
    entities: {
      stopky: {
        byTypy: {
          cyklo: {
            base: new Date().toISOString(),
            delta: moment.duration(0),
            running: true,
            typ: 'cyklo'
          }
        },
        typy: ['cyklo']
      }
    }
  };
  setupComponent({ state, typ: 'cyklo' });

  wrapper.props().onStop();

  expect(store.dispatch).toHaveBeenCalledWith(expect.any(Function));

  const fun = store.dispatch.mock.calls[0][0];
  await fun(store.dispatch, () => state, mockWsClient);
  expect(store.dispatch).toHaveBeenCalledWith(
    expect.objectContaining({
      type: 'SAVE_STOPKY_SUCCESS',
      typ: 'cyklo',
      stopky: expect.objectContaining({
        base: null,
        running: false
      })
    })
  );
});
