'use strict';

const http = require('http');
const WebSocketServer = require('websocket').server;
const logger = require('./logger');
const processMessageAPI = require('./api/api');

// eslint-disable-next-line no-confusing-arrow
const remoteSocketEndpoint = ({ remoteAddress, remoteFamily, remotePort }) =>
  remoteFamily === 'IPv4' ? `${remoteAddress}:${remotePort}` : `[${remoteAddress}]:${remotePort}`;

const createWsServer = ({ httpServer, processMessage = processMessageAPI, requestAllowed }) => {
  const wsHttpServer = httpServer || http.createServer(); // for testing

  const ws = new WebSocketServer({
    httpServer: wsHttpServer,
    autoAcceptConnections: false
  });

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

  ws.broadcast = ({ debugMessage, excludedConnection, message }) => {
    const json = JSON.stringify(message);
    ws.authConnections
      .filter(connection => connection !== excludedConnection)
      .forEach(connection => {
        connection.sendUTF(json);
        logger.silly(`Broadcasted: ${json} to ${remoteSocketEndpoint(connection.socket)}`);
      });
    logger.debug(debugMessage);
  };

  // Returns a promise which resolves once all background connections have been closed, as indicated
  // to the callback of server.close().
  ws.close = async () => new Promise(resolve => wsHttpServer.close(() => resolve()));

  ws.listen = port => wsHttpServer.listen(port);

  ws.on('request', wsRequest => {
    if (requestAllowed && !requestAllowed(wsRequest)) {
      wsRequest.reject(401);
      logger.warn('Request for websocket connection rejected.');
      logger.debug(
        `Host: ${wsRequest.host}, remote: ${remoteSocketEndpoint(wsRequest.socket)}, origin: ${
          wsRequest.origin
        }.`
      );
      return;
    }

    try {
      const connection = wsRequest.accept('jcm2019', wsRequest.origin);
      logger.info(
        `Connection from '${remoteSocketEndpoint(wsRequest.socket)}' and origin '${
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

        const { broadcast, debugMessage } = await processMessage(connection, message);
        if (broadcast) {
          ws.broadcast({ debugMessage, excludedConnection: connection, message: broadcast });
        }
      });

      connection.on('close', (reasonCode, description) => {
        logger.info(
          `Connection ${remoteSocketEndpoint(
            connection.socket
          )} disconnected with ${reasonCode}: ${description}.`
        );
        ws.removeAuthConnection(connection);
      });

      connection.onAuth = ({ authenticated, username }) => {
        if (connection.authenticated === authenticated) {
          return;
        }

        connection.authenticated = authenticated;
        if (authenticated) {
          logger.debug(
            `Connection ${remoteSocketEndpoint(connection.socket)} authenticated successfully.`
          );
          connection.username = username;
          ws.addAuthConnection(connection);
        } else {
          logger.debug(
            `Connection ${remoteSocketEndpoint(connection.socket)} is not authenticated.`
          );
          connection.username = undefined;
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
