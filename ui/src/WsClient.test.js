import { Server } from 'mock-socket';
import WsClient from './WsClient';

const PORT = 4001;

let mockServer;
let wsClient;
const createServer = () => {
  mockServer = new Server(`ws://localhost:${PORT}`);
  mockServer.on('connection', socket => {
    // Sends the same message unmodified back to the client.
    socket.on('message', message => socket.send(message));
  });
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

it('connects after server start', async () => {
  await mockServer.stop();
  wsClient = new WsClient({ port: PORT });
  const promise = wsClient.connect();
  expect(wsClient.isConnected()).toEqual(false);

  createServer();
  await promise;
  expect(wsClient.isConnected()).toEqual(true);
});

it('sends a request', async () => {
  wsClient = new WsClient({ port: PORT });
  await wsClient.connect();
  const response = await wsClient.sendRequest({ zprava: 'Tohle.' });
  expect(response).toBeTruthy();
});

it('handles request timeout', async done => {
  const port = PORT + 1;
  mockServer = new Server(`ws://localhost:${port}`);
  wsClient = new WsClient({ requestTimeout: 500, port });
  await wsClient.connect();

  try {
    await wsClient.sendRequest({ zprava: 'Tamto.' });
    fail();
  } catch (err) {
    expect(err.message).toContain('WebSocket request was rejected by timeout (500 ms).');
    done();
  }
});
