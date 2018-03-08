'use strict';

const db = require('../../db');
const Kategorie = require('../../model/Kategorie/Kategorie');
const Ucastnik = require('../../model/Ucastnik/Ucastnik');
const broadcastUcastnik = require('./broadcastUcastnik');

beforeAll(async () => {
  await db.connect();
  await Promise.all([Kategorie.remove(), Ucastnik.remove()]);

  const kategorie1 = new Kategorie({ typ: 'maraton', pohlavi: 'žena', vek: { min: 18, max: 60 } });
  const kategorie2 = new Kategorie({ typ: 'maraton', pohlavi: 'muž', vek: { min: 18, max: 60 } });
  await Promise.all([kategorie1.save(), kategorie2.save()]);

  const ucasti = [
    {
      rok: 2017,
      udaje: {
        prijmeni: 'Balabák',
        jmeno: 'Roman',
        narozeni: { rok: 1956 },
        pohlavi: 'muž',
        obec: 'Ostrava 1'
      },
      vykon: {
        kategorie: kategorie2.id,
        startCislo: 34,
        dokonceno: true,
        cas: 'PT1H25M32.6S'
      }
    },
    {
      rok: 2018,
      udaje: {
        prijmeni: 'Balabák',
        jmeno: 'Roman',
        narozeni: { rok: 1956 },
        pohlavi: 'muž',
        obec: 'Ostrava 2'
      },
      vykon: { kategorie: kategorie2.id, startCislo: 15, dokonceno: false }
    }
  ];

  const ucastnik = new Ucastnik({ ucasti });
  await ucastnik.save();
});

afterAll(async () => {
  await db.disconnect();
});

it('broadcast', async () => {
  const { id } = await Ucastnik.findOne({});

  const data = await broadcastUcastnik(id);
  data.data.id = '===id===';
  data.data[2017].vykon.kategorie = '===k1===';
  data.data[2018].vykon.kategorie = '===k2===';
  expect(data).toMatchSnapshot();
});
