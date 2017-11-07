'use strict';

const http = require('http');
const WebSocketServer = require('websocket').server;
const W3CWebSocket = require('websocket').w3cwebsocket;
const WebSocketAsPromised = require('websocket-as-promised');
const processMessage = require('.');

const httpServer = http.createServer();

const wsServer = new WebSocketServer({ httpServer, closeTimeout: 1000 });
wsServer.on('request', request => {
  const connection = request.accept('jcm2018', request.origin);

  connection.on('message', async message => {
    if (message.type !== 'utf8') {
      connection.drop(connection.CLOSE_REASON_INVALID_DATA);
      return;
    }

    await processMessage(connection, message);
  });
});

const wsClient = new WebSocketAsPromised('ws://localhost:5600/', {
  createWebSocket: url => new W3CWebSocket(url, 'jcm2018'),
  packMessage: data => JSON.stringify(data),
  unpackMessage: message => JSON.parse(message),
  attachRequestId: (data, requestId) => ({ ...data, requestId }),
  extractRequestId: data => data && data.requestId,
  timeout: 1000
});

beforeAll(async () => {
  httpServer.listen(5600);
  await wsClient.open();
});

afterAll(async () => {
  await wsClient.close();
  httpServer.close();
});

it('basic connectivity', async () => {
  await wsClient.sendRequest({});
});
