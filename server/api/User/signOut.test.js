'use strict';

const { API_SIGN_IN, API_SIGN_OUT, apiCall } = require('../../../common/common');
const db = require('../../db');
const createWsServer = require('../../createWsServer');
const createWsClient = require('../createWsClient');
const User = require('../../model/User/User');

const port = 5605;
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

it('signOut successfully', async () => {
  const user = new User({ username: 'tumáš', password: 'jcm2018', email: 'tumas@topol.io' });
  await user.save();

  let { requestId, ...response } = await wsClient.sendRequest(
    apiCall({
      endpoint: API_SIGN_IN,
      request: { username: 'tumáš', password: 'jcm2018', nonce: 'x834t8df' },
    })
  );
  const { token } = response.response;
  expect(token).toBeTruthy();

  ({ requestId, ...response } = await wsClient.sendRequest(
    apiCall({ endpoint: API_SIGN_OUT, token })
  ));
  expect(response.response).toMatchSnapshot();
});

it('signOut unsuccessful (bogus token)', async () => {
  const { requestId, ...response } = await wsClient.sendRequest(
    apiCall({ endpoint: API_SIGN_OUT, token: '===bogus token===' })
  );
  expect(response).toMatchSnapshot();
});
