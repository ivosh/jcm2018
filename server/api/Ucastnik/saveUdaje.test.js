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
    Actions.saveUdaje({ rok: 2018, udaje }, generateTestToken())
  );
  expect(response.response.id).not.toBeNull();
  response.response.id = '---';
  expect(response).toMatchSnapshot();

  const ucastnici = await Ucastnik.find({}, { _id: 0, __v: 0 });
  expect(ucastnici).toMatchSnapshot();

  await Ucastnik.collection.drop();
});

it('vytvoř dvě účasti', async () => {
  const udaje1 = {
    prijmeni: 'Sukdoláková',
    jmeno: 'Božena',
    narozeni: { rok: 1967 },
    pohlavi: 'žena',
    obec: 'Kladno Rozdělov',
    psc: '327 41'
  };
  const udaje2 = { ...udaje1, obec: 'Kamenický Přívoz' };

  const response1 = await wsClient.sendRequest(
    Actions.saveUdaje({ rok: 2017, udaje: udaje1 }, generateTestToken())
  );

  const ucastnikId = response1.response.id;
  const { requestId, ...response2 } = await wsClient.sendRequest(
    Actions.saveUdaje({ id: ucastnikId, rok: 2018, udaje: udaje2 }, generateTestToken())
  );
  response2.response.id = '---';
  expect(response2).toMatchSnapshot();

  const ucastnici = await Ucastnik.find({}, { _id: 0, __v: 0 });
  expect(ucastnici).toMatchSnapshot();

  await Ucastnik.collection.drop();
});

it('přepiš existující účast', async () => {
  const udaje1 = {
    prijmeni: 'Sukdoláková',
    jmeno: 'Božena',
    narozeni: { rok: 1967 },
    pohlavi: 'žena',
    obec: 'Kladno 1',
    psc: '327 41'
  };
  const udaje2 = { ...udaje1, obec: 'Kladno 2' };
  const udaje3 = { ...udaje1, obec: 'Kladno 3' };
  const udaje4 = { ...udaje1, obec: 'Kladno 4' };
  const udaje5 = { ...udaje1, obec: 'Kladno 5' };

  const response1 = await wsClient.sendRequest(
    Actions.saveUdaje({ rok: 2018, udaje: udaje1 }, generateTestToken())
  );
  const ucastnikId = response1.response.id;

  await wsClient.sendRequest(
    Actions.saveUdaje({ id: ucastnikId, rok: 2017, udaje: udaje2 }, generateTestToken())
  );
  await wsClient.sendRequest(
    Actions.saveUdaje({ id: ucastnikId, rok: 2016, udaje: udaje3 }, generateTestToken())
  );
  await wsClient.sendRequest(
    Actions.saveUdaje({ id: ucastnikId, rok: 2015, udaje: udaje4 }, generateTestToken())
  );

  const { requestId, ...response5 } = await wsClient.sendRequest(
    Actions.saveUdaje({ id: ucastnikId, rok: 2017, udaje: udaje5 }, generateTestToken())
  );
  response5.response.id = '---';
  expect(response5).toMatchSnapshot();

  const ucastnici = await Ucastnik.find({}, { _id: 0, __v: 0 });
  expect(ucastnici).toMatchSnapshot();

  await Ucastnik.collection.drop();
});

it('saveUcast [not authenticated]', async () => {
  const { requestId, ...response } = await wsClient.sendRequest(Actions.saveUdaje({}, null));
  expect(response).toMatchSnapshot();
});
