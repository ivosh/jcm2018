'use strict';

const W3CWebSocket = require('websocket').w3cwebsocket;
const WebSocketAsPromised = require('websocket-as-promised');
const httpServer = require('./staticHttpServer');
const createWsServer = require('./createWsServer');

const PORT = 4001;

let wsServer;
afterEach(() => {
  wsServer.httpServer().close();
});

it('connect successfully', async () => {
  wsServer = createWsServer({ httpServer });
  wsServer.httpServer().listen(PORT);

  const wsClient = new WebSocketAsPromised(`ws://localhost:${PORT}`, {
    createWebSocket: url => new W3CWebSocket(url, 'jcm2018')
  });
  await wsClient.open();

  await wsClient.close();
});

it('connect fails because of invalid protocol', async () => {
  wsServer = createWsServer({ httpServer });
  wsServer.httpServer().listen(PORT);

  const wsClient = new WebSocketAsPromised(`ws://localhost:${PORT}`, {
    createWebSocket: url => new W3CWebSocket(url, '')
  });
  await expect(wsClient.open()).rejects.toMatchSnapshot();
});

fit('connect fails because of invalid origin', async () => {
  const originAllowed = () => false;
  wsServer = createWsServer({ httpServer, originAllowed });
  wsServer.httpServer().listen(PORT);

  const wsClient = new WebSocketAsPromised(`ws://localhost:${PORT}`, {
    createWebSocket: url => new W3CWebSocket(url, 'jcm2018'),
    timeout: 5000
  });
  await expect(wsClient.open()).rejects.toMatchSnapshot();
});
