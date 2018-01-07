'use strict';

const W3CWebSocket = require('websocket').w3cwebsocket;
const WebSocketAsPromised = require('websocket-as-promised');
const httpServer = require('./staticHttpServer');
const createWsServer = require('./createWsServer');

const PORT = 4001;

let allowThisRequest;
const requestAllowed = () => allowThisRequest;

beforeEach(() => {
  allowThisRequest = true;
});

let wsServer;
beforeAll(() => {
  wsServer = createWsServer({ httpServer, requestAllowed });
  wsServer.httpServer().listen(PORT);
});

afterAll(() => {
  wsServer.httpServer().close();
});

it('connect successfully', async () => {
  const wsClient = new WebSocketAsPromised(`ws://localhost:${PORT}`, {
    createWebSocket: url => new W3CWebSocket(url, 'jcm2018')
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
    createWebSocket: url => new W3CWebSocket(url, 'jcm2018'),
    timeout: 5000
  });
  await expect(wsClient.open()).rejects.toMatchSnapshot();
});
