'use strict';

const mongoose = require('mongoose');
const Actions = require('../../../common');
const config = require('../../config');
const createWsServer = require('../../ws_server');
const createWsClient = require('./../ws_client');
const Ucastnik = require('../../model/Ucastnik');

/* Use native ES6 promises. */
mongoose.Promise = global.Promise;

const port = 5601;
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

it('vytvoř minimálního účastníka', async () => {
  const udaje = {
    prijmeni: 'Balabák',
    jmeno: 'František',
    narozeni: { rok: 1953 },
    pohlavi: 'muz',
    obec: 'Ostrava 1'
  };

  const { requestId, ...response } = await wsClient.sendRequest(
    Actions.createUcast({ rok: 2017, udaje })
  );
  expect(response.response.id).not.toBeNull();
  response.response.id = '---';
  expect(response).toMatchSnapshot();

  const ucastnici = await Ucastnik.find({}, { _id: 0 });
  expect(ucastnici).toMatchSnapshot();

  await Ucastnik.remove({});
});

it('vytvoř dvě účasti', async () => {
  const udaje1 = {
    prijmeni: 'Balabák',
    jmeno: 'František',
    narozeni: { rok: 1953 },
    pohlavi: 'muz',
    obec: 'Ostrava 1'
  };
  const udaje2 = { ...udaje1, obec: 'Ostrava 2' };

  const response1 = await wsClient.sendRequest(Actions.createUcast({ rok: 2017, udaje: udaje1 }));

  const ucastnikId = response1.response.id;
  const { requestId, ...response2 } = await wsClient.sendRequest(
    Actions.createUcast({ id: ucastnikId, rok: 2018, udaje: udaje2 })
  );
  expect(response2).toMatchSnapshot();

  const ucastnici = await Ucastnik.find({}, { _id: 0 });
  expect(ucastnici).toMatchSnapshot();

  await Ucastnik.remove({});
});
