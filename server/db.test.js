'use strict';

const db = require('./db');

it('connect', async () => {
  await db.connect();
});

it('disconnect', async () => {
  await db.disconnect();
});
