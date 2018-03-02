'use strict';

const db = require('../../db');
const Actions = require('../../../common/common');
const createWsServer = require('../../createWsServer');
const createWsClient = require('./../createWsClient');
const Ucastnik = require('../../model/Ucastnik/Ucastnik');
const generateTestToken = require('../generateTestToken');

const port = 5601;
const wsServer = createWsServer({});
const wsClient = createWsClient({ port });

beforeAll(async () => {
  wsServer.httpServer().listen(port);
  await wsClient.open();

  await db.connect();
});

beforeEach(async () => {
  await db.dropCollection(Ucastnik);
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
  const platby = [
    { castka: 200, datum: '2018-02-07T00:00:00Z', typ: 'převodem', poznámka: 'stále visí' },
    { castka: 20, datum: '2018-06-08T00:00:00Z', typ: 'hotově' }
  ];

  const response1 = await wsClient.sendRequest(
    Actions.saveUdaje({ rok: 2018, udaje }, generateTestToken())
  );
  const { id } = response1.response;
  expect(id).toBeTruthy();

  const { requestId, ...response } = await wsClient.sendRequest(
    Actions.savePlatby({ id, rok: 2018, platby }, generateTestToken())
  );
  expect(response).toMatchSnapshot();

  const ucastnici = await Ucastnik.find({}, { _id: 0 }).lean();
  expect(ucastnici).toMatchSnapshot();
});

it('účastník neexistuje', async () => {
  const platby = [];

  const { requestId, ...response } = await wsClient.sendRequest(
    Actions.savePlatby({ id: '41224d776a326fb40f000001', rok: 2018, platby }, generateTestToken())
  );
  expect(response).toMatchSnapshot();
});

it('savePlatby [not authenticated]', async () => {
  const { requestId, ...response } = await wsClient.sendRequest(Actions.savePlatby({}, null));
  expect(response).toMatchSnapshot();
});
