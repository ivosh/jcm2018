'use strict';

const db = require('../../../db');
const { API_POHAR_PREDAN, apiCall } = require('../../../../common/common');
const createWsServer = require('../../../createWsServer');
const createWsClient = require('../../createWsClient');
const Kategorie = require('../../../model/Kategorie/Kategorie');
const Rocnik = require('../../../model/Rocnik/Rocnik');
const Ucastnik = require('../../../model/Ucastnik/Ucastnik');
const generateTestToken = require('../../generateTestToken');

const port = 5609;
const wsServer = createWsServer({});
const wsClient = createWsClient({ port });
const token = generateTestToken();

const testovaciRoky = [2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020];
let kategorie1;
let kategorie3;

const setupUcastnik = async roky => {
  const ucastnik = new Ucastnik();
  testovaciRoky.forEach(rok => {
    if (roky[rok]) {
      const { kategorie, dokonceno, prihlaska } = roky[rok];
      const kategorieId = kategorie === 'maraton' ? kategorie1.id : kategorie3.id;
      const ucast = {
        rok,
        udaje: {
          prijmeni: 'X',
          jmeno: 'Y',
          narozeni: { rok: 2000, mesic: 1, den: 1 },
          pohlavi: 'muž',
          obec: 'Z'
        }
      };
      if (prihlaska || dokonceno !== undefined) {
        ucast.prihlaska = { datum: '2009-09-09', kategorie: kategorieId };
      }
      if (dokonceno !== undefined) {
        ucast.vykon = { dokonceno, kategorie: kategorieId };
      }
      ucastnik.ucasti.push(ucast);
    }
  });

  await ucastnik.save();
  return ucastnik;
};

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
  const kategorie2 = new Kategorie({
    typ: 'maraton',
    pohlavi: 'žena',
    vek: { min: 50, max: 59 }
  });
  await kategorie2.save();
  kategorie3 = new Kategorie({
    typ: 'půlmaraton',
    pohlavi: 'žena',
    vek: { min: 40, max: 49 }
  });
  await kategorie3.save();

  const rocnik1 = new Rocnik({ rok: 2011, datum: '2011-06-01' });
  rocnik1.kategorie.push({
    typ: 'maraton',
    kategorie: [kategorie1.id, kategorie2.id],
    startovne: { predem: 200, naMiste: 250 }
  });
  await rocnik1.save();

  const rocnik2 = new Rocnik({ rok: 2012, datum: '2012-06-01' });
  rocnik2.kategorie.push({
    typ: 'maraton',
    kategorie: [kategorie1.id, kategorie2.id],
    startovne: { predem: 200, naMiste: 250 }
  });
  await rocnik2.save();

  const rocnik3 = new Rocnik({ rok: 2013, datum: '2013-06-01' });
  rocnik3.kategorie.push({
    typ: 'maraton',
    kategorie: [kategorie1.id, kategorie2.id],
    startovne: { predem: 200, naMiste: 250 }
  });
  rocnik3.kategorie.push({
    typ: 'půlmaraton',
    kategorie: [kategorie3.id],
    startovne: { predem: 250, naMiste: 300 }
  });
  await rocnik3.save();

  const rocnik4 = new Rocnik({ rok: 2014, datum: '2014-06-01' });
  rocnik4.kategorie.push({
    typ: 'maraton',
    kategorie: [kategorie1.id, kategorie2.id],
    startovne: { predem: 200, naMiste: 250 }
  });
  await rocnik4.save();

  const rocnik5 = new Rocnik({ rok: 2015, datum: '2015-06-01' });
  rocnik5.kategorie.push({
    typ: 'maraton',
    kategorie: [kategorie1.id, kategorie2.id],
    startovne: { predem: 200, naMiste: 250 }
  });
  rocnik5.kategorie.push({
    typ: 'půlmaraton',
    kategorie: [kategorie3.id],
    startovne: { predem: 250, naMiste: 300 }
  });
  await rocnik5.save();

  const rocnik6 = new Rocnik({ rok: 2016, datum: '2016-06-01' });
  rocnik6.kategorie.push({
    typ: 'maraton',
    kategorie: [kategorie1.id, kategorie2.id],
    startovne: { predem: 200, naMiste: 250 }
  });
  await rocnik6.save();

  const rocnik7 = new Rocnik({ rok: 2017, datum: '2017-06-01' });
  rocnik7.kategorie.push({
    typ: 'maraton',
    kategorie: [kategorie1.id, kategorie2.id],
    startovne: { predem: 200, naMiste: 250 }
  });
  rocnik7.kategorie.push({
    typ: 'půlmaraton',
    kategorie: [kategorie3.id],
    startovne: { predem: 250, naMiste: 300 }
  });
  await rocnik7.save();

  const rocnik8 = new Rocnik({ rok: 2018, datum: '2018-06-01' });
  rocnik8.kategorie.push({
    typ: 'maraton',
    kategorie: [kategorie1.id, kategorie2.id],
    startovne: { predem: 200, naMiste: 250 }
  });
  await rocnik8.save();

  const rocnik9 = new Rocnik({ rok: 2019, datum: '2019-06-01' });
  rocnik9.kategorie.push({
    typ: 'maraton',
    kategorie: [kategorie1.id, kategorie2.id],
    startovne: { predem: 200, naMiste: 250 }
  });
  await rocnik9.save();

  const rocnik10 = new Rocnik({ rok: 2020, datum: '2020-06-01' });
  rocnik10.kategorie.push({
    typ: 'maraton',
    kategorie: [kategorie1.id, kategorie2.id],
    startovne: { predem: 200, naMiste: 250 }
  });
  rocnik10.kategorie.push({
    typ: 'půlmaraton',
    kategorie: [kategorie3.id],
    startovne: { predem: 250, naMiste: 300 }
  });
  await rocnik10.save();
});

beforeEach(async () => {
  await Ucastnik.deleteMany();
});

afterAll(async () => {
  await Promise.all[(Kategorie.deleteMany(), Rocnik.deleteMany())];

  await wsClient.close();
  await wsServer.close();
  await db.disconnect();
});

it('4x dokončil a přihlášen na pátý ročník', async () => {
  const ucastnik = await setupUcastnik({
    2011: { kategorie: 'maraton', dokonceno: true },
    2012: { kategorie: 'maraton', dokonceno: true },
    2014: { kategorie: 'maraton', dokonceno: true },
    2017: { kategorie: 'maraton', dokonceno: true },
    2018: { kategorie: 'maraton', prihlaska: true }
  });

  const { requestId, ...response } = await wsClient.sendRequest(
    apiCall({ endpoint: API_POHAR_PREDAN, request: { id: ucastnik.id }, token })
  );
  expect(response).toMatchSnapshot();

  const ucastnici = await Ucastnik.find({}, { _id: 0 })
    .populate('ucasti.prihlaska.kategorie')
    .populate('ucasti.vykon.kategorie')
    .lean();
  ucastnici[0].ucasti[0].prihlaska.kategorie._id = '===k1===';
  ucastnici[0].ucasti[0].vykon.kategorie._id = '===k1===';
  expect(ucastnici).toMatchSnapshot();
});

it('5x dokončil a přihlášen na šestý ročník', async () => {
  const ucastnik = await setupUcastnik({
    2011: { kategorie: 'maraton', dokonceno: true },
    2012: { kategorie: 'maraton', dokonceno: true },
    2013: { kategorie: 'maraton', dokonceno: true },
    2014: { kategorie: 'maraton', dokonceno: true },
    2017: { kategorie: 'maraton', dokonceno: true },
    2018: { kategorie: 'maraton', prihlaska: true }
  });

  const { requestId, ...response } = await wsClient.sendRequest(
    apiCall({ endpoint: API_POHAR_PREDAN, request: { id: ucastnik.id }, token })
  );
  expect(response).toMatchSnapshot();

  const ucastnici = await Ucastnik.find({}, { _id: 0 })
    .populate('ucasti.prihlaska.kategorie')
    .populate('ucasti.vykon.kategorie')
    .lean();
  ucastnici[0].ucasti[0].prihlaska.kategorie._id = '===k1===';
  ucastnici[0].ucasti[0].vykon.kategorie._id = '===k1===';
  expect(ucastnici).toMatchSnapshot();
});

it('6x dokončil ale z toho jen 3x maraton', async () => {
  const ucastnik = await setupUcastnik({
    2011: { kategorie: 'maraton', dokonceno: true },
    2013: { kategorie: 'půlmaraton', dokonceno: true },
    2014: { kategorie: 'maraton', dokonceno: true },
    2015: { kategorie: 'půlmaraton', dokonceno: true },
    2017: { kategorie: 'půlmaraton', dokonceno: true },
    2018: { kategorie: 'maraton', dokonceno: true }
  });

  const { requestId, ...response } = await wsClient.sendRequest(
    apiCall({ endpoint: API_POHAR_PREDAN, request: { id: ucastnik.id }, token })
  );
  expect(response).toMatchSnapshot();

  const ucastnici = await Ucastnik.find({}, { _id: 0 })
    .populate('ucasti.prihlaska.kategorie')
    .populate('ucasti.vykon.kategorie')
    .lean();
  ucastnici[0].ucasti[0].prihlaska.kategorie._id = '===k1===';
  ucastnici[0].ucasti[0].vykon.kategorie._id = '===k1===';
  ucastnici[0].ucasti[1].prihlaska.kategorie._id = '===k2===';
  ucastnici[0].ucasti[1].vykon.kategorie._id = '===k2===';
  expect(ucastnici).toMatchSnapshot();
});

it('účastník neexistuje', async () => {
  const { requestId, ...response } = await wsClient.sendRequest(
    apiCall({
      endpoint: API_POHAR_PREDAN,
      request: { id: '41224d776a326fb40f000001' },
      token
    })
  );
  expect(response).toMatchSnapshot();
});

it('poharPredan [not authenticated]', async () => {
  const { requestId, ...response } = await wsClient.sendRequest(
    apiCall({ endpoint: API_POHAR_PREDAN })
  );
  expect(response).toMatchSnapshot();
});
