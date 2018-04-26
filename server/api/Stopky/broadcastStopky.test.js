'use strict';

const db = require('../../db');
const Stopky = require('../../model/Stopky/Stopky');
const broadcastStopky = require('./broadcastStopky');

beforeAll(async () => {
  await db.connect();
  await Stopky.remove();
});

afterAll(async () => {
  await db.disconnect();
});

it('broadcast', async () => {
  const data = await broadcastStopky({ typ: 'cyklo', base: null, delta: 'P0D', running: false });
  expect(data).toMatchSnapshot();
});
