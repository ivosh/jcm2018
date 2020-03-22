'use strict';

const { API_TIMESYNC, apiCall } = require('../../../common/common');
const createWsServer = require('../../createWsServer');
const createWsClient = require('../createWsClient');

const port = 5602;
const wsServer = createWsServer({});
const wsClient = createWsClient({ port });

beforeAll(async () => {
  wsServer.listen(port);
  await wsClient.open();
});

afterAll(async () => {
  await wsClient.close();
  await wsServer.close();
});

it('timesync', async () => {
  const { requestId, ...response } = await wsClient.sendRequest(
    apiCall({
      endpoint: API_TIMESYNC,
      request: { clientTime: new Date('2018-12-01T10:38:08.361Z').toJSON() },
    })
  );
  expect(response.response.serverTime).toBeDefined();
  response.response.serverTime = '2018-12-01T10:38:08:364Z';
  expect(response).toMatchSnapshot();
});
