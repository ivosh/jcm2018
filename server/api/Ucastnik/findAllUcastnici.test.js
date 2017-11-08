'use strict';

const mongoose = require('mongoose');
const Actions = require('../../../common');
const createWsServer = require('../../ws_server');
const createWsClient = require('../ws_client');
const config = require('../../config');

/* Use native ES6 promises. */
mongoose.Promise = global.Promise;

const port = 5602;
const wsServer = createWsServer({});
const wsClient = createWsClient({ port });

beforeAll(async () => {
  wsServer.httpServer().listen(port);
  await wsClient.open();

  const connection = await mongoose.connect(config.db_uri, { useMongoClient: true });
  await connection.db.dropDatabase();
});

afterAll(async () => {
  await wsClient.close();
  wsServer.httpServer().close();

  await mongoose.disconnect();
});

it('findAllUcastnici', async () => {
  // :TODO: create some first
  await wsClient.sendRequest(Actions.findAllUcastnici());
});
