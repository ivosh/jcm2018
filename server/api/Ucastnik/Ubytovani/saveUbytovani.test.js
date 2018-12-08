'use strict';

const db = require('../../../db');
const {
  API_SAVE_UBYTOVANI,
  API_SAVE_UDAJE,
  UBYTOVANI_NEPRESPANO,
  UBYTOVANI_ODHLASIT,
  UBYTOVANI_PRIHLASIT,
  apiCall,
  ubytovaniModifications
} = require('../../../../common/common');
const createWsServer = require('../../../createWsServer');
const createWsClient = require('./../../createWsClient');
const Kategorie = require('../../../model/Kategorie/Kategorie');
const Rocnik = require('../../../model/Rocnik/Rocnik');
const Ucastnik = require('../../../model/Ucastnik/Ucastnik');
const generateTestToken = require('../../generateTestToken');

const port = 5601;
const wsServer = createWsServer({});
const wsClient = createWsClient({ port });
const token = generateTestToken();

beforeAll(async () => {
  wsServer.listen(port);
  await wsClient.open();

  await db.connect();
  await Promise.all([Kategorie.deleteMany(), Rocnik.deleteMany()]);

  const kategorie1 = new Kategorie({
    typ: 'maraton',
    pohlavi: 'žena',
    vek: { min: 40, max: 49 }
  });
  await kategorie1.save();

  const rocnik1 = new Rocnik({ rok: 2017, datum: '2017-06-10' });
  rocnik1.kategorie.push({
    typ: 'maraton',
    kategorie: [kategorie1.id],
    startCisla: { rozsahy: ['1-100'] },
    startovne: { predem: 150, naMiste: 200 }
  });
  rocnik1.ubytovani.pátek = { poplatek: 50 };
  rocnik1.ubytovani.sobota = { poplatek: 60 };
  await rocnik1.save();

  const rocnik2 = new Rocnik({ rok: 2018, datum: '2018-06-08' });
  rocnik2.kategorie.push({
    typ: 'maraton',
    kategorie: [kategorie1.id],
    startCisla: { rozsahy: ['5-95'] },
    startovne: { predem: 200, naMiste: 250 }
  });
  rocnik2.ubytovani.pátek = { poplatek: 60 };
  await rocnik2.save();
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
  const ubytovani = {
    pátek: { prihlaseno: true, prespano: false },
    sobota: { prihlaseno: true, prespano: true }
  };

  const response1 = await wsClient.sendRequest(
    apiCall({ endpoint: API_SAVE_UDAJE, request: { rok: 2017, udaje }, token })
  );
  const { id } = response1.response;
  expect(id).toBeTruthy();

  const { requestId, ...response } = await wsClient.sendRequest(
    apiCall({ endpoint: API_SAVE_UBYTOVANI, request: { id, rok: 2017, ubytovani }, token })
  );
  expect(response).toMatchSnapshot();

  const ucastnici = await Ucastnik.find({}, { _id: 0 }).lean();
  expect(ucastnici).toMatchSnapshot();
});

it('přihlaš a zase odhlaš', async () => {
  const udaje = {
    prijmeni: 'Balabák',
    jmeno: 'František',
    narozeni: { rok: 1953 },
    pohlavi: 'muž',
    obec: 'Ostrava 1'
  };
  const ubytovaniPrihlaseno = ubytovaniModifications[UBYTOVANI_PRIHLASIT]({ den: 'pátek' });
  const ubytovaniOdhlaseno = ubytovaniModifications[UBYTOVANI_ODHLASIT]({
    den: 'pátek',
    ubytovani: ubytovaniPrihlaseno
  });

  const response1 = await wsClient.sendRequest(
    apiCall({ endpoint: API_SAVE_UDAJE, request: { rok: 2018, udaje }, token })
  );
  const { id } = response1.response;
  expect(id).toBeTruthy();

  let { requestId, ...response } = await wsClient.sendRequest(
    apiCall({
      endpoint: API_SAVE_UBYTOVANI,
      request: { id, rok: 2018, ubytovani: ubytovaniPrihlaseno },
      token
    })
  );
  expect(response).toMatchSnapshot();

  ({ requestId, ...response } = await wsClient.sendRequest(
    apiCall({
      endpoint: API_SAVE_UBYTOVANI,
      request: { id, rok: 2018, ubytovani: ubytovaniOdhlaseno },
      token
    })
  ));
  expect(response).toMatchSnapshot();

  const ucastnici = await Ucastnik.find({}, { _id: 0 }).lean();
  expect(ucastnici).toMatchSnapshot();
});

it('zapiš nepřespáno', async () => {
  const udaje = {
    prijmeni: 'Balabák',
    jmeno: 'František',
    narozeni: { rok: 1953 },
    pohlavi: 'muž',
    obec: 'Ostrava 1'
  };

  const response1 = await wsClient.sendRequest(
    apiCall({ endpoint: API_SAVE_UDAJE, request: { rok: 2018, udaje }, token })
  );
  const { id } = response1.response;
  expect(id).toBeTruthy();

  const { requestId, ...response } = await wsClient.sendRequest(
    apiCall({
      endpoint: API_SAVE_UBYTOVANI,
      request: {
        id,
        rok: 2018,
        ubytovani: ubytovaniModifications[UBYTOVANI_NEPRESPANO]({ den: 'pátek' })
      },
      token
    })
  );
  expect(response).toMatchSnapshot();

  const ucastnici = await Ucastnik.find({}, { _id: 0 }).lean();
  expect(ucastnici).toMatchSnapshot();
});

it('ročník neexistuje', async () => {
  const udaje = {
    prijmeni: 'Balabák',
    jmeno: 'František',
    narozeni: { rok: 1953 },
    pohlavi: 'muž',
    obec: 'Ostrava 1'
  };
  const ubytovani = { pátek: { prihlaseno: true, prespano: false } };

  const response1 = await wsClient.sendRequest(
    apiCall({ endpoint: API_SAVE_UDAJE, request: { rok: 2016, udaje }, token })
  );
  const { id } = response1.response;
  expect(id).toBeTruthy();

  const { requestId, ...response } = await wsClient.sendRequest(
    apiCall({ endpoint: API_SAVE_UBYTOVANI, request: { id, rok: 2016, ubytovani }, token })
  );
  expect(response).toMatchSnapshot();

  const ucastnici = await Ucastnik.find({}, { _id: 0 }).lean();
  expect(ucastnici).toMatchSnapshot();
});

it('ubytování nevypsáno', async () => {
  const udaje = {
    prijmeni: 'Balabák',
    jmeno: 'František',
    narozeni: { rok: 1953 },
    pohlavi: 'muž',
    obec: 'Ostrava 1'
  };
  const ubytovani = { sobota: { prihlaseno: true, prespano: false } };

  const response1 = await wsClient.sendRequest(
    apiCall({ endpoint: API_SAVE_UDAJE, request: { rok: 2018, udaje }, token })
  );
  const { id } = response1.response;
  expect(id).toBeTruthy();

  const { requestId, ...response } = await wsClient.sendRequest(
    apiCall({ endpoint: API_SAVE_UBYTOVANI, request: { id, rok: 2018, ubytovani }, token })
  );
  expect(response).toMatchSnapshot();

  const ucastnici = await Ucastnik.find({}, { _id: 0 }).lean();
  expect(ucastnici).toMatchSnapshot();
});

it('účastník neexistuje', async () => {
  const ubytovani = {};

  const { requestId, ...response } = await wsClient.sendRequest(
    apiCall({
      endpoint: API_SAVE_UBYTOVANI,
      request: { id: '41224d776a326fb40f000001', rok: 2018, ubytovani },
      token
    })
  );
  expect(response).toMatchSnapshot();
});

it('saveUbytovani [not authenticated]', async () => {
  const { requestId, ...response } = await wsClient.sendRequest(
    apiCall({ endpoint: API_SAVE_UBYTOVANI })
  );
  expect(response).toMatchSnapshot();
});
