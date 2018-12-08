'use strict';

const jwt = require('jsonwebtoken');
const { API_SIGN_IN, apiCall } = require('../../../common/common');
const config = require('../../config');
const db = require('../../db');
const createWsServer = require('../../createWsServer');
const createWsClient = require('./../createWsClient');
const User = require('../../model/User/User');

const port = 5602;
const ONE_DAY = 24 * 60 * 60;
const wsServer = createWsServer({});
const wsClient = createWsClient({ port });

beforeAll(async () => {
  wsServer.listen(port);
  await wsClient.open();
  await db.connect();
});

beforeEach(async () => {
  await User.deleteMany();
});

afterAll(async () => {
  await wsClient.close();
  await wsServer.close();
  await db.disconnect();
});

it('signIn successfully', async () => {
  const user = new User({ username: 'tumáš', password: 'jcm2018' });
  await user.save();

  const { requestId, ...response } = await wsClient.sendRequest(
    apiCall({
      endpoint: API_SIGN_IN,
      request: { username: 'tumáš', password: 'jcm2018', nonce: 'x834t8df' }
    })
  );
  expect(response.response.token).toBeTruthy();

  const decoded = jwt.verify(response.response.token, config.jwt.secret);
  expect(decoded.username).toEqual('tumáš');
  expect(decoded.nonce).toEqual('x834t8df');

  response.response.token = '===token===';
  expect(response).toMatchSnapshot();
});

it('signIn unsuccessfully (špatné heslo)', async () => {
  const user = new User({ username: 'tumáš', password: 'jcm2018' });
  await user.save();

  const { requestId, ...response } = await wsClient.sendRequest(
    apiCall({
      endpoint: API_SIGN_IN,
      request: { username: 'tumáš', password: 'jcm2017', nonce: 'ab87cxf' }
    })
  );
  expect(response).toMatchSnapshot();
});

it('signIn unsuccessfully (špatný uživatel)', async () => {
  const user = new User({ username: 'tumáš', password: 'jcm2018' });
  await user.save();

  const { requestId, ...response } = await wsClient.sendRequest(
    apiCall({
      endpoint: API_SIGN_IN,
      request: { username: 'tomáš', password: 'jcm2018', nonce: '29cms4487' }
    })
  );
  expect(response).toMatchSnapshot();
});

it('signIn unsuccessfully (zamčený uživatel)', async () => {
  const now = new Date();
  const dayAfter = new Date(now.getTime() + ONE_DAY);

  const user = new User({
    username: 'tumáš',
    password: 'jcm2018',
    lockUntil: dayAfter
  });
  await user.save();

  const { requestId, ...response } = await wsClient.sendRequest(
    apiCall({
      endpoint: API_SIGN_IN,
      request: { username: 'tumáš', password: 'jcm2018', nonce: '75z7wax' }
    })
  );
  expect(response).toMatchSnapshot();
});
