'use strict';

const db = require('../../db');
const Actions = require('../../../common/common');
const createWsServer = require('../../createWsServer');
const createWsClient = require('../createWsClient');
const Stopky = require('../../model/Stopky/Stopky');
const generateTestToken = require('../generateTestToken');

const port = 5603;
const wsServer = createWsServer({});
const wsClient = createWsClient({ port });

beforeAll(async () => {
  wsServer.httpServer().listen(port);
  await wsClient.open();

  await db.connect();
});

beforeEach(async () => {
  await Stopky.remove();
});

afterAll(async () => {
  await wsClient.close();
  wsServer.httpServer().close();

  await db.disconnect();
});

it('findAllStopky', async () => {
  const stopky1 = new Stopky({ typ: 'maraton', base: null, delta: 'P0D', running: false });
  await stopky1.save();
  const stopky2 = new Stopky({
    typ: 'půlmaraton',
    base: null,
    delta: 'PT1H23M07.34S',
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
    Actions.findAllStopky(generateTestToken())
  );

  expect(response).toMatchSnapshot();
});

it('findAllStopky [not authenticated]', async () => {
  const { requestId, ...response } = await wsClient.sendRequest(Actions.findAllStopky(null));
  expect(response).toMatchSnapshot();
});