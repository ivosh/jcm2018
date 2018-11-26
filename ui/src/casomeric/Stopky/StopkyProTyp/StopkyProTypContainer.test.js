import React from 'react';
import moment from 'moment';
import { shallow } from 'enzyme';
import configureStore from 'redux-mock-store';
import { API_MODIFY_STOPKY, STOPKY_START, STOPKY_STOP } from '../../../common';
import WsClient from '../../../WsClient';
import { WS_API } from '../../../store/wsAPI';
import { MODIFY_STOPKY } from './StopkyProTypActions';
import StopkyProTypContainer from './StopkyProTypContainer';

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

const mockStore = configureStore();
const store = mockStore(state);
store.dispatch = jest.fn();
const wrapper = shallow(<StopkyProTypContainer store={store} typ="maraton" />);

const successfulResponse = {
  code: 'ok',
  response: {
    stopky: {
      base: null,
      delta: 'PT1H7M',
      mezicasy: [],
      running: false,
      typ: 'maraton'
    }
  },
  requestId: '0.9310306652587377',
  status: 'uloženo v pořádku'
};

const mockWsClient = new WsClient();
mockWsClient.sendRequest = async () => successfulResponse;

it('maps state and dispatch to props', () => {
  expect(wrapper.props().base).toEqual(expect.any(Date));
  expect(wrapper.props().cudly).toBeTruthy();
  expect(wrapper.props().delta).toEqual(moment.duration(0));
  expect(wrapper.props().running).toBe(true);
  expect(wrapper.props().startEnabled).toBe(false);
  expect(wrapper.props().stopEnabled).toBe(true);
});

it('maps onStart to dispatch modifyStopky/STOPKY_START action', async () => {
  wrapper.props().onStart();

  expect(store.dispatch).toHaveBeenCalledWith({
    [WS_API]: {
      type: MODIFY_STOPKY,
      endpoint: API_MODIFY_STOPKY,
      normalize: expect.any(Function),
      request: { modifikace: STOPKY_START, now: expect.any(String), typ: 'maraton' },
      title: 'ukládání stopek'
    }
  });
});

it('maps onStop to dispatch modifyStopky/STOPKY_STOP action', async () => {
  wrapper.props().onStop();

  expect(store.dispatch).toHaveBeenCalledWith({
    [WS_API]: {
      type: MODIFY_STOPKY,
      endpoint: API_MODIFY_STOPKY,
      normalize: expect.any(Function),
      request: { modifikace: STOPKY_STOP, now: expect.any(String), typ: 'maraton' },
      title: 'ukládání stopek'
    }
  });
});
