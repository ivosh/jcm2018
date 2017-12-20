import { Server } from 'mock-socket';
import WsClient from './WsClient';

const PORT = 4001;

let mockServer;
let wsClient;
const createServer = () => {
  mockServer = new Server(`ws://localhost:${PORT}`);
  // Sends the same message unmodified back to the client.
  mockServer.on('message', message => mockServer.send(message));
};
beforeEach(() => createServer());

afterEach(async () => {
  await wsClient.close();
  await mockServer.stop();
});

it('connects', async () => {
  wsClient = new WsClient({ port: PORT });
  await wsClient.connect();

  expect(wsClient.isConnected()).toEqual(true);
});

it('fires onConnect and onClose', async done => {
  let onConnectCalled = 0;
  const onConnect = () => {
    onConnectCalled += 1;
  };
  const onClose = () => {
    expect(onConnectCalled).toEqual(1);
    done(); // the test finishes actually here
  };

  wsClient = new WsClient({ port: PORT, onConnect, onClose });
  await wsClient.connect();
  expect(wsClient.isConnected()).toEqual(true);
  await wsClient.close();
});

it('reconnects', async done => {
  let onConnectCalled = 0;
  let onCloseCalled = 0;
  const onConnect = () => {
    onConnectCalled += 1;
    if (onConnectCalled === 2) {
      expect(onCloseCalled).toEqual(1);
      done(); // the test finishes actually here
    }
  };
  const onClose = () => {
    onCloseCalled += 1;
  };

  wsClient = new WsClient({ port: PORT, onConnect, onClose });
  await wsClient.connect();
  expect(wsClient.isConnected()).toEqual(true);
  expect(onConnectCalled).toEqual(1);

  await mockServer.close();
  expect(wsClient.isConnected()).toEqual(false);

  createServer();
});

it('sends a request', async () => {
  wsClient = new WsClient({ port: PORT });
  await wsClient.connect();
  const response = await wsClient.sendRequest({ zprava: 'Tohle.' });
  expect(response).toBeTruthy();
});
