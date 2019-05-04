import { Server } from 'mock-socket';
import WsClient from '../ui-common/WsClient';
import configureStore, { loadState } from './configureStore';

jest.mock('react-native', () => {
  const items = {};
  return {
    // eslint-disable-next-line arrow-body-style
    setItem: jest.fn((item, value) => {
      return new Promise(resolve => {
        items[item] = value;
        resolve(value);
      });
    }),
    // eslint-disable-next-line arrow-body-style
    getItem: jest.fn(item => {
      return new Promise(resolve => {
        resolve(items[item]);
      });
    })
  };
});

it('configure store', async () => {
  const store = await configureStore(null);
  expect(store).not.toBeNull();
});

it('configure store with initialState', async () => {
  const initialState = await loadState();
  const store = await configureStore(null, initialState);
  expect(store).not.toBeNull();
});

it('configure store with a websocket client', async () => {
  const port = 4002;
  const mockServer = new Server(`ws://localhost:${port}`);
  const wsClient = new WsClient({ port });

  const store = configureStore(wsClient);
  await wsClient.connect();
  expect(store.getState().connected).toBe(true);

  await wsClient.close();
  await mockServer.stop();
});
