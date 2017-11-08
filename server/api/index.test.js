'use strict';

const createWsServer = require('../ws_server');
const createWsClient = require('./ws_client');

const port = 5600;
const wsServer = createWsServer({});
const wsClient = createWsClient({ port });

beforeAll(async () => {
  wsServer.httpServer().listen(port);
  await wsClient.open();
});

afterAll(async () => {
  await wsClient.close();
  wsServer.httpServer().close();
});

afterEach(() => {
  wsClient.onMessage.removeAllListeners();
});

it('basic connectivity', async () => {
  const { requestId, ...response } = await wsClient.sendRequest({});
  expect(response).toMatchSnapshot();
});

it('unparsable message', async done => {
  wsClient.onMessage.addListener(message => {
    const parsed = JSON.parse(message);
    expect(parsed).toMatchSnapshot();
    done();
  });

  await wsClient.send('--');
});
