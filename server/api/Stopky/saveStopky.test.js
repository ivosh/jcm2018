'use strict';

const db = require('../../db');
const Actions = require('../../../common/common');
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
  await Stopky.remove();
});

afterAll(async () => {
  await wsClient.close();
  wsServer.httpServer().close();

  await db.disconnect();
});

it('vytvoř stopky', async () => {
  const stopky = { typ: 'půlmaraton', base: null, delta: 'PT0H0M12.5S', running: false };

  const { requestId, ...response } = await wsClient.sendRequest(
    Actions.saveStopky({ ...stopky }, generateTestToken())
  );
  expect(response).toMatchSnapshot();

  const data = await Stopky.find({}, { _id: 0 }).lean();
  expect(data).toMatchSnapshot();
});

it('přepiš existující stopky', async () => {
  const stopky1 = { typ: 'půlmaraton', base: null, delta: 'PT0H0M12.5S', running: false };
  const stopky2 = {
    typ: 'půlmaraton',
    base: '2018-06-09T09:10:00.4Z',
    delta: 'P0D',
    running: true
  };

  let { requestId, ...response } = await wsClient.sendRequest(
    Actions.saveStopky({ ...stopky1 }, generateTestToken())
  );
  expect(response).toMatchSnapshot();

  ({ requestId, ...response } = await wsClient.sendRequest(
    Actions.saveStopky({ ...stopky2 }, generateTestToken())
  ));
  expect(response).toMatchSnapshot();

  const data = await Stopky.find({}, { _id: 0 }).lean();
  expect(data).toMatchSnapshot();
});

it('saveStopky [not authenticated]', async () => {
  const { requestId, ...response } = await wsClient.sendRequest(Actions.saveStopky({}, null));
  expect(response).toMatchSnapshot();
});
