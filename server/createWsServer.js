'use strict';

const http = require('http');
const WebSocketServer = require('websocket').server;
const logger = require('./logger');
const processMessage = require('./api/api');

const createWsServer = ({ httpServer, requestAllowed }) => {
  const wsHttpServer = httpServer || http.createServer(); // for testing

  const ws = new WebSocketServer({
    httpServer: wsHttpServer,
    autoAcceptConnections: false
  });

  ws.httpServer = () => wsHttpServer;

  ws.on('request', wsRequest => {
    if (requestAllowed && !requestAllowed(wsRequest)) {
      wsRequest.reject(401);
      logger.warn('Request for websocket connection rejected.');
      logger.debug(
        `Host: ${wsRequest.host}, remoteAddress: ${wsRequest.remoteAddress}, origin: ${
          wsRequest.origin
        }.`
      );
      return;
    }

    try {
      const connection = wsRequest.accept('jcm2018', wsRequest.origin);
      logger.info(
        `Connection from remoteAddress '${wsRequest.remoteAddress}' and origin '${
          wsRequest.origin
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
