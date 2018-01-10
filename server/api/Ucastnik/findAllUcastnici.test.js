'use strict';

const db = require('../../db');
const Actions = require('../../../common/common');
const createWsServer = require('../../createWsServer');
const createWsClient = require('../createWsClient');
const Kategorie = require('../../model/Kategorie/Kategorie');
const Ucastnik = require('../../model/Ucastnik/Ucastnik');
const generateTestToken = require('../generateTestToken');

const port = 5602;
const wsServer = createWsServer({});
const wsClient = createWsClient({ port });

beforeAll(async () => {
  wsServer.httpServer().listen(port);
  await wsClient.open();

  await db.dropDatabase();

  const kategorie1 = new Kategorie({ typ: 'maraton', pohlavi: 'žena', vek: { min: 18, max: 60 } });
  const kategorie2 = new Kategorie({ typ: 'maraton', pohlavi: 'muž', vek: { min: 18, max: 60 } });
  await Promise.all([kategorie1.save(), kategorie2.save()]);
});

afterAll(async () => {
  await wsClient.close();
  wsServer.httpServer().close();

  await db.disconnect();
});

it('findAllUcastnici', async () => {
  const kategorieZena = await Kategorie.find({ pohlavi: 'žena' });
  expect(kategorieZena).toHaveLength(1);
  const kategorieMuz = await Kategorie.find({ pohlavi: 'muž' });
  expect(kategorieMuz).toHaveLength(1);

  const ucasti1 = [
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
        kategorie: kategorieZena[0].id,
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
      vykon: { kategorie: kategorieZena[0].id, startCislo: 15, dokonceno: false }
    }
  ];

  const ucastnik1 = new Ucastnik({ ucasti: ucasti1 });
  await ucastnik1.save();

  const ucasti2 = [
    {
      rok: 2016,
      udaje: {
        prijmeni: 'Sukdoláková',
        jmeno: 'Zdeňka',
        narozeni: { den: 7, mesic: 12, rok: 1966 },
        pohlavi: 'žena',
        obec: 'Kladno'
      },
      vykon: { kategorie: kategorieMuz[0].id, startCislo: 11, dokonceno: true, cas: 'PT3H42M32.6S' }
    },
    {
      rok: 2017,
      udaje: {
        prijmeni: 'Primasová',
        jmeno: 'Zdeňka',
        narozeni: { den: 7, mesic: 12, rok: 1966 },
        pohlavi: 'žena',
        obec: 'Kladno'
      },
      vykon: { kategorie: kategorieMuz[0].id, startCislo: 7, dokonceno: true, cas: 'PT2H8M23.7S' }
    }
  ];

  const ucastnik2 = new Ucastnik({ ucasti: ucasti2 });
  await ucastnik2.save();

  const { code, status, requestId, response, ...theRest } = await wsClient.sendRequest(
    Actions.findAllUcastnici(generateTestToken())
  );
  expect(theRest).toEqual({});
  const ids = Object.keys(response);
  expect(ids.length).toEqual(2);

  response[ids[0]][2017].vykon.kategorie = 'k1';
  response[ids[0]][2018].vykon.kategorie = 'k1';
  response[ids[1]][2016].vykon.kategorie = 'k2';
  response[ids[1]][2017].vykon.kategorie = 'k2';

  expect({
    code,
    status,
    response: { id1: response[ids[0]], id2: response[ids[1]] }
  }).toMatchSnapshot();

  await Ucastnik.collection.drop();
});

it('findAllUcastnici [not authenticated]', async () => {
  const { requestId, ...response } = await wsClient.sendRequest(Actions.findAllUcastnici(null));
  expect(response).toMatchSnapshot();
});
