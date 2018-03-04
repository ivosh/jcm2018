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

  ws.authConnections = [];
  ws.addAuthConnection = connection => {
    const index = ws.authConnections.indexOf(connection);
    if (index === -1) {
      ws.authConnections.push(connection);
    }
  };
  ws.removeAuthConnection = connection => {
    const index = ws.authConnections.indexOf(connection);
    if (index !== -1) {
      ws.authConnections.splice(index, 1);
    }
  };

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
      logger.debug(`Number of authenticated connections: ${ws.authConnections.length}`);

      connection.on('message', async message => {
        if (message.type !== 'utf8') {
          connection.drop(connection.CLOSE_REASON_INVALID_DATA);
          logger.warn(`Message with unknown type ${message.type}.`);
          ws.removeAuthConnection(connection);
          return;
        }

        await processMessage(connection, message);
      });

      connection.on('close', (reasonCode, description) => {
        logger.info(
          `Connection ${connection.remoteAddress} disconnected with ${reasonCode}: ${description}.`
        );
        ws.removeAuthConnection(connection);
      });

      connection.onAuth = auth => {
        connection.authenticated = auth;
        if (auth) {
          logger.debug(`Connection ${connection.remoteAddress} authenticated successfully.`);
          ws.addAuthConnection(connection);
        } else {
          logger.debug(`Connection ${connection.remoteAddress} is not authenticated.`);
          ws.removeAuthConnection(connection);
        }
        logger.debug(`Number of authenticated connections: ${ws.authConnections.length}`);
      };
    } catch (err) {
      logger.debug(`Connection rejected: ${err}`);
    }
  });

  return ws;
};

module.exports = createWsServer;
