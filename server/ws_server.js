'use strict';

const logger = require('heroku-logger');
const WebSocketServer = require('websocket').server;
const processMessage = require('./api');

const createWsServer = ({ httpServer, originAllowed }) => {
  const ws = new WebSocketServer({
    httpServer,
    autoAcceptConnections: false
  });

  ws.on('request', request => {
    if (originAllowed && !originAllowed(request.origin)) {
      request.reject(401);
      logger.warn(`Connection for origin '${request.origin}' rejected.`);
      return;
    }

    const connection = request.accept('jcm2018', request.origin);
    logger.debug(`Connection for origin '${request.origin}' accepted.`);

    connection.on('message', async message => {
      if (message.type !== 'utf8') {
        connection.drop(connection.CLOSE_REASON_INVALID_DATA);
        logger.error(`Message with unknown type ${message.type}.`);
        return;
      }

      await processMessage(connection, message);
    });

    connection.on('close', (reasonCode, description) => {
      logger.info(
        `Connection ${connection.remoteAddress} disconnected with ${reasonCode}: ${description}.`
      );
    });
  });

  return ws;
};

module.exports = createWsServer;
