'use strict';

const db = require('../../db');
const Kategorie = require('../Kategorie.js');
const Rocnik = require('./index.js');

beforeAll(async () => {
  await db.dropDatabase();
});

afterAll(async () => {
  await db.disconnect();
});

it('vytvoř ročník s jednou kategorií', async () => {
  const kategorie = new Kategorie({
    typ: 'maraton',
    pohlavi: 'zena',
    minVek: 40,
    maxVek: 49,
    maStartCislo: true
  });
  await kategorie.save();

  const rocnik = new Rocnik({ datum: '2017-06-10' });
  rocnik.kategorie.push({
    typ: 'maraton',
    kategorie: [kategorie.id],
    startCisla: '1-100',
    startovnePredem: 150,
    startvneNaMiste: 200
  });
  await rocnik.save();

  const rocniky = await Rocnik.find({}, { _id: 0 }).populate('kategorie.kategorie', { _id: 0 });
  expect(rocniky).toMatchSnapshot();

  await Rocnik.remove({});
});

it('vytvoř ročník s ubytováním', async () => {
  const kategorie1 = new Kategorie({
    typ: 'maraton',
    pohlavi: 'zena',
    minVek: 40,
    maxVek: 49,
    maStartCislo: true
  });
  await kategorie1.save();
  const kategorie2 = new Kategorie({
    typ: 'maraton',
    pohlavi: 'zena',
    minVek: 50,
    maxVek: 59,
    maStartCislo: true
  });
  await kategorie2.save();

  const rocnik = new Rocnik({ datum: '2017-06-10' });
  rocnik.kategorie.push({
    typ: 'maraton',
    kategorie: [kategorie1.id, kategorie2.id],
    startCisla: '1-100',
    startovnePredem: 150,
    startvneNaMiste: 200
  });
  rocnik.ubytovani.push({ den: 'pátek', poplatek: 50 });
  rocnik.ubytovani.push({ den: 'sobota', poplatek: 60 });
  await rocnik.save();

  const rocniky = await Rocnik.find({}, { _id: 0 }).populate('kategorie.kategorie', { _id: 0 });
  expect(rocniky).toMatchSnapshot();

  await Rocnik.remove({});
});
