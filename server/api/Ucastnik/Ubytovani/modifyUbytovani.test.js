'use strict';

const db = require('../../../db');
const {
  API_MODIFY_UBYTOVANI,
  API_SAVE_UCAST,
  UBYTOVANI_NEPRESPANO,
  UBYTOVANI_ODHLASIT,
  UBYTOVANI_PRESPANO,
  UBYTOVANI_PRIHLASIT,
  apiCall,
} = require('../../../../common/common');
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
beforeAll(async () => {
  wsServer.listen(port);
  await wsClient.open();

  await db.connect();
  await Promise.all([Kategorie.deleteMany(), Rocnik.deleteMany()]);

  kategorie1 = new Kategorie({
    typ: 'maraton',
    pohlavi: 'žena',
    vek: { min: 40, max: 49 },
  });
  await kategorie1.save();

  const rocnik1 = new Rocnik({ rok: 2017, datum: '2017-06-10' });
  rocnik1.kategorie.push({
    typ: 'maraton',
    kategorie: [kategorie1.id],
    startCisla: { rozsahy: ['1-100'] },
    startovne: { predem: 150, naMiste: 200 },
  });
  rocnik1.ubytovani.pátek = { poplatek: 50 };
  rocnik1.ubytovani.sobota = { poplatek: 60 };
  await rocnik1.save();

  const rocnik2 = new Rocnik({ rok: 2018, datum: '2018-06-08' });
  rocnik2.kategorie.push({
    typ: 'maraton',
    kategorie: [kategorie1.id],
    startCisla: { rozsahy: ['5-95'] },
    startovne: { predem: 200, naMiste: 250 },
  });
  rocnik2.ubytovani.pátek = { poplatek: 60 };
  await rocnik2.save();
});

beforeEach(async () => {
  await Ucastnik.deleteMany();
});

afterAll(async () => {
  await wsClient.close();
  wsServer.close();
  await db.disconnect();
});

it('přihlaš ubytování (nebyla nikdy přihlášena)', async () => {
  const udaje = {
    prijmeni: 'Sukdoláková',
    jmeno: 'Františka',
    narozeni: { rok: 1953 },
    pohlavi: 'žena',
    obec: 'Ostrava 1',
  };
  const prihlaska = { kategorie: kategorie1.id, datum: '2018-06-20' };

  const response1 = await wsClient.sendRequest(
    apiCall({
      endpoint: API_SAVE_UCAST,
      request: { rok: 2018, udaje, prihlaska, ubytovani: {} },
      token,
    })
  );
  const { id } = response1.response;
  expect(id).toBeTruthy();

  const { requestId, ...response } = await wsClient.sendRequest(
    apiCall({
      endpoint: API_MODIFY_UBYTOVANI,
      request: { id, rok: 2018, den: 'pátek', modifikace: UBYTOVANI_PRIHLASIT },
      token,
    })
  );
  expect(response).toMatchSnapshot();

  const ucastnici = await Ucastnik.find({}, { _id: 0 }).lean();
  ucastnici[0].ucasti[0].prihlaska.kategorie = '===id===';
  expect(ucastnici).toMatchSnapshot();
});

it('odhlaš a přihlaš ubytování', async () => {
  const udaje = {
    prijmeni: 'Sukdoláková',
    jmeno: 'Františka',
    narozeni: { rok: 1953 },
    pohlavi: 'žena',
    obec: 'Ostrava 1',
  };
  const prihlaska = { kategorie: kategorie1.id, datum: '2018-06-20' };

  const response1 = await wsClient.sendRequest(
    apiCall({
      endpoint: API_SAVE_UCAST,
      request: { rok: 2018, udaje, prihlaska, ubytovani: { pátek: { prihlaseno: true } } },
      token,
    })
  );
  const { id } = response1.response;
  expect(id).toBeTruthy();

  let { requestId, ...response } = await wsClient.sendRequest(
    apiCall({
      endpoint: API_MODIFY_UBYTOVANI,
      request: { id, rok: 2018, den: 'pátek', modifikace: UBYTOVANI_ODHLASIT },
      token,
    })
  );
  expect(response).toMatchSnapshot();

  ({ requestId, ...response } = await wsClient.sendRequest(
    apiCall({
      endpoint: API_MODIFY_UBYTOVANI,
      request: { id, rok: 2018, den: 'pátek', modifikace: UBYTOVANI_PRIHLASIT },
      token,
    })
  ));
  expect(response).toMatchSnapshot();

  const ucastnici = await Ucastnik.find({}, { _id: 0 }).lean();
  ucastnici[0].ucasti[0].prihlaska.kategorie = '===id===';
  expect(ucastnici).toMatchSnapshot();
});

it('ubytování přihlásila a přespala', async () => {
  const udaje = {
    prijmeni: 'Sukdoláková',
    jmeno: 'Františka',
    narozeni: { rok: 1953 },
    pohlavi: 'žena',
    obec: 'Ostrava 1',
  };
  const prihlaska = { kategorie: kategorie1.id, datum: '2018-06-20' };

  const response1 = await wsClient.sendRequest(
    apiCall({
      endpoint: API_SAVE_UCAST,
      request: { rok: 2018, udaje, prihlaska, ubytovani: { pátek: { prihlaseno: true } } },
      token,
    })
  );
  const { id } = response1.response;
  expect(id).toBeTruthy();

  const { requestId, ...response } = await wsClient.sendRequest(
    apiCall({
      endpoint: API_MODIFY_UBYTOVANI,
      request: { id, rok: 2018, den: 'pátek', modifikace: UBYTOVANI_PRESPANO },
      token,
    })
  );
  expect(response).toMatchSnapshot();

  const ucastnici = await Ucastnik.find({}, { _id: 0 }).lean();
  ucastnici[0].ucasti[0].prihlaska.kategorie = '===id===';
  expect(ucastnici).toMatchSnapshot();
});

it('ubytování přihlásila a nepřespala', async () => {
  const udaje = {
    prijmeni: 'Sukdoláková',
    jmeno: 'Františka',
    narozeni: { rok: 1953 },
    pohlavi: 'žena',
    obec: 'Ostrava 1',
  };
  const prihlaska = { kategorie: kategorie1.id, datum: '2018-06-20' };

  const response1 = await wsClient.sendRequest(
    apiCall({
      endpoint: API_SAVE_UCAST,
      request: { rok: 2018, udaje, prihlaska, ubytovani: { pátek: { prihlaseno: true } } },
      token,
    })
  );
  const { id } = response1.response;
  expect(id).toBeTruthy();

  const { requestId, ...response } = await wsClient.sendRequest(
    apiCall({
      endpoint: API_MODIFY_UBYTOVANI,
      request: { id, rok: 2018, den: 'pátek', modifikace: UBYTOVANI_NEPRESPANO },
      token,
    })
  );
  expect(response).toMatchSnapshot();

  const ucastnici = await Ucastnik.find({}, { _id: 0 }).lean();
  ucastnici[0].ucasti[0].prihlaska.kategorie = '===id===';
  expect(ucastnici).toMatchSnapshot();
});

it('ubytování nevypsáno', async () => {
  const udaje = {
    prijmeni: 'Sukdoláková',
    jmeno: 'Františka',
    narozeni: { rok: 1953 },
    pohlavi: 'žena',
    obec: 'Ostrava 1',
  };
  const prihlaska = { kategorie: kategorie1.id, datum: '2018-06-20' };

  const response1 = await wsClient.sendRequest(
    apiCall({
      endpoint: API_SAVE_UCAST,
      request: { rok: 2018, udaje, prihlaska, ubytovani: {} },
      token,
    })
  );
  const { id } = response1.response;
  expect(id).toBeTruthy();

  const { requestId, ...response } = await wsClient.sendRequest(
    apiCall({
      endpoint: API_MODIFY_UBYTOVANI,
      request: { id, rok: 2018, den: 'sobota', modifikace: UBYTOVANI_PRIHLASIT },
      token,
    })
  );
  expect(response).toMatchSnapshot();
});

it('účastník neexistuje', async () => {
  const { requestId, ...response } = await wsClient.sendRequest(
    apiCall({
      endpoint: API_MODIFY_UBYTOVANI,
      request: {
        id: '41224d776a326fb40f000001',
        rok: 2018,
        den: 'pátek',
        modifikace: UBYTOVANI_PRIHLASIT,
      },
      token,
    })
  );
  expect(response).toMatchSnapshot();
});

it('neexistující modifikace', async () => {
  const { requestId, ...response } = await wsClient.sendRequest(
    apiCall({ endpoint: API_MODIFY_UBYTOVANI, request: { modifikace: 'huh' }, token })
  );
  expect(response).toMatchSnapshot();
});

it('not authenticated', async () => {
  const { requestId, ...response } = await wsClient.sendRequest(
    apiCall({ endpoint: API_MODIFY_UBYTOVANI })
  );
  expect(response).toMatchSnapshot();
});
