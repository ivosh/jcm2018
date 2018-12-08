'use strict';

const db = require('../../../db');
const { API_SAVE_PLATBY, API_SAVE_UDAJE, apiCall } = require('../../../../common/common');
const createWsServer = require('../../../createWsServer');
const createWsClient = require('./../../createWsClient');
const Ucastnik = require('../../../model/Ucastnik/Ucastnik');
const generateTestToken = require('../../generateTestToken');

const port = 5601;
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
    apiCall({ endpoint: API_SAVE_UDAJE, request: { rok: 2018, udaje }, token })
  );
  const { id } = response1.response;
  expect(id).toBeTruthy();

  const { requestId, ...response } = await wsClient.sendRequest(
    apiCall({ endpoint: API_SAVE_PLATBY, request: { id, rok: 2018, platby }, token })
  );
  expect(response).toMatchSnapshot();

  const ucastnici = await Ucastnik.find({}, { _id: 0 }).lean();
  expect(ucastnici).toMatchSnapshot();
});

it('účastník neexistuje', async () => {
  const platby = [];

  const { requestId, ...response } = await wsClient.sendRequest(
    apiCall({
      endpoint: API_SAVE_PLATBY,
      request: { id: '41224d776a326fb40f000001', rok: 2018, platby },
      token
    })
  );
  expect(response).toMatchSnapshot();
});

it('savePlatby [not authenticated]', async () => {
  const { requestId, ...response } = await wsClient.sendRequest(
    apiCall({ endpoint: API_SAVE_PLATBY })
  );
  expect(response).toMatchSnapshot();
});
