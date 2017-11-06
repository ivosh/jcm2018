'use strict';

const logger = require('heroku-logger');
const WebSocketServer = require('websocket').server;
const http_server = require('./static_http');

const PORT = Number(process.env.PORT || 4000);
process.title = 'jcm2018-server';

http_server.listen(PORT, () => {
  logger.info(`Server is listening on port ${PORT}.`);
});

let ws = new WebSocketServer({
  httpServer: http_server,
  autoAcceptConnections: false
});

const originAllowed = origin => {
  // TODO: Implement same origin policy
  // (http://en.wikipedia.org/wiki/Same_origin_policy)
  return true;
};

ws.on('request', request => {
  if (!originAllowed(request.origin)) {
    request.reject(401);
    logger.warn(`Connection for origin ${request.origin} rejected.`);
    return;
  }

  let connection = request.accept('jcm2018', request.origin);
  logger.debug(`Connection for origin ${request.origin} accepted.`);

  connection.on('message', message => {
    if (message.type != 'utf8') {
      connection.drop(connection.CLOSE_REASON_INVALID_DATA);
      logger.error(`Message with unknown type ${message.type}.`);
      return;
    }

    logger.debug(`Received: ${message.utf8Data}`);
    const response = 'Hello from WS server: [' + message.utf8Data + ']';
    connection.sendUTF(response);
    logger.debug(`Responded: ${response.utf8Data}`);
  });

  connection.on('close', (reasonCode, description) => {
    logger.info(
      `Connection ${connection.remoteAddress} disconnected with ${reasonCode}: ${description}.`
    );
  });
});
