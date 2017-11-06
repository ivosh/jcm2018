'use strict';

const mongoose = require('mongoose');
const config = require('../../config/config');
const Ucast = require('./Ucast');

/* Use native ES6 promises. */
mongoose.Promise = global.Promise;

beforeAll(async () => {
  let connection = await mongoose.connect(config.db_uri, { useMongoClient: true });
  await connection.db.dropDatabase();
});

afterAll(async () => {
  await mongoose.disconnect();
});

it('env is test', () => {
  expect(process.env.NODE_ENV).toEqual('test');
});

it('vytvoř minimální účast', async () => {
  let ucast = new Ucast({
    ucastnikId: 1,
    rok: 2017,
    udaje: {
      prijmeni: 'Balabák',
      jmeno: 'Roman',
      narozeni: { rok: 1956 },
      pohlavi: 'muz',
      obec: 'Ostrava'
    }
  });
  await ucast.save();

  const ucasti = await Ucast.find({}, {'_id': 0});
  expect(ucasti).toMatchSnapshot();
});
