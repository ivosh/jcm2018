import thunk from 'redux-thunk';
import configureStore from 'redux-mock-store';
import WsClient from 'ui-common/WsClient';
import { TIMESYNC_INITIAL_BURST_DELAY, TIMESYNC_OPERATIONAL_DELAY } from '../constants';
import wsAPI from '../store/wsAPI';
import { TIMESYNC, timesync, timesyncOperation } from './TimesyncActions';

jest.useFakeTimers();

const mockWsClient = new WsClient();
mockWsClient.sendRequest = null;

const successfulResponse = {
  code: 'ok',
  response: {
    clientTime: '2018-12-01T10:38:08.361Z',
    serverTime: '2018-12-01T10:38:08:364Z'
  },
  requestId: '0.9310306652587377'
};

const middlewares = [thunk, wsAPI.withExtraArgument(mockWsClient)];
const mockStore = configureStore(middlewares);

it('timesync() should dispatch two successful actions', async () => {
  mockWsClient.sendRequest = async () => successfulResponse;
  const store = mockStore({ connected: true });

  await store.dispatch(timesync());
  const actions = store.getActions();
  expect(actions[0]).toEqual({
    type: `${TIMESYNC}_REQUEST`,
    request: { clientTime: expect.any(String) },
    receivedAt: expect.any(Number)
  });
  expect(actions[1]).toEqual({
    type: `${TIMESYNC}_SUCCESS`,
    request: { clientTime: expect.any(String) },
    response: { code: 'ok', now: expect.any(String), serverTime: expect.any(String) },
    title: 'synchronizace času',
    receivedAt: expect.any(Number)
  });
});

it('timesyncOperation should not set any timeout if not running', async () => {
  const store = mockStore({ timesync: { running: false } });

  await store.dispatch(timesyncOperation());
  jest.runOnlyPendingTimers();
  expect(setTimeout).toHaveBeenCalledTimes(0);
});

it('timesyncOperation should set an initial timeout if running', async () => {
  const store = mockStore({ connected: true, timesync: { running: true, samples: [] } });

  await store.dispatch(timesyncOperation());
  jest.runOnlyPendingTimers();
  expect(setTimeout).toHaveBeenCalledTimes(1);
  expect(setTimeout).toHaveBeenLastCalledWith(expect.any(Function), TIMESYNC_INITIAL_BURST_DELAY);
});

it('timesyncOperation should set a longer timeout if enough samples', async () => {
  const store = mockStore({
    connected: true,
    timesync: { running: true, samples: [{}, {}, {}, {}, {}] }
  });

  await store.dispatch(timesyncOperation());
  jest.runOnlyPendingTimers();
  expect(setTimeout).toHaveBeenCalledTimes(3);
  expect(setTimeout).toHaveBeenNthCalledWith(1, expect.any(Function), TIMESYNC_INITIAL_BURST_DELAY);
  expect(setTimeout).toHaveBeenNthCalledWith(2, expect.any(Function), TIMESYNC_INITIAL_BURST_DELAY);
  expect(setTimeout).toHaveBeenNthCalledWith(3, expect.any(Function), TIMESYNC_OPERATIONAL_DELAY);
});
