'use strict';

const db = require('../../db');
const Kategorie = require('../Kategorie/Kategorie');
const Ucastnik = require('./Ucastnik');

beforeAll(async () => {
  await db.connect();
});

beforeEach(async () => {
  await db.dropCollection(Kategorie);
  await db.dropCollection(Ucastnik);
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
      pohlavi: 'muž',
      obec: 'Ostrava'
    }
  };

  const ucastnik = new Ucastnik();
  ucastnik.ucasti.push(ucast);
  await ucastnik.save();

  const ucastnici = await Ucastnik.find({}, { _id: 0 });
  expect(ucastnici).toMatchSnapshot();
});

it('přihlaš účastníka', async () => {
  const kategorie = new Kategorie({
    typ: 'maraton',
    pohlavi: 'žena',
    vek: { min: 40, max: 49 },
    maStartCislo: true
  });
  await kategorie.save();

  const ucast = {
    rok: 2017,
    udaje: {
      prijmeni: 'Ženíšková',
      jmeno: 'Šárka',
      narozeni: { den: 7, mesic: 12, rok: 1977 },
      pohlavi: 'žena',
      adresa: 'Za Kohoutem 194/2',
      obec: 'Třebechovice pod Orebem',
      psc: '312 78',
      stat: 'Česká republika',
      klub: 'SK Nudle',
      email: 'sk@nudle.cz',
      telefon: '732 187 987'
    },
    prihlaska: {
      datum: '2017-11-18',
      kategorie: kategorie.id,
      startCislo: 44
    },
    poznamka: 'první přihlášená'
  };

  const ucastnik = new Ucastnik();
  ucastnik.ucasti.push(ucast);
  await ucastnik.save();

  const ucastnici = await Ucastnik.find({}, { _id: 0 }).populate('ucasti.prihlaska.kategorie', {
    _id: 0
  });
  expect(ucastnici).toMatchSnapshot();
});

it('účastník zaplatil ubytování', async () => {
  const ucast = {
    rok: 2016,
    udaje: {
      prijmeni: 'Balabák',
      jmeno: 'Roman',
      narozeni: { rok: 1956 },
      pohlavi: 'muž',
      obec: 'Ostrava'
    }
  };

  const ucastnik = new Ucastnik();
  ucastnik.ucasti.push(ucast);
  await ucastnik.save();

  ucastnik.ucasti[0].ubytovani.push({ den: 'pátek', prihlaseno: true });
  ucastnik.ucasti[0].platby.push({ castka: 50, datum: '2017-11-19', typ: 'hotově' });
  await ucastnik.save();

  const ucastnici = await Ucastnik.find({}, { _id: 0 });
  expect(ucastnici).toMatchSnapshot();
});
