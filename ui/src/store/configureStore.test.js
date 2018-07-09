import { Server } from 'mock-socket';
import WsClient from '../WsClient';
import configureStore from './configureStore';

it('configure store', () => {
  const store = configureStore(null);
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
