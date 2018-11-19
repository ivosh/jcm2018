'use strict';

const db = require('../../db');
const {
  API_MODIFY_STOPKY,
  STOPKY_ADD_MEZICAS,
  STOPKY_INSERT_MEZICAS,
  STOPKY_REMOVE_MEZICAS,
  STOPKY_RESET,
  STOPKY_START,
  STOPKY_STOP,
  apiCall
} = require('../../../common/common');
const createWsServer = require('../../createWsServer');
const createWsClient = require('./../createWsClient');
const Stopky = require('../../model/Stopky/Stopky');
const generateTestToken = require('../generateTestToken');

const port = 5601;
const wsServer = createWsServer({});
const wsClient = createWsClient({ port });
const token = generateTestToken();

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

const apiRequest = async ({ cas, modifikace, now, typ }) => {
  const { requestId, ...response } = await wsClient.sendRequest(
    apiCall({
      endpoint: API_MODIFY_STOPKY,
      request: { cas, modifikace, now: now ? now.toJSON() : undefined, typ },
      token
    })
  );
  if (response.response.stopky) {
    response.response.stopky._id = '===id===';
  }
  return response;
};

it('nastartuj stopky (stopky neexistují)', async () => {
  const response = await apiRequest({
    modifikace: STOPKY_START,
    now: new Date('2018-11-05T08:14:32.5Z'),
    typ: 'cyklo'
  });
  expect(response).toMatchSnapshot();

  const stopky = await Stopky.find({}, { _id: 0 }).lean();
  expect(stopky).toMatchSnapshot();
});

it('nastartuj již nastartované stopky', async () => {
  let response = await apiRequest({
    modifikace: STOPKY_START,
    now: new Date('2018-11-05T08:14:32.5Z'),
    typ: 'cyklo'
  });
  expect(response).toMatchSnapshot();

  response = await apiRequest({
    modifikace: STOPKY_START,
    now: new Date('2018-11-05T09:14:32.5Z'),
    typ: 'cyklo'
  });
  expect(response).toMatchSnapshot();

  const stopky = await Stopky.find({}, { _id: 0 }).lean();
  expect(stopky).toMatchSnapshot();
});

it('start a stop', async () => {
  let response = await apiRequest({
    modifikace: STOPKY_START,
    now: new Date('2018-11-05T08:14:32.5Z'),
    typ: 'cyklo'
  });
  expect(response).toMatchSnapshot();

  response = await apiRequest({
    modifikace: STOPKY_STOP,
    now: new Date('2018-11-05T09:21:32.5Z'),
    typ: 'cyklo'
  });
  expect(response).toMatchSnapshot();

  const stopky = await Stopky.find({}, { _id: 0 }).lean();
  expect(stopky).toMatchSnapshot();
});

it('dvakrát stop', async () => {
  let response = await apiRequest({
    modifikace: STOPKY_START,
    now: new Date('2018-11-05T08:14:32.5Z'),
    typ: 'cyklo'
  });
  expect(response).toMatchSnapshot();

  response = await apiRequest({
    modifikace: STOPKY_STOP,
    now: new Date('2018-11-05T09:21:32.5Z'),
    typ: 'cyklo'
  });
  expect(response).toMatchSnapshot();

  response = await apiRequest({
    modifikace: STOPKY_STOP,
    now: new Date('2018-11-05T10:15:32.5Z'),
    typ: 'cyklo'
  });
  expect(response).toMatchSnapshot();

  const stopky = await Stopky.find({}, { _id: 0 }).lean();
  expect(stopky).toMatchSnapshot();
});

it('přidej mezičas (stopky neexistují)', async () => {
  const response = await apiRequest({
    modifikace: STOPKY_ADD_MEZICAS,
    now: new Date(),
    typ: 'půlmaraton'
  });
  expect(response).toMatchSnapshot();

  const stopky = await Stopky.find({}, { _id: 0 }).lean();
  expect(stopky).toMatchSnapshot();
});

it('přidej mezičas (stopky nastartovány)', async () => {
  let response = await apiRequest({
    modifikace: STOPKY_START,
    now: new Date('2018-11-05T16:02:23.01Z'),
    typ: 'půlmaraton'
  });
  expect(response).toMatchSnapshot();

  response = await apiRequest({
    modifikace: STOPKY_ADD_MEZICAS,
    now: new Date('2018-11-05T16:04:12.1Z'),
    typ: 'půlmaraton'
  });
  expect(response).toMatchSnapshot();

  const stopky = await Stopky.find({}, { _id: 0 }).lean();
  expect(stopky).toMatchSnapshot();
});

it('reset', async () => {
  let response = await apiRequest({
    modifikace: STOPKY_START,
    now: new Date('2018-11-05T08:14:32.5Z'),
    typ: 'cyklo'
  });
  expect(response).toMatchSnapshot();

  response = await apiRequest({
    modifikace: STOPKY_STOP,
    now: new Date('2018-11-05T09:21:32.5Z'),
    typ: 'cyklo'
  });
  expect(response).toMatchSnapshot();

  response = await apiRequest({
    modifikace: STOPKY_RESET,
    now: new Date('2018-11-05T10:15:32.5Z'),
    typ: 'cyklo'
  });
  expect(response).toMatchSnapshot();

  const stopky = await Stopky.find({}, { _id: 0 }).lean();
  expect(stopky).toMatchSnapshot();
});

it('insert mezičas', async () => {
  let response = await apiRequest({
    modifikace: STOPKY_START,
    now: new Date('2018-11-05T16:02:23.01Z'),
    typ: 'půlmaraton'
  });
  expect(response).toMatchSnapshot();

  response = await apiRequest({
    modifikace: STOPKY_ADD_MEZICAS,
    now: new Date('2018-11-05T16:04:12.1Z'),
    typ: 'půlmaraton'
  });
  expect(response).toMatchSnapshot();

  response = await apiRequest({
    modifikace: STOPKY_ADD_MEZICAS,
    now: new Date('2018-11-05T16:08:12.1Z'),
    typ: 'půlmaraton'
  });
  expect(response).toMatchSnapshot();

  response = await apiRequest({
    modifikace: STOPKY_INSERT_MEZICAS,
    cas: 'PT5M32.7S',
    typ: 'půlmaraton'
  });
  expect(response).toMatchSnapshot();

  const stopky = await Stopky.find({}, { _id: 0 }).lean();
  expect(stopky).toMatchSnapshot();
});

it('remove mezičas - existující', async () => {
  let response = await apiRequest({
    modifikace: STOPKY_START,
    now: new Date('2018-11-05T16:02:23.01Z'),
    typ: 'půlmaraton'
  });
  expect(response).toMatchSnapshot();

  response = await apiRequest({
    modifikace: STOPKY_INSERT_MEZICAS,
    cas: 'PT2M15.7S',
    typ: 'půlmaraton'
  });
  expect(response).toMatchSnapshot();

  response = await apiRequest({
    modifikace: STOPKY_INSERT_MEZICAS,
    cas: 'PT4M32.03S',
    typ: 'půlmaraton'
  });
  expect(response).toMatchSnapshot();

  response = await apiRequest({
    modifikace: STOPKY_REMOVE_MEZICAS,
    cas: 'PT2M15.7S',
    typ: 'půlmaraton'
  });
  expect(response).toMatchSnapshot();

  const stopky = await Stopky.find({}, { _id: 0 }).lean();
  expect(stopky).toMatchSnapshot();
});

it('remove mezičas - neexistující', async () => {
  let response = await apiRequest({
    modifikace: STOPKY_START,
    now: new Date('2018-11-05T16:02:23.01Z'),
    typ: 'půlmaraton'
  });
  expect(response).toMatchSnapshot();

  response = await apiRequest({
    modifikace: STOPKY_INSERT_MEZICAS,
    cas: 'PT2M15.7S',
    typ: 'půlmaraton'
  });
  expect(response).toMatchSnapshot();

  response = await apiRequest({
    modifikace: STOPKY_INSERT_MEZICAS,
    cas: 'PT4M32.03S',
    typ: 'půlmaraton'
  });
  expect(response).toMatchSnapshot();

  response = await apiRequest({
    modifikace: STOPKY_REMOVE_MEZICAS,
    cas: 'PT3M0.0S',
    typ: 'půlmaraton'
  });
  expect(response).toMatchSnapshot();

  const stopky = await Stopky.find({}, { _id: 0 }).lean();
  expect(stopky).toMatchSnapshot();
});

it('neexistující modifikace', async () => {
  const { requestId, ...response } = await wsClient.sendRequest(
    apiCall({ endpoint: API_MODIFY_STOPKY, request: { modifikace: 'huh' }, token })
  );
  expect(response).toMatchSnapshot();
});

it('not authenticated', async () => {
  const { requestId, ...response } = await wsClient.sendRequest(
    apiCall({ endpoint: API_MODIFY_STOPKY })
  );
  expect(response).toMatchSnapshot();
});
