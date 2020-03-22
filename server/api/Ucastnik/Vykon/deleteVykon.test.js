'use strict';

const db = require('../../../db');
const {
  API_DELETE_VYKON,
  API_SAVE_UDAJE,
  API_SAVE_VYKON,
  apiCall,
} = require('../../../../common/common');
const createWsServer = require('../../../createWsServer');
const createWsClient = require('../../createWsClient');
const Kategorie = require('../../../model/Kategorie/Kategorie');
const Ucastnik = require('../../../model/Ucastnik/Ucastnik');
const generateTestToken = require('../../generateTestToken');

const port = 5601;
const wsServer = createWsServer({});
const wsClient = createWsClient({ port });
const token = generateTestToken();

let kategorie;
beforeAll(async () => {
  wsServer.listen(port);
  await wsClient.open();
  await db.connect();

  await Kategorie.deleteMany();
  kategorie = new Kategorie({
    typ: 'maraton',
    pohlavi: 'žena',
    vek: { min: 40, max: 49 },
  });
  await kategorie.save();
});

beforeEach(async () => {
  await Ucastnik.deleteMany();
});

afterAll(async () => {
  await wsClient.close();
  await wsServer.close();
  await db.disconnect();
});

it('vytvoř minimálního účastníka', async () => {
  const udaje = {
    prijmeni: 'Sukdoláková',
    jmeno: 'Božena',
    narozeni: { rok: 1973 },
    pohlavi: 'žena',
    obec: 'Kladno',
  };
  const vykon = { kategorie: kategorie.id, startCislo: 15, dokonceno: true, cas: 'T3:24:15.048S' };

  const response1 = await wsClient.sendRequest(
    apiCall({ endpoint: API_SAVE_UDAJE, request: { rok: 2018, udaje }, token })
  );
  const { id } = response1.response;
  expect(id).toBeTruthy();

  let { requestId, ...response } = await wsClient.sendRequest(
    apiCall({ endpoint: API_SAVE_VYKON, request: { id, rok: 2018, vykon }, token })
  );
  expect(response).toMatchSnapshot();

  ({ requestId, ...response } = await wsClient.sendRequest(
    apiCall({ endpoint: API_DELETE_VYKON, request: { id, rok: 2018 }, token })
  ));
  expect(response).toMatchSnapshot();

  const ucastnici = await Ucastnik.find({}, { _id: 0 }).lean();
  expect(ucastnici[0].ucasti[0].vykon).toBeFalsy();
  expect(ucastnici).toMatchSnapshot();
});

it('deleteVykon [not authenticated]', async () => {
  const { requestId, ...response } = await wsClient.sendRequest(
    apiCall({ endpoint: API_DELETE_VYKON })
  );
  expect(response).toMatchSnapshot();
});
