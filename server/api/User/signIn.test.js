'use strict';

const jwt = require('jsonwebtoken');
const Actions = require('../../../common/common');
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
  wsServer.httpServer().listen(port);
  await wsClient.open();

  await db.dropDatabase();
});

afterAll(async () => {
  await wsClient.close();
  wsServer.httpServer().close();

  await db.disconnect();
});

it('signIn successfully', async () => {
  const user = new User({ username: 'tumáš', password: 'jcm2018' });
  await user.save();

  const { requestId, ...response } = await wsClient.sendRequest(
    Actions.signIn('tumáš', 'jcm2018', 'x834t8df')
  );
  expect(response.response.token).toBeTruthy();

  const decoded = jwt.verify(response.response.token, config.jwt.secret);
  expect(decoded.username).toEqual('tumáš');
  expect(decoded.nonce).toEqual('x834t8df');

  response.response.token = '===token===';
  expect(response).toMatchSnapshot();

  await User.remove({});
});

it('signIn unsuccessfully (špatné heslo)', async () => {
  const user = new User({ username: 'tumáš', password: 'jcm2018' });
  await user.save();

  const { requestId, ...response } = await wsClient.sendRequest(
    Actions.signIn('tumáš', 'jcm2017', 'ab87cxf')
  );
  expect(response).toMatchSnapshot();

  await User.remove({});
});

it('signIn unsuccessfully (špatný uživatel)', async () => {
  const user = new User({ username: 'tumáš', password: 'jcm2018' });
  await user.save();

  const { requestId, ...response } = await wsClient.sendRequest(
    Actions.signIn('tomáš', 'jcm2018', '29cms4487')
  );
  expect(response).toMatchSnapshot();

  await User.remove({});
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
    Actions.signIn('tumáš', 'jcm2018', '75z7wax')
  );
  expect(response).toMatchSnapshot();

  await User.remove({});
});
