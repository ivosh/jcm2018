'use strict';

const db = require('../../db');
const Kategorie = require('../Kategorie/Kategorie');
const Rocnik = require('./Rocnik');

beforeAll(async () => {
  await db.connect();
});

beforeEach(async () => {
  await Promise.all([Kategorie.deleteMany(), Rocnik.deleteMany()]);
});

afterAll(async () => {
  await db.disconnect();
});

it('vytvoř ročník s jednou kategorií', async () => {
  const kategorie = new Kategorie({
    typ: 'maraton',
    pohlavi: 'žena',
    vek: { min: 40, max: 49 }
  });
  await kategorie.save();

  const rocnik = new Rocnik({ rok: 2017, datum: '2017-06-10' });
  rocnik.kategorie.push({
    typ: 'maraton',
    kategorie: [kategorie.id],
    startCisla: { rozsahy: ['1-100'] },
    startovne: { predem: 150, naMiste: 200 }
  });
  await rocnik.save();

  const rocniky = await Rocnik.find({}, { _id: 0 }).populate('kategorie.kategorie', { _id: 0 });
  expect(rocniky).toMatchSnapshot();
});

it('vytvoř ročník s ubytováním', async () => {
  const kategorie1 = new Kategorie({
    typ: 'maraton',
    pohlavi: 'žena',
    vek: { min: 40, max: 49 }
  });
  await kategorie1.save();
  const kategorie2 = new Kategorie({
    typ: 'maraton',
    pohlavi: 'žena',
    vek: { min: 50, max: 59 }
  });
  await kategorie2.save();

  const rocnik = new Rocnik({ rok: 2017, datum: '2017-06-10' });
  rocnik.kategorie.push({
    typ: 'maraton',
    kategorie: [kategorie1.id, kategorie2.id],
    startCisla: { rozsahy: ['1-100'] },
    startovne: { predem: 150, naMiste: 200 }
  });
  rocnik.ubytovani.pátek = { poplatek: 50 };
  rocnik.ubytovani.sobota = { poplatek: 60 };
  await rocnik.save();

  const rocniky = await Rocnik.find({}, { _id: 0 }).populate('kategorie.kategorie', { _id: 0 });
  expect(rocniky).toMatchSnapshot();
});
