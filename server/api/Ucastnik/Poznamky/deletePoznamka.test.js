'use strict';

const db = require('../../../db');
const { API_DELETE_POZNAMKA, apiCall } = require('../../../../common/common');
const createWsServer = require('../../../createWsServer');
const createWsClient = require('../../createWsClient');
const Ucastnik = require('../../../model/Ucastnik/Ucastnik');
const generateTestToken = require('../../generateTestToken');

const port = 5011;
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

it('deletePoznamka', async () => {
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
      endpoint: API_DELETE_POZNAMKA,
      request: {
        id: ucastnik.id,
        rok: 2018,
        index: 0,
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
      endpoint: API_DELETE_POZNAMKA,
      request: { id: '41224d776a326fb40f000001', rok: 2018, index: 0 },
      token,
    })
  );
  expect(response).toMatchSnapshot();
});

it('deletePoznamka [not authenticated]', async () => {
  const { requestId, ...response } = await wsClient.sendRequest(
    apiCall({ endpoint: API_DELETE_POZNAMKA })
  );
  expect(response).toMatchSnapshot();
});
