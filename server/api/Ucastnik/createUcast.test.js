'use strict';

const db = require('../../db');
const Actions = require('../../../common/common');
const createWsServer = require('../../createWsServer');
const createWsClient = require('./../createWsClient');
const Ucastnik = require('../../model/Ucastnik/Ucastnik');

const port = 5601;
const wsServer = createWsServer({});
const wsClient = createWsClient({ port });

beforeAll(async () => {
  wsServer.httpServer().listen(port);
  await wsClient.open();

  await db.dropDatabase();
});

afterAll(async () => {
  await wsClient.close();
  wsServer.httpServer().close();

  await db.disconnect();
});

it('vytvoř minimálního účastníka', async () => {
  const udaje = {
    prijmeni: 'Balabák',
    jmeno: 'František',
    narozeni: { rok: 1953 },
    pohlavi: 'muž',
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

  await Ucastnik.collection.drop();
});

it('vytvoř dvě účasti', async () => {
  const udaje1 = {
    prijmeni: 'Balabák',
    jmeno: 'František',
    narozeni: { rok: 1953 },
    pohlavi: 'muž',
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

  await Ucastnik.collection.drop();
});
