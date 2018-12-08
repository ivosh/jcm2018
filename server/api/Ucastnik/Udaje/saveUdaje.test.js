'use strict';

const db = require('../../../db');
const { API_SAVE_UDAJE, apiCall } = require('../../../../common/common');
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

  const { requestId, ...response } = await wsClient.sendRequest(
    apiCall({ endpoint: API_SAVE_UDAJE, request: { rok: 2018, udaje }, token })
  );
  expect(response.response.id).not.toBeNull();
  response.response.id = '---';
  expect(response).toMatchSnapshot();

  const ucastnici = await Ucastnik.find({}, { _id: 0, __v: 0 });
  expect(ucastnici).toMatchSnapshot();
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
    apiCall({ endpoint: API_SAVE_UDAJE, request: { rok: 2017, udaje: udaje1 }, token })
  );

  const ucastnikId = response1.response.id;
  const { requestId, ...response2 } = await wsClient.sendRequest(
    apiCall({
      endpoint: API_SAVE_UDAJE,
      request: { id: ucastnikId, rok: 2018, udaje: udaje2 },
      token
    })
  );
  response2.response.id = '---';
  expect(response2).toMatchSnapshot();

  const ucastnici = await Ucastnik.find({}, { _id: 0, __v: 0 });
  expect(ucastnici).toMatchSnapshot();
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
    apiCall({ endpoint: API_SAVE_UDAJE, request: { rok: 2018, udaje: udaje1 }, token })
  );
  const ucastnikId = response1.response.id;

  await wsClient.sendRequest(
    apiCall({
      endpoint: API_SAVE_UDAJE,
      request: { id: ucastnikId, rok: 2017, udaje: udaje2 },
      token
    })
  );
  await wsClient.sendRequest(
    apiCall({
      endpoint: API_SAVE_UDAJE,
      request: { id: ucastnikId, rok: 2016, udaje: udaje3 },
      token
    })
  );
  await wsClient.sendRequest(
    apiCall({
      endpoint: API_SAVE_UDAJE,
      request: { id: ucastnikId, rok: 2015, udaje: udaje4 },
      token
    })
  );

  const { requestId, ...response5 } = await wsClient.sendRequest(
    apiCall({
      endpoint: API_SAVE_UDAJE,
      request: { id: ucastnikId, rok: 2017, udaje: udaje5 },
      token
    })
  );
  response5.response.id = '---';
  expect(response5).toMatchSnapshot();

  const ucastnici = await Ucastnik.find({}, { _id: 0, __v: 0 });
  expect(ucastnici).toMatchSnapshot();
});

it('účastník neexistuje', async () => {
  const udaje = {
    prijmeni: 'Balabák',
    jmeno: 'František',
    narozeni: { rok: 1953 },
    pohlavi: 'muž',
    obec: 'Ostrava 1'
  };

  const { requestId, ...response } = await wsClient.sendRequest(
    apiCall({
      endpoint: API_SAVE_UDAJE,
      request: { id: '41224d776a326fb40f000001', rok: 2018, udaje },
      token
    })
  );
  expect(response).toMatchSnapshot();
});

it('účastník neexistuje - špatné ID', async () => {
  const udaje = {
    prijmeni: 'Balabák',
    jmeno: 'František',
    narozeni: { rok: 1953 },
    pohlavi: 'muž',
    obec: 'Ostrava 1'
  };

  const { requestId, ...response } = await wsClient.sendRequest(
    apiCall({
      endpoint: API_SAVE_UDAJE,
      request: { id: '===neexistujici===', rok: 2018, udaje },
      token
    })
  );
  expect(response).toMatchSnapshot();
});

it('údaje chybí', async () => {
  const udaje = {
    prijmeni: 'Sukdoláková',
    jmeno: 'Božena',
    narozeni: { rok: 1967 },
    pohlavi: 'žena',
    obec: 'Kladno 1',
    psc: '327 41'
  };

  const response1 = await wsClient.sendRequest(
    apiCall({ endpoint: API_SAVE_UDAJE, request: { rok: 2018, udaje }, token })
  );
  const { id } = response1.response;
  expect(id).toBeTruthy();

  const { requestId, ...response } = await wsClient.sendRequest(
    apiCall({ endpoint: API_SAVE_UDAJE, request: { id, rok: 2018 }, token })
  );
  expect(response).toMatchSnapshot();
});

it('saveUdaje [not authenticated]', async () => {
  const { requestId, ...response } = await wsClient.sendRequest(
    apiCall({ endpoint: API_SAVE_UDAJE })
  );
  expect(response).toMatchSnapshot();
});
