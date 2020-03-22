'use strict';

const db = require('../db');
const createWsServer = require('../createWsServer');
const createWsClient = require('./createWsClient');

const port = 5600;
const wsServer = createWsServer({});
const wsClient = createWsClient({ port });

beforeAll(async () => {
  wsServer.listen(port);
  await wsClient.open();
  await db.connect();
});

afterAll(async () => {
  await wsClient.close();
  await wsServer.close();
  await db.disconnect();
});

afterEach(() => {
  wsClient.onMessage.removeAllListeners();
});

it('basic connectivity', async () => {
  const { requestId, ...response } = await wsClient.sendRequest({});
  expect(response).toMatchSnapshot();
});

it('unparsable message', async (done) => {
  wsClient.onMessage.addListener((message) => {
    const parsed = JSON.parse(message);
    expect(parsed).toMatchSnapshot();
    done();
  });

  await wsClient.send('--');
});

it('unknown action', async (done) => {
  wsClient.onMessage.addListener((message) => {
    const parsed = JSON.parse(message);
    expect(parsed).toMatchSnapshot();
    done();
  });

  await wsClient.send('{ "action": "unknown" }');
});

/* Keep last - it havocs wsClient's state. */
it('binary data', async () => {
  const data = new Uint8Array(1);
  data[0] = 1;
  await wsClient.send(data);
});
