'use strict';

const { API_SEND_EMAIL, apiCall } = require('../../../common/common');
const createWsServer = require('../../createWsServer');
const createWsClient = require('./../createWsClient');
const db = require('../../db');
const User = require('../../model/User/User');
const generateTestToken = require('../generateTestToken');

const port = 5613;
const wsServer = createWsServer({});
const wsClient = createWsClient({ port });
const token = generateTestToken();

beforeAll(async () => {
  wsServer.listen(port);
  await wsClient.open();
  await db.connect();
});

beforeEach(async () => {
  await User.deleteMany();

  const user = new User({ username: 'tumáš', password: 'jcm2018', email: 'tumas@topol.io' });
  await user.save();
});

afterAll(async () => {
  await User.deleteMany();

  await wsClient.close();
  await wsServer.close();
  await db.disconnect();
});

it('sendEmail successfully', async () => {
  const { requestId, ...response } = await wsClient.sendRequest(
    apiCall({
      endpoint: API_SEND_EMAIL,
      request: {
        mailTo: 'test@test.io',
        subject: 'Test subject',
        html: 'Test email for <i>masses</i>.'
      },
      token
    })
  );

  expect(response).toMatchSnapshot();

  const users = await User.find({}, { _id: 0 }).lean();
  expect(users[0].sentEmails).toHaveLength(1);
  expect(users[0].sentEmails[0].date).toBeTruthy();
  users[0].password = '===password===';
  users[0].sentEmails[0].date = '===date===';
  expect(users).toMatchSnapshot();
});

it('not authenticated', async () => {
  const { requestId, ...response } = await wsClient.sendRequest(
    apiCall({ endpoint: API_SEND_EMAIL })
  );
  expect(response).toMatchSnapshot();
});
