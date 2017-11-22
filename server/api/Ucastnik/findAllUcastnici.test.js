'use strict';

const db = require('../../db');
const Actions = require('../../../common/common');
const createWsServer = require('../../createWsServer');
const createWsClient = require('../createWsClient');
const Ucastnik = require('../../model/Ucastnik/Ucastnik');

const port = 5602;
const wsServer = createWsServer({});
const wsClient = createWsClient({ port });

beforeAll(async () => {
  wsServer.httpServer().listen(port);
  await wsClient.open();

  await db.dropDatabase();
});

afterAll(async () => {
  await wsClient.close();
  wsServer.httpServer().close();

  await db.disconnect();
});

it('findAllUcastnici', async () => {
  const ucasti1 = [
    {
      rok: 2017,
      udaje: {
        prijmeni: 'Balabák',
        jmeno: 'Roman',
        narozeni: { rok: 1956 },
        pohlavi: 'muž',
        obec: 'Ostrava 1'
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
      }
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
      }
    },
    {
      rok: 2017,
      udaje: {
        prijmeni: 'Primasová',
        jmeno: 'Zdeňka',
        narozeni: { den: 7, mesic: 12, rok: 1966 },
        pohlavi: 'žena',
        obec: 'Kladno'
      }
    }
  ];

  const ucastnik2 = new Ucastnik({ ucasti: ucasti2 });
  await ucastnik2.save();

  const { code, status, requestId, response, ...theRest } = await wsClient.sendRequest(
    Actions.findAllUcastnici()
  );
  expect(theRest).toEqual({});
  const ids = Object.keys(response);
  expect(ids.length).toEqual(2);

  expect({
    code,
    status,
    response: { id1: response[ids[0]], id2: response[ids[1]] }
  }).toMatchSnapshot();
});
