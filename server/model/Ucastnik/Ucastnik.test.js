'use strict';

const mongoose = require('mongoose');
const config = require('../../config/config');
const Ucastnik = require('./Ucastnik');

/* Use native ES6 promises. */
mongoose.Promise = global.Promise;

beforeAll(async () => {
  const connection = await mongoose.connect(config.db_uri, { useMongoClient: true });
  await connection.db.dropDatabase();
});

afterAll(async () => {
  await mongoose.disconnect();
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
