'use strict';

const W3CWebSocket = require('websocket').w3cwebsocket;
const WebSocketAsPromised = require('websocket-as-promised');

const createWsClient = ({ port }) =>
  new WebSocketAsPromised(`ws://localhost:${port}/`, {
    createWebSocket: url => new W3CWebSocket(url, 'jcm2018'),
    packMessage: data => JSON.stringify(data),
    unpackMessage: message => JSON.parse(message),
    attachRequestId: (data, requestId) => ({ ...data, requestId }),
    extractRequestId: data => data && data.requestId,
    timeout: 5000
  });

module.exports = createWsClient;
