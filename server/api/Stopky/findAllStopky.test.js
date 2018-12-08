'use strict';

const db = require('../../db');
const { API_FIND_ALL_STOPKY, apiCall } = require('../../../common/common');
const createWsServer = require('../../createWsServer');
const createWsClient = require('../createWsClient');
const Stopky = require('../../model/Stopky/Stopky');
const generateTestToken = require('../generateTestToken');

const port = 5603;
const wsServer = createWsServer({});
const wsClient = createWsClient({ port });

beforeAll(async () => {
  wsServer.listen(port);
  await wsClient.open();
  await db.connect();
});

beforeEach(async () => {
  await Stopky.deleteMany();
});

afterAll(async () => {
  await wsClient.close();
  await wsServer.close();
  await db.disconnect();
});

it('findAllStopky', async () => {
  const stopky1 = new Stopky({
    typ: 'maraton',
    base: null,
    delta: 'P0D',
    mezicasy: [{ cas: 'PT1H23M07.4S', korekce: 'PT1H23M01.5S' }, { cas: 'PT2H15M24.7S' }],
    running: false
  });
  await stopky1.save();
  const stopky2 = new Stopky({
    typ: 'půlmaraton',
    base: null,
    delta: 'PT1H23M07.34S',
    mezicasy: [
      { cas: 'PT5H03M19.32S' },
      { cas: 'PT5H15M24.7S', korekce: 'PT5H12M24.7S' },
      { cas: 'PT5H19M03.5S' }
    ],
    running: false
  });
  await stopky2.save();
  const stopky3 = new Stopky({
    typ: 'cyklo',
    base: new Date('2017-12-01T07:30:00Z'),
    delta: 'P0D',
    running: true
  });
  await stopky3.save();
  const stopky4 = new Stopky({
    typ: 'koloběžka',
    base: null,
    delta: 'PT4H0M0.32S',
    running: false
  });
  await stopky4.save();

  const { requestId, ...response } = await wsClient.sendRequest(
    apiCall({ endpoint: API_FIND_ALL_STOPKY, token: generateTestToken() })
  );

  expect(response).toMatchSnapshot();
});

it('findAllStopky [not authenticated]', async () => {
  const { requestId, ...response } = await wsClient.sendRequest(
    apiCall({ endpoint: API_FIND_ALL_STOPKY })
  );
  expect(response).toMatchSnapshot();
});
