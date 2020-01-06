'use strict';

const db = require('../../../db');
const { API_SAVE_UCAST, apiCall } = require('../../../../common/common');
const createWsServer = require('../../../createWsServer');
const createWsClient = require('../../createWsClient');
const Kategorie = require('../../../model/Kategorie/Kategorie');
const Rocnik = require('../../../model/Rocnik/Rocnik');
const Ucastnik = require('../../../model/Ucastnik/Ucastnik');
const generateTestToken = require('../../generateTestToken');

const port = 5601;
const wsServer = createWsServer({});
const wsClient = createWsClient({ port });
const token = generateTestToken();

let kategorie1;
let kategorie2;
let kategorie4;
let kategorie5;
let kategorie6;
beforeAll(async () => {
  wsServer.listen(port);
  await wsClient.open();

  await db.connect();
  await Promise.all([Kategorie.deleteMany(), Rocnik.deleteMany()]);

  kategorie1 = new Kategorie({
    typ: 'maraton',
    pohlavi: 'žena',
    vek: { min: 40, max: 49 }
  });
  await kategorie1.save();
  kategorie2 = new Kategorie({
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
  kategorie4 = new Kategorie({
    typ: 'půlmaraton',
    pohlavi: 'žena',
    vek: { min: 50, max: 59 }
  });
  await kategorie4.save();
  kategorie5 = new Kategorie({
    typ: 'půlmaraton',
    pohlavi: 'muž',
    vek: { min: 50, max: 59 }
  });
  await kategorie5.save();
  kategorie6 = new Kategorie({ typ: 'pěší' });
  await kategorie6.save();

  const rocnik1 = new Rocnik({ rok: 2015, datum: '2015-06-01' });
  rocnik1.kategorie.push({
    typ: 'maraton',
    kategorie: [kategorie1.id, kategorie2.id],
    startCisla: { rozsahy: ['1-100'] },
    startovne: { predem: 150, naMiste: 200 }
  });
  rocnik1.ubytovani.pátek = { poplatek: 50 };
  rocnik1.ubytovani.sobota = { poplatek: 60 };
  await rocnik1.save();

  const rocnik2 = new Rocnik({ rok: 2016, datum: '2016-06-01' });
  rocnik2.kategorie.push({
    typ: 'maraton',
    kategorie: [kategorie1.id, kategorie2.id],
    startCisla: { rozsahy: ['1-100'] },
    startovne: { predem: 150, naMiste: 200 }
  });
  rocnik2.ubytovani.pátek = { poplatek: 50 };
  rocnik2.ubytovani.sobota = { poplatek: 60 };
  await rocnik2.save();

  const rocnik3 = new Rocnik({ rok: 2017, datum: '2017-06-10' });
  rocnik3.kategorie.push({
    typ: 'maraton',
    kategorie: [kategorie1.id, kategorie2.id],
    startCisla: { rozsahy: ['1-100'] },
    startovne: { predem: 150, naMiste: 200 }
  });
  rocnik3.kategorie.push({
    typ: 'půlmaraton',
    kategorie: [kategorie3.id, kategorie4.id, kategorie5.id],
    startCisla: { rozsahy: ['1-100'] },
    startovne: { predem: 150, naMiste: 200 }
  });
  rocnik3.ubytovani.pátek = { poplatek: 50 };
  rocnik3.ubytovani.sobota = { poplatek: 60 };
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
  rocnik4.ubytovani.pátek = { poplatek: 60 };
  await rocnik4.save();
});

beforeEach(async () => {
  await Ucastnik.deleteMany();
});

afterAll(async () => {
  await wsClient.close();
  await wsServer.close();
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
    kategorie: kategorie5.id, // půlmaraton
    kod: '===kod===',
    startovnePoSleve: 0
  };
  const platby = [{ datum: '2018-06-01T00:00:00.000Z', castka: 200, typ: 'převodem' }];

  const { requestId, ...response } = await wsClient.sendRequest(
    apiCall({ endpoint: API_SAVE_UCAST, request: { rok: 2018, udaje, prihlaska, platby }, token })
  );
  const { id } = response.response;
  expect(id).toBeTruthy();
  response.response.id = '===id===';
  expect(response).toMatchSnapshot();

  const ucastnici = await Ucastnik.find({}, { _id: 0 })
    .populate('ucasti.prihlaska.kategorie')
    .lean();
  ucastnici[0].ucasti[0].prihlaska.kategorie._id = '===k1===';
  expect(ucastnici).toMatchSnapshot();
});

const setup = async () => {
  const ucastnik1 = new Ucastnik();
  ucastnik1.ucasti.push({
    rok: 2018,
    udaje: {
      prijmeni: 'Sukdoláková',
      jmeno: 'Božena',
      narozeni: { rok: 1967 },
      pohlavi: 'žena',
      obec: 'Kladno Rozdělov'
    },
    prihlaska: {
      datum: new Date('2018-05-03Z'),
      kategorie: kategorie4.id, // půlmaraton
      startCislo: 7,
      kod: '===kod1==='
    }
  });
  await ucastnik1.save();

  const ucastnik3 = new Ucastnik();
  ucastnik3.ucasti.push({
    rok: 2018,
    udaje: {
      prijmeni: 'Moulová',
      jmeno: 'Milena',
      narozeni: { den: 6, mesic: 5, rok: 1973 },
      pohlavi: 'žena',
      obec: 'Nusle'
    },
    prihlaska: {
      datum: new Date('2018-02-07Z'),
      kategorie: kategorie1.id, // maraton
      startCislo: 8,
      kod: '===kod3==='
    }
  });
  await ucastnik3.save();
};

it('ulož startovní číslo - duplicitní v kategorii', async () => {
  await setup();

  const udaje = {
    prijmeni: 'Balabák',
    jmeno: 'František',
    narozeni: { rok: 1953 },
    pohlavi: 'muž',
    obec: 'Ostrava 1'
  };
  const prihlaska = {
    datum: new Date('2018-02-07Z'),
    kategorie: kategorie5.id, // půlmaraton
    startCislo: 7,
    kod: '===kod2==='
  };

  const { requestId, ...response } = await wsClient.sendRequest(
    apiCall({ endpoint: API_SAVE_UCAST, request: { rok: 2018, udaje, prihlaska }, token })
  );
  expect(response.code).not.toEqual('ok'); // nesmí projít
  expect(response).toMatchSnapshot();

  const ucastnici = await Ucastnik.find({}, { _id: 0 })
    .populate('ucasti.prihlaska.kategorie')
    .lean();
  ucastnici[0].ucasti[0].prihlaska.kategorie._id = '===k1===';
  ucastnici[1].ucasti[0].prihlaska.kategorie._id = '===k2===';
  expect(ucastnici).toMatchSnapshot();
});

it('kategorie neexistuje', async () => {
  const udaje = {
    prijmeni: 'Balabák',
    jmeno: 'František',
    narozeni: { rok: 1953 },
    pohlavi: 'muž',
    obec: 'Ostrava 1'
  };
  const prihlaska = {
    datum: new Date('2018-02-07Z'),
    kategorie: '===neexistující===',
    startCislo: 34
  };

  const { requestId, ...response } = await wsClient.sendRequest(
    apiCall({ endpoint: API_SAVE_UCAST, request: { rok: 2018, udaje, prihlaska }, token })
  );
  expect(response).toMatchSnapshot();
});

it('chybná kategorie (věk)', async () => {
  const udaje = {
    prijmeni: 'Sukdoláková',
    jmeno: 'Božena',
    narozeni: { rok: 1967 },
    pohlavi: 'žena',
    obec: 'Kladno 1'
  };
  const prihlaska = {
    datum: new Date('2015-02-07Z'),
    kategorie: kategorie2.id,
    startCislo: 34
  };

  const { requestId, ...response } = await wsClient.sendRequest(
    apiCall({ endpoint: API_SAVE_UCAST, request: { rok: 2015, udaje, prihlaska }, token })
  );
  response.status = response.status.replace(/[a-f\d]{24}/g, '==id==');
  expect(response).toMatchSnapshot();
});

it('účastník neexistuje', async () => {
  const { requestId, ...response } = await wsClient.sendRequest(
    apiCall({
      endpoint: API_SAVE_UCAST,
      request: { id: '41224d776a326fb40f000001', rok: 2018 },
      token
    })
  );
  expect(response).toMatchSnapshot();
});

it('saveUcast [not authenticated]', async () => {
  const { requestId, ...response } = await wsClient.sendRequest(
    apiCall({ endpoint: API_SAVE_UCAST })
  );
  expect(response).toMatchSnapshot();
});
