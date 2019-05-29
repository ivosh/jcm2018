'use strict';

const { API_SEND_EMAIL, apiCall } = require('../../../common/common');
const createWsServer = require('../../createWsServer');
const createWsClient = require('./../createWsClient');
const generateTestToken = require('../generateTestToken');

const port = 5613;
const wsServer = createWsServer({});
const wsClient = createWsClient({ port });
const token = generateTestToken();

beforeAll(async () => {
  wsServer.listen(port);
  await wsClient.open();
});

afterAll(async () => {
  await wsClient.close();
  await wsServer.close();
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
});

it('not authenticated', async () => {
  const { requestId, ...response } = await wsClient.sendRequest(
    apiCall({ endpoint: API_SEND_EMAIL })
  );
  expect(response).toMatchSnapshot();
});
