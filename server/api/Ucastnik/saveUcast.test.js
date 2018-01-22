'use strict';

const db = require('../../db');
const Actions = require('../../../common/common');
const createWsServer = require('../../createWsServer');
const createWsClient = require('./../createWsClient');
const Kategorie = require('../../model/Kategorie/Kategorie');
const Rocnik = require('../../model/Rocnik/Rocnik');
const Ucastnik = require('../../model/Ucastnik/Ucastnik');
const generateTestToken = require('../generateTestToken');

const port = 5601;
const wsServer = createWsServer({});
const wsClient = createWsClient({ port });

beforeAll(async () => {
  wsServer.httpServer().listen(port);
  await wsClient.open();

  await db.dropDatabase();

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

  const rocnik1 = new Rocnik({ rok: 2015, datum: '2015-06-01' });
  rocnik1.kategorie.push({
    typ: 'maraton',
    kategorie: [kategorie1.id, kategorie2.id],
    startCisla: { rozsahy: ['1-100'] },
    startovne: { predem: 150, naMiste: 200 }
  });
  rocnik1.ubytovani.push({ den: 'pátek', poplatek: 50 });
  rocnik1.ubytovani.push({ den: 'sobota', poplatek: 60 });
  await rocnik1.save();

  const rocnik2 = new Rocnik({ rok: 2016, datum: '2016-06-01' });
  rocnik2.kategorie.push({
    typ: 'maraton',
    kategorie: [kategorie1.id, kategorie2.id],
    startCisla: { rozsahy: ['1-100'] },
    startovne: { predem: 150, naMiste: 200 }
  });
  rocnik2.ubytovani.push({ den: 'pátek', poplatek: 50 });
  rocnik2.ubytovani.push({ den: 'sobota', poplatek: 60 });
  await rocnik2.save();

  const rocnik3 = new Rocnik({ rok: 2017, datum: '2017-06-10' });
  rocnik3.kategorie.push({
    typ: 'maraton',
    kategorie: [kategorie1.id, kategorie2.id],
    startCisla: { rozsahy: ['1-100'] },
    startovne: { predem: 150, naMiste: 200 }
  });
  rocnik3.ubytovani.push({ den: 'pátek', poplatek: 50 });
  rocnik3.ubytovani.push({ den: 'sobota', poplatek: 60 });
  await rocnik3.save();

  const rocnik4 = new Rocnik({ rok: 2018, datum: '2018-06-08' });
  rocnik4.kategorie.push({
    typ: 'maraton',
    kategorie: [kategorie1.id, kategorie2.id],
    startCisla: { rozsahy: ['5-95'] },
    startovne: { predem: 200, naMiste: 250 }
  });
  rocnik4.kategorie.push({
    typ: 'půlmaraton',
    kategorie: [kategorie3.id, kategorie4.id, kategorie5.id],
    startCisla: { rozsahy: ['100-199'] },
    startovne: { predem: 200, naMiste: 250 }
  });
  rocnik4.kategorie.push({
    typ: 'pěší',
    kategorie: [kategorie6.id],
    startovne: { predem: 25, naMiste: 25 }
  });
  rocnik4.ubytovani.push({ den: 'pátek', poplatek: 60 });
  await rocnik4.save();
});

afterAll(async () => {
  await Kategorie.collection.drop();
  await Rocnik.collection.drop();

  await wsClient.close();
  wsServer.httpServer().close();

  await db.disconnect();
});

it('vytvoř minimálního účastníka', async () => {
  const udaje = {
    prijmeni: 'Balabák',
    jmeno: 'František',
    narozeni: { rok: 1953 },
    pohlavi: 'muž',
    obec: 'Ostrava 1'
  };
  const prihlaska = {
    datum: new Date('2018-02-07Z'),
    typKategorie: 'půlmaraton',
    kod: '===kod==='
  };

  const { requestId, ...response } = await wsClient.sendRequest(
    Actions.saveUcast({ rok: 2018, udaje, prihlaska }, generateTestToken())
  );
  expect(response.response.id).not.toBeNull();
  response.response.id = '---';
  expect(response).toMatchSnapshot();

  const ucastnici = await Ucastnik.find({}, { _id: 0 })
    .populate('ucasti.prihlaska.kategorie')
    .lean();
  ucastnici[0].ucasti[0].prihlaska.kategorie._id = '===k1===';
  expect(ucastnici).toMatchSnapshot();

  await Ucastnik.collection.drop();
});

it('vytvoř dvě účasti', async () => {
  const udaje1 = {
    prijmeni: 'Sukdoláková',
    jmeno: 'Božena',
    narozeni: { rok: 1967 },
    pohlavi: 'žena',
    obec: 'Kladno Rozdělov',
    psc: '327 41'
  };
  const udaje2 = { ...udaje1, obec: 'Kamenický Přívoz' };
  const prihlaska1 = {
    datum: new Date('2017-05-03Z'),
    typKategorie: 'maraton',
    kod: '===kod1==='
  };
  const prihlaska2 = {
    datum: new Date('2018-02-07Z'),
    typKategorie: 'půlmaraton',
    kod: '===kod2==='
  };

  const response1 = await wsClient.sendRequest(
    Actions.saveUcast({ rok: 2017, udaje: udaje1, prihlaska: prihlaska1 }, generateTestToken())
  );

  const ucastnikId = response1.response.id;
  const { requestId, ...response2 } = await wsClient.sendRequest(
    Actions.saveUcast(
      { id: ucastnikId, rok: 2018, udaje: udaje2, prihlaska: prihlaska2 },
      generateTestToken()
    )
  );
  expect(response2).toMatchSnapshot();

  const ucastnici = await Ucastnik.find({}, { _id: 0 })
    .populate('ucasti.prihlaska.kategorie')
    .lean();
  ucastnici[0].ucasti[0].prihlaska.kategorie._id = '===k1===';
  ucastnici[0].ucasti[1].prihlaska.kategorie._id = '===k2===';
  expect(ucastnici).toMatchSnapshot();

  await Ucastnik.collection.drop();
});

it('přepiš existující účast', async () => {
  const udaje1 = {
    prijmeni: 'Sukdoláková',
    jmeno: 'Božena',
    narozeni: { rok: 1967 },
    pohlavi: 'žena',
    obec: 'Kladno 1',
    psc: '327 41'
  };
  const udaje2 = { ...udaje1, obec: 'Kladno 2' };
  const udaje3 = { ...udaje1, obec: 'Kladno 3' };
  const udaje4 = { ...udaje1, obec: 'Kladno 4' };
  const udaje5 = { ...udaje1, obec: 'Kladno 5' };
  const prihlaska = { datum: new Date('2017-05-03Z'), typKategorie: 'maraton' };

  const response1 = await wsClient.sendRequest(
    Actions.saveUcast({ rok: 2018, udaje: udaje1, prihlaska }, generateTestToken())
  );
  const ucastnikId = response1.response.id;

  await wsClient.sendRequest(
    Actions.saveUcast({ id: ucastnikId, rok: 2017, udaje: udaje2, prihlaska }, generateTestToken())
  );
  await wsClient.sendRequest(
    Actions.saveUcast({ id: ucastnikId, rok: 2016, udaje: udaje3, prihlaska }, generateTestToken())
  );
  await wsClient.sendRequest(
    Actions.saveUcast({ id: ucastnikId, rok: 2015, udaje: udaje4, prihlaska }, generateTestToken())
  );

  const { requestId, ...response5 } = await wsClient.sendRequest(
    Actions.saveUcast({ id: ucastnikId, rok: 2017, udaje: udaje5, prihlaska }, generateTestToken())
  );
  expect(response5).toMatchSnapshot();

  const ucastnici = await Ucastnik.find({}, { _id: 0 })
    .populate('ucasti.prihlaska.kategorie')
    .lean();
  ucastnici[0].ucasti[0].prihlaska.kategorie._id = '===k1===';
  ucastnici[0].ucasti[1].prihlaska.kategorie._id = '===k2===';
  ucastnici[0].ucasti[2].prihlaska.kategorie._id = '===k3===';
  ucastnici[0].ucasti[3].prihlaska.kategorie._id = '===k4===';
  expect(ucastnici).toMatchSnapshot();

  await Ucastnik.collection.drop();
});

it('saveUcast [not authenticated]', async () => {
  const { requestId, ...response } = await wsClient.sendRequest(Actions.saveUcast({}, null));
  expect(response).toMatchSnapshot();
});
