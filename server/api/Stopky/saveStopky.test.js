'use strict';

const db = require('../../db');
const { API_SAVE_STOPKY, apiCall } = require('../../../common/common');
const createWsServer = require('../../createWsServer');
const createWsClient = require('./../createWsClient');
const Stopky = require('../../model/Stopky/Stopky');
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
  await Stopky.deleteMany();
});

afterAll(async () => {
  await wsClient.close();
  wsServer.httpServer().close();

  await db.disconnect();
});

it('vytvoř stopky', async () => {
  const stopky = { typ: 'půlmaraton', base: null, delta: 'PT0H0M12.5S', running: false };

  const { requestId, ...response } = await wsClient.sendRequest(
    apiCall({ endpoint: API_SAVE_STOPKY, request: stopky, token: generateTestToken() })
  );
  expect(response).toMatchSnapshot();

  const data = await Stopky.find({}, { _id: 0 }).lean();
  expect(data).toMatchSnapshot();
});

it('přepiš existující stopky', async () => {
  const stopky1 = {
    typ: 'půlmaraton',
    base: null,
    delta: 'PT0H0M12.5S',
    mezicasy: [{ cas: 'PT0H12M07.12S' }],
    running: false
  };
  const stopky2 = {
    typ: 'půlmaraton',
    base: '2018-06-09T09:10:00.4Z',
    delta: 'P0D',
    mezicasy: [{ cas: 'PT1H25M49.04S' }, { cas: 'PT0H12M07.12S' }],
    running: true
  };

  let { requestId, ...response } = await wsClient.sendRequest(
    apiCall({ endpoint: API_SAVE_STOPKY, request: stopky1, token: generateTestToken() })
  );
  expect(response).toMatchSnapshot();

  ({ requestId, ...response } = await wsClient.sendRequest(
    apiCall({ endpoint: API_SAVE_STOPKY, request: stopky2, token: generateTestToken() })
  ));
  expect(response).toMatchSnapshot();

  const data = await Stopky.find({}, { _id: 0 }).lean();
  expect(data).toMatchSnapshot();
});

it('saveStopky [not authenticated]', async () => {
  const { requestId, ...response } = await wsClient.sendRequest(
    apiCall({ endpoint: API_SAVE_STOPKY })
  );
  expect(response).toMatchSnapshot();
});
