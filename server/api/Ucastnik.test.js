'use strict';

const http = require('http');
const W3CWebSocket = require('websocket').w3cwebsocket;
const WebSocketAsPromised = require('websocket-as-promised');
const Actions = require('../../common');
const createWsServer = require('../ws_server');

const PORT = 5600;
const httpServer = http.createServer();
createWsServer({ httpServer });

const wsClient = new WebSocketAsPromised(`ws://localhost:${PORT}/`, {
  createWebSocket: url => new W3CWebSocket(url, 'jcm2018'),
  packMessage: data => JSON.stringify(data),
  unpackMessage: message => JSON.parse(message),
  attachRequestId: (data, requestId) => ({ ...data, requestId }),
  extractRequestId: data => data && data.requestId,
  timeout: 5000
});

beforeAll(async () => {
  httpServer.listen(PORT);
  await wsClient.open();
});

afterAll(async () => {
  await wsClient.close();
  httpServer.close();
});

afterEach(() => {
  wsClient.onMessage.removeAllListeners();
});

it('basic connectivity', async () => {
  await wsClient.sendRequest({});
});

it('unparsable message', async done => {
  wsClient.onMessage.addListener(message => {
    const parsed = JSON.parse(message);
    expect(parsed.code).toEqual(Actions.CODE_UNPARSABLE_MESSAGE);
    done();
  });

  await wsClient.send('--');
});
