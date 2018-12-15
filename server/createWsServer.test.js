'use strict';

const W3CWebSocket = require('websocket').w3cwebsocket;
const WebSocketAsPromised = require('websocket-as-promised');
const httpServer = require('./staticHttpServer');
const createWsServer = require('./createWsServer');

const PORT = 4001;

const processMessage = async (connection, data) => {
  connection.onAuth(true);
  const message = JSON.parse(data.utf8Data);
  return { broadcast: { broadcast: 'test', data: message }, debugMessage: 'Message broadcasted.' };
};

let allowThisRequest;
const requestAllowed = () => allowThisRequest;

let wsServer;
beforeAll(() => {
  wsServer = createWsServer({ httpServer, processMessage, requestAllowed });
  wsServer.listen(PORT);
});

afterAll(async () => {
  await wsServer.close();
});

beforeEach(() => {
  allowThisRequest = true;
});

it('connect successfully', async () => {
  const wsClient = new WebSocketAsPromised(`ws://localhost:${PORT}`, {
    createWebSocket: url => new W3CWebSocket(url, 'jcm2019')
  });
  await wsClient.open();

  await wsClient.close();
});

it('connect fails because of invalid protocol', async () => {
  const wsClient = new WebSocketAsPromised(`ws://localhost:${PORT}`, {
    createWebSocket: url => new W3CWebSocket(url, '')
  });
  await expect(wsClient.open()).rejects.toMatchSnapshot();
});

it('connect fails because of invalid origin', async () => {
  allowThisRequest = false;

  const wsClient = new WebSocketAsPromised(`ws://localhost:${PORT}`, {
    createWebSocket: url => new W3CWebSocket(url, 'jcm2019'),
    timeout: 5000
  });
  await expect(wsClient.open()).rejects.toMatchSnapshot();
});

it('broadcast', async done => {
  const wsClient2 = new WebSocketAsPromised(`ws://localhost:${PORT}`, {
    createWebSocket: url => new W3CWebSocket(url, 'jcm2019')
  });
  await wsClient2.open();

  const wsClient1 = new WebSocketAsPromised(`ws://localhost:${PORT}`, {
    createWebSocket: url => new W3CWebSocket(url, 'jcm2019')
  });
  wsClient1.onMessage.addListener(async message => {
    const parsed = JSON.parse(message);
    expect(parsed).toMatchSnapshot();

    await wsClient1.close();
    await wsClient2.close();
    done();
  });
  await wsClient1.open();

  await wsClient1.send('{ "message": "from client 1" }');
  await wsClient2.send('{ "message": "from client 2" }');
});
