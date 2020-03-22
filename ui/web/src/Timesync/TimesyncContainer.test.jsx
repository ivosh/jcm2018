import React from 'react';
import { shallow } from 'enzyme';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import WsClient from 'ui-common/WsClient';
import wsAPI from 'ui-common/store/wsAPI';
import { TIMESYNC } from './TimesyncActions';
import TimesyncContainer from './TimesyncContainer';

const successfulResponse = {
  code: 'ok',
  response: { now: '2019-16-07T00:00:23.132Z', serverTime: '2019-16-07T00:00:22.000Z' },
  requestId: '0.9310306652587377',
};

const mockWsClient = new WsClient();
mockWsClient.sendRequest = async () => successfulResponse;

const middlewares = [thunk.withExtraArgument(mockWsClient), wsAPI.withExtraArgument(mockWsClient)];
const mockStore = configureStore(middlewares);

it('maps state to props', () => {
  const state = { timesync: { offset: -1, running: true, samples: [] } };
  const store = mockStore(state);
  const wrapper = shallow(<TimesyncContainer store={store} />);

  expect(wrapper.props().startEnabled).toBe(false);
  expect(wrapper.props().stopEnabled).toBe(true);
  expect(wrapper.props().timeOffset).toEqual(-1);
});

it('maps onStart to dispatch TIMESYNC_START action', async () => {
  const state = { connected: true, timesync: { offset: -1, running: true, samples: [] } };
  const store = mockStore(state);

  const wrapper = shallow(<TimesyncContainer store={store} />);
  await wrapper.props().onStart();

  const actions = store.getActions();
  expect(actions.length).toBeGreaterThanOrEqual(2);
  expect(actions[0]).toEqual({ type: 'TIMESYNC_START' });
  expect(actions[1]).toEqual({
    type: `${TIMESYNC}_REQUEST`,
    request: { clientTime: expect.any(String) },
    receivedAt: expect.any(Number),
  });
  if (actions.length === 3) {
    // Due to a different scheduling, we sometimes get this action as well.
    expect(actions[2]).toEqual({
      type: `${TIMESYNC}_SUCCESS`,
      request: { clientTime: expect.any(String) },
      response: {
        code: 'ok',
        now: expect.any(String),
        serverTime: expect.any(String),
      },
      receivedAt: expect.any(Number),
      title: 'synchronizace času',
    });
  }
});

it('maps onStop to dispatch TIMESYNC_STOP action', async () => {
  const state = { connected: true, timesync: { offset: -1, running: true, samples: [] } };
  const store = mockStore(state);

  const wrapper = shallow(<TimesyncContainer store={store} />);
  await wrapper.props().onStop();

  const actions = store.getActions();
  expect(actions).toHaveLength(1);
  expect(actions[0]).toEqual({ type: 'TIMESYNC_STOP' });
});
