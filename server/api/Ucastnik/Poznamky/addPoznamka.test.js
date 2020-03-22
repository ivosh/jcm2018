'use strict';

const db = require('../../../db');
const { API_ADD_POZNAMKA, apiCall } = require('../../../../common/common');
const createWsServer = require('../../../createWsServer');
const createWsClient = require('../../createWsClient');
const Ucastnik = require('../../../model/Ucastnik/Ucastnik');
const generateTestToken = require('../../generateTestToken');

const port = 5010;
const wsServer = createWsServer({});
const wsClient = createWsClient({ port });
const token = generateTestToken();

beforeAll(async () => {
  wsServer.listen(port);
  await wsClient.open();
  await db.connect();
});

beforeEach(async () => {
  await Ucastnik.deleteMany();
});

afterAll(async () => {
  await wsClient.close();
  await wsServer.close();
  await db.disconnect();
});

it('addPoznamka - dosud žádné poznámky', async () => {
  const udaje = {
    prijmeni: 'Balabák',
    jmeno: 'František',
    narozeni: { rok: 1953 },
    pohlavi: 'muž',
    obec: 'Ostrava 1',
  };
  const ucastnik = new Ucastnik();
  ucastnik.ucasti.push({ rok: 2018, udaje });
  await ucastnik.save();

  const { requestId, ...response } = await wsClient.sendRequest(
    apiCall({
      endpoint: API_ADD_POZNAMKA,
      request: {
        id: ucastnik.id,
        rok: 2018,
        poznamka: { datum: '2018-04-01T18:42:12.234Z', text: 'první poznámka' },
      },
      token,
    })
  );
  expect(response).toMatchSnapshot();

  const ucastnici = await Ucastnik.find({}, { _id: 0 }).lean();
  expect(ucastnici).toMatchSnapshot();
});

it('addPoznamka - existující poznámky', async () => {
  const udaje = {
    prijmeni: 'Balabák',
    jmeno: 'František',
    narozeni: { rok: 1953 },
    pohlavi: 'muž',
    obec: 'Ostrava 1',
  };
  const poznamky = [
    { datum: '2018-02-07T00:00:00Z', text: 'první přihlášený' },
    { datum: '2018-06-08T00:00:00Z', text: 'možná se odhlásí' },
  ];
  const ucastnik = new Ucastnik();
  ucastnik.ucasti.push({ rok: 2018, udaje, poznamky });
  await ucastnik.save();

  const { requestId, ...response } = await wsClient.sendRequest(
    apiCall({
      endpoint: API_ADD_POZNAMKA,
      request: {
        id: ucastnik.id,
        rok: 2018,
        poznamka: { datum: '2018-04-01T18:42:12.234Z', text: 'prostřední poznámka' },
      },
      token,
    })
  );
  expect(response).toMatchSnapshot();

  const ucastnici = await Ucastnik.find({}, { _id: 0 }).lean();
  expect(ucastnici).toMatchSnapshot();
});

it('účastník neexistuje', async () => {
  const { requestId, ...response } = await wsClient.sendRequest(
    apiCall({
      endpoint: API_ADD_POZNAMKA,
      request: { id: '41224d776a326fb40f000001', rok: 2018, poznamka: {} },
      token,
    })
  );
  expect(response).toMatchSnapshot();
});

it('addPoznamka [not authenticated]', async () => {
  const { requestId, ...response } = await wsClient.sendRequest(
    apiCall({ endpoint: API_ADD_POZNAMKA })
  );
  expect(response).toMatchSnapshot();
});
