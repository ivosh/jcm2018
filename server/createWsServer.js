'use strict';

const http = require('http');
const logger = require('heroku-logger');
const WebSocketServer = require('websocket').server;
const processMessage = require('./api/api');

const createWsServer = ({ httpServer, requestAllowed }) => {
  const wsHttpServer = httpServer || http.createServer(); // for testing

  const ws = new WebSocketServer({
    httpServer: wsHttpServer,
    autoAcceptConnections: false
  });

  ws.httpServer = () => wsHttpServer;

  ws.on('request', webSocketRequest => {
    if (requestAllowed && !requestAllowed(webSocketRequest)) {
      webSocketRequest.reject(401);
      logger.warn('Request for websocket connection rejected.');
      logger.debug(
        `Host: ${webSocketRequest.host}, remoteAddress: ${
          webSocketRequest.remoteAddress
        }, origin: ${webSocketRequest.origin}.`
      );
      return;
    }

    try {
      const connection = webSocketRequest.accept('jcm2018', webSocketRequest.origin);
      logger.info(
        `Connection from remoteAddress '${webSocketRequest.remoteAddress}' and origin '${
          webSocketRequest.origin
        }' accepted.`
      );

      connection.on('message', async message => {
        if (message.type !== 'utf8') {
          connection.drop(connection.CLOSE_REASON_INVALID_DATA);
          logger.warn(`Message with unknown type ${message.type}.`);
          return;
        }

        await processMessage(connection, message);
      });

      connection.on('close', (reasonCode, description) => {
        logger.info(
          `Connection ${connection.remoteAddress} disconnected with ${reasonCode}: ${description}.`
        );
      });
    } catch (err) {
      logger.debug(`Connection rejected: ${err}`);
    }
  });

  return ws;
};

module.exports = createWsServer;
