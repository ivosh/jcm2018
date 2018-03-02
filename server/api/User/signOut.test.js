'use strict';

const Actions = require('../../../common/common');
const db = require('../../db');
const createWsServer = require('../../createWsServer');
const createWsClient = require('./../createWsClient');
const User = require('../../model/User/User');

const port = 5605;
const wsServer = createWsServer({});
const wsClient = createWsClient({ port });

beforeAll(async () => {
  wsServer.httpServer().listen(port);
  await wsClient.open();

  await db.connect();
});

beforeEach(async () => {
  await db.dropCollection(User);
});

afterAll(async () => {
  await wsClient.close();
  wsServer.httpServer().close();

  await db.disconnect();
});

it('signOut successfully', async () => {
  const user = new User({ username: 'tumáš', password: 'jcm2018' });
  await user.save();

  let { requestId, ...response } = await wsClient.sendRequest(
    Actions.signIn('tumáš', 'jcm2018', 'x834t8df')
  );
  const { token } = response.response;
  expect(token).toBeTruthy();

  ({ requestId, ...response } = await wsClient.sendRequest(Actions.signOut(token)));
  expect(response.response).toMatchSnapshot();
});

it('signOut unsuccessful (bogus token)', async () => {
  const { requestId, ...response } = await wsClient.sendRequest(
    Actions.signOut('===bogus token===')
  );
  expect(response).toMatchSnapshot();
});
