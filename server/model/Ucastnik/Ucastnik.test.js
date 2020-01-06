'use strict';

const db = require('../../db');
const Kategorie = require('../Kategorie/Kategorie');
const Ucastnik = require('./Ucastnik');

beforeAll(async () => {
  await db.connect();
});

beforeEach(async () => {
  await Promise.all([Kategorie.deleteMany(), Ucastnik.deleteMany()]);
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
      obec: 'Třebechovice pod Orebem',
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
    poznamky: [{ datum: '2017-11-19', text: 'první přihlášená' }]
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

  ucastnik.ucasti[0].ubytovani.pátek = { prihlaseno: true };
  ucastnik.ucasti[0].platby.push({ castka: 50, datum: '2017-11-19', typ: 'hotově' });
  await ucastnik.save();

  const ucastnici = await Ucastnik.find({}, { _id: 0 });
  expect(ucastnici).toMatchSnapshot();
});

it('getLatestEmail() - žádné účasti', async () => {
  const ucastnik = new Ucastnik();
  await ucastnik.save();

  const result = ucastnik.getLatestEmail();
  expect(result.id).toBeTruthy();
  expect(result.email).toBeUndefined();
  result.id = '===id===';
  expect(result).toMatchSnapshot();
});

it('getLatestEmail() - poslední rok má email', async () => {
  const ucastnik = new Ucastnik();
  ucastnik.ucasti.push({
    rok: 2016,
    udaje: {
      prijmeni: 'Balabák',
      jmeno: 'Roman',
      narozeni: { rok: 1956 },
      pohlavi: 'muž',
      obec: 'Ostrava',
      email: 'stary@email.sk'
    }
  });
  ucastnik.ucasti.push({
    rok: 2018,
    udaje: {
      prijmeni: 'Balabák',
      jmeno: 'Roman',
      narozeni: { rok: 1956 },
      pohlavi: 'muž',
      obec: 'Ostrava',
      email: 'novy@email.sk'
    }
  });
  await ucastnik.save();

  const result = ucastnik.getLatestEmail();
  expect(result.id).toBeTruthy();
  expect(result.email).toBeTruthy();
  expect(result.rok).toBe(2018);
  result.id = '===id===';
  expect(result).toMatchSnapshot();
});

it('getLatestEmail() - vyřazen z distribuce', async () => {
  const ucastnik = new Ucastnik();
  ucastnik.ucasti.push({
    rok: 2018,
    udaje: {
      prijmeni: 'Balabák',
      jmeno: 'Roman',
      narozeni: { rok: 1956 },
      pohlavi: 'muž',
      obec: 'Ostrava',
      email: 'balabak@email.sk'
    }
  });
  ucastnik.profil = { vyraditZDistribuce: true };
  await ucastnik.save();

  const result = ucastnik.getLatestEmail();
  expect(result.id).toBeTruthy();
  expect(result.email).toBeUndefined();
  result.id = '===id===';
  expect(result).toMatchSnapshot();
});

it('getLatestEmail() - email má jen nějaký předešlý rok, ne poslední', async () => {
  const ucastnik = new Ucastnik();
  ucastnik.ucasti.push({
    rok: 2016,
    udaje: {
      prijmeni: 'Balabák',
      jmeno: 'Roman',
      narozeni: { rok: 1956 },
      pohlavi: 'muž',
      obec: 'Ostrava',
      email: 'stary@email.sk'
    }
  });
  ucastnik.ucasti.push({
    rok: 2017,
    udaje: {
      prijmeni: 'Balabák',
      jmeno: 'Roman',
      narozeni: { rok: 1956 },
      pohlavi: 'muž',
      obec: 'Ostrava',
      email: 'nejaky@email.sk'
    }
  });
  ucastnik.ucasti.push({
    rok: 2018,
    udaje: {
      prijmeni: 'Balabák',
      jmeno: 'Roman',
      narozeni: { rok: 1956 },
      pohlavi: 'muž',
      obec: 'Ostrava'
    }
  });
  await ucastnik.save();

  const result = ucastnik.getLatestEmail();
  expect(result.id).toBeTruthy();
  expect(result.email).toBeTruthy();
  expect(result.rok).toBe(2017);
  result.id = '===id===';
  expect(result).toMatchSnapshot();
});

it('getEmailsForDistribution', async () => {
  const ucastnik1 = new Ucastnik();
  ucastnik1.ucasti.push({
    rok: 2016,
    udaje: {
      prijmeni: 'Balabák',
      jmeno: 'Roman',
      narozeni: { rok: 1956 },
      pohlavi: 'muž',
      obec: 'Ostrava',
      email: 'stary@email.sk'
    }
  });
  await ucastnik1.save();

  const ucastnik2 = new Ucastnik();
  ucastnik2.ucasti.push({
    rok: 2018,
    udaje: {
      prijmeni: 'Sukdoláková',
      jmeno: 'Hana',
      narozeni: { rok: 1984 },
      pohlavi: 'žena',
      obec: 'Baběcí',
      email: 'hana@sukdul.sk'
    }
  });
  await ucastnik2.save();

  const ucastnik3 = new Ucastnik();
  ucastnik3.ucasti.push({
    rok: 2017,
    udaje: {
      prijmeni: 'Zralá',
      jmeno: 'Božena',
      narozeni: { rok: 2005 },
      pohlavi: 'žena',
      obec: 'Sluky',
      email: 'zrala@boh.sk'
    }
  });
  ucastnik3.profil = { vyraditZDistribuce: true };
  await ucastnik3.save();

  const ucastnik4 = new Ucastnik();
  ucastnik4.ucasti.push({
    rok: 2019,
    udaje: {
      prijmeni: 'Zapadlo',
      jmeno: 'Milan',
      narozeni: { rok: 1965 },
      pohlavi: 'muž',
      obec: 'Dudkinc',
      email: 'dudek@dudu.sk'
    }
  });
  await ucastnik4.save();

  const result = await Ucastnik.getEmailsForDistribution(2019);
  expect(result).toHaveLength(2);
  result[0].id = '===id1===';
  result[1].id = '===id2===';
  expect(result).toMatchSnapshot();
});
