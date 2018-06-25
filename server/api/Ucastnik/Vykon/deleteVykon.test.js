'use strict';

const db = require('../../../db');
const Actions = require('../../../../common/common');
const createWsServer = require('../../../createWsServer');
const createWsClient = require('./../../createWsClient');
const Kategorie = require('../../../model/Kategorie/Kategorie');
const Ucastnik = require('../../../model/Ucastnik/Ucastnik');
const generateTestToken = require('../../generateTestToken');

const port = 5601;
const wsServer = createWsServer({});
const wsClient = createWsClient({ port });

let kategorie;
beforeAll(async () => {
  wsServer.httpServer().listen(port);
  await wsClient.open();

  await db.connect();

  await Kategorie.remove();
  kategorie = new Kategorie({
    typ: 'maraton',
    pohlavi: 'žena',
    vek: { min: 40, max: 49 }
  });
  await kategorie.save();
});

beforeEach(async () => {
  await Ucastnik.remove();
});

afterAll(async () => {
  await wsClient.close();
  wsServer.httpServer().close();

  await db.disconnect();
});

it('vytvoř minimálního účastníka', async () => {
  const udaje = {
    prijmeni: 'Sukdoláková',
    jmeno: 'Božena',
    narozeni: { rok: 1973 },
    pohlavi: 'žena',
    obec: 'Kladno'
  };
  const vykon = { kategorie: kategorie.id, startCislo: 15, dokonceno: true, cas: 'T3:24:15.048S' };

  const response1 = await wsClient.sendRequest(
    Actions.saveUdaje({ rok: 2018, udaje }, generateTestToken())
  );
  const { id } = response1.response;
  expect(id).toBeTruthy();

  let { requestId, ...response } = await wsClient.sendRequest(
    Actions.saveVykon({ id, rok: 2018, vykon }, generateTestToken())
  );
  expect(response).toMatchSnapshot();

  ({ requestId, ...response } = await wsClient.sendRequest(
    Actions.deleteVykon({ id, rok: 2018 }, generateTestToken())
  ));
  expect(response).toMatchSnapshot();

  const ucastnici = await Ucastnik.find({}, { _id: 0 }).lean();
  expect(ucastnici[0].ucasti[0].vykon).toBeFalsy();
  expect(ucastnici).toMatchSnapshot();
});

it('deleteVykon [not authenticated]', async () => {
  const { requestId, ...response } = await wsClient.sendRequest(Actions.deleteVykon({}, null));
  expect(response).toMatchSnapshot();
});
