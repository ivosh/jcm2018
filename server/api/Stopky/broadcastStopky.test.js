'use strict';

const db = require('../../db');
const Stopky = require('../../model/Stopky/Stopky');
const broadcastStopky = require('./broadcastStopky');

beforeAll(async () => {
  await db.connect();
  await Stopky.deleteMany();
});

afterAll(async () => {
  await db.disconnect();
});

it('broadcast', async () => {
  const data = await broadcastStopky({
    typ: 'cyklo',
    base: null,
    delta: 'P0D',
    mezicasy: [
      { cas: 'PT5H03M19.32S' },
      { cas: 'PT5H15M24.7S', korekce: 'PT5H12M24.7S' },
      { cas: 'PT5H19M03.5S' },
    ],
    running: false,
  });
  expect(data).toMatchSnapshot();
});
