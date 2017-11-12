'use strict';

const db = require('../../db');
const Ucastnik = require('./index.js');

beforeAll(async () => {
  await db.dropDatabase();
});

afterAll(async () => {
  await db.disconnect();
});

it('env is test', () => {
  expect(process.env.NODE_ENV).toEqual('test');
});

it('vytvoř účastníka s minimální účastí', async () => {
  const ucast = {
    rok: 2017,
    udaje: {
      prijmeni: 'Balabák',
      jmeno: 'Roman',
      narozeni: { rok: 1956 },
      pohlavi: 'muz',
      obec: 'Ostrava'
    }
  };

  const ucastnik = new Ucastnik();
  ucastnik.ucasti.push(ucast);
  await ucastnik.save();

  const ucastnici = await Ucastnik.find({}, { _id: 0 });
  expect(ucastnici).toMatchSnapshot();
});
