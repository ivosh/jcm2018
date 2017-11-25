'use strict';

const db = require('../../db');
const Actions = require('../../../common/common');
const createWsServer = require('../../createWsServer');
const createWsClient = require('../createWsClient');
const Kategorie = require('../../model/Kategorie/Kategorie');
const Rocnik = require('../../model/Rocnik/Rocnik');

const port = 5603;
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

const checkAndReplaceId = (obj, newId) => {
  expect(obj.id).toBeTruthy();
  obj.id = newId; // eslint-disable-line no-param-reassign
};

it('findAllRocniky', async () => {
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
  const kategorie3 = new Kategorie({
    typ: 'půlmaraton',
    pohlavi: 'žena',
    vek: { min: 40, max: 49 }
  });
  await kategorie3.save();
  const kategorie4 = new Kategorie({
    typ: 'půlmaraton',
    pohlavi: 'žena',
    vek: { min: 50, max: 59 }
  });
  await kategorie4.save();
  const kategorie5 = new Kategorie({
    typ: 'půlmaraton',
    pohlavi: 'muž',
    vek: { min: 50, max: 59 }
  });
  await kategorie5.save();
  const kategorie6 = new Kategorie({ typ: 'pěší' });
  await kategorie6.save();

  const rocnik1 = new Rocnik({ rok: 2017, datum: '2017-06-10' });
  rocnik1.kategorie.push({
    typ: 'maraton',
    kategorie: [kategorie1.id, kategorie2.id],
    startCisla: '1-100',
    startovne: { predem: 150, naMiste: 200 }
  });
  rocnik1.ubytovani.push({ den: 'pátek', poplatek: 50 });
  rocnik1.ubytovani.push({ den: 'sobota', poplatek: 60 });
  await rocnik1.save();

  const rocnik2 = new Rocnik({ rok: 2018, datum: '2018-06-08' });
  rocnik2.kategorie.push({
    typ: 'maraton',
    kategorie: [kategorie1.id, kategorie2.id],
    startCisla: '5-95',
    startovne: { predem: 200, naMiste: 250 }
  });
  rocnik2.kategorie.push({
    typ: 'půlmaraton',
    kategorie: [kategorie3.id, kategorie4.id, kategorie5.id],
    startCisla: '100-199',
    startovne: { predem: 200, naMiste: 250 }
  });
  rocnik2.kategorie.push({
    typ: 'pěší',
    kategorie: [kategorie6.id],
    startovne: { predem: 25, naMiste: 25 }
  });
  rocnik2.ubytovani.push({ den: 'pátek', poplatek: 60 });
  await rocnik2.save();

  const { requestId, ...response } = await wsClient.sendRequest(Actions.findAllRocniky());
  checkAndReplaceId(response.response[2017], '---r1');
  checkAndReplaceId(response.response[2018], '---r2');

  checkAndReplaceId(response.response[2017].kategorie.maraton['žena'][0], '---k1');
  checkAndReplaceId(response.response[2017].kategorie.maraton['žena'][1], '---k2');
  checkAndReplaceId(response.response[2018].kategorie.maraton['žena'][0], '---k3');
  checkAndReplaceId(response.response[2018].kategorie.maraton['žena'][1], '---k4');
  checkAndReplaceId(response.response[2018].kategorie['půlmaraton']['muž'][0], '---k5');
  checkAndReplaceId(response.response[2018].kategorie['půlmaraton']['žena'][0], '---k6');
  checkAndReplaceId(response.response[2018].kategorie['půlmaraton']['žena'][1], '---k7');
  checkAndReplaceId(response.response[2018].kategorie['pěší'], '---k8');

  expect(response).toMatchSnapshot();

  await Rocnik.remove({});
});
