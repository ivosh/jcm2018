'use strict';

const db = require('../../../db');
const { API_SAVE_PRIHLASKA, API_SAVE_UDAJE, apiCall } = require('../../../../common/common');
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
let kategorie3;
let kategorie4;
let kategorie5;
let kategorie6;
let kategorie7;
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
  kategorie2 = new Kategorie({
    typ: 'maraton',
    pohlavi: 'žena',
    vek: { min: 50, max: 59 },
  });
  await kategorie2.save();
  kategorie3 = new Kategorie({
    typ: 'maraton',
    pohlavi: 'muž',
    vek: { min: 50, max: 59 },
  });
  await kategorie3.save();
  kategorie4 = new Kategorie({
    typ: 'půlmaraton',
    pohlavi: 'žena',
    vek: { min: 40, max: 49 },
  });
  await kategorie4.save();
  kategorie5 = new Kategorie({
    typ: 'půlmaraton',
    pohlavi: 'žena',
    vek: { min: 50, max: 59 },
  });
  await kategorie5.save();
  kategorie6 = new Kategorie({
    typ: 'půlmaraton',
    pohlavi: 'muž',
    vek: { min: 50, max: 59 },
  });
  await kategorie6.save();
  kategorie7 = new Kategorie({ typ: 'pěší' });
  await kategorie7.save();

  const rocnik1 = new Rocnik({ rok: 2015, datum: '2015-06-01' });
  rocnik1.kategorie.push({
    typ: 'maraton',
    kategorie: [kategorie1.id, kategorie2.id, kategorie3.id],
    startCisla: { rozsahy: ['1-100'] },
    startovne: { predem: 150, naMiste: 200 },
  });
  rocnik1.ubytovani.pátek = { poplatek: 50 };
  rocnik1.ubytovani.sobota = { poplatek: 60 };
  await rocnik1.save();

  const rocnik2 = new Rocnik({ rok: 2016, datum: '2016-06-01' });
  rocnik2.kategorie.push({
    typ: 'maraton',
    kategorie: [kategorie1.id, kategorie2.id, kategorie3.id],
    startCisla: { rozsahy: ['1-100'] },
    startovne: { predem: 150, naMiste: 200 },
  });
  rocnik2.ubytovani.pátek = { poplatek: 50 };
  rocnik2.ubytovani.sobota = { poplatek: 60 };
  await rocnik2.save();

  const rocnik3 = new Rocnik({ rok: 2017, datum: '2017-06-10' });
  rocnik3.kategorie.push({
    typ: 'maraton',
    kategorie: [kategorie1.id, kategorie2.id, kategorie3.id],
    startCisla: { rozsahy: ['1-100'] },
    startovne: { predem: 150, naMiste: 200 },
  });
  rocnik3.kategorie.push({
    typ: 'půlmaraton',
    kategorie: [kategorie4.id, kategorie5.id, kategorie6.id],
    startCisla: { rozsahy: ['1-100'] },
    startovne: { predem: 150, naMiste: 200 },
  });
  rocnik3.ubytovani.pátek = { poplatek: 50 };
  rocnik3.ubytovani.sobota = { poplatek: 60 };
  await rocnik3.save();

  const rocnik4 = new Rocnik({ rok: 2018, datum: '2018-06-08' });
  rocnik4.kategorie.push({
    typ: 'maraton',
    kategorie: [kategorie1.id, kategorie2.id, kategorie3.id],
    startCisla: { rozsahy: ['5-95'] },
    startovne: { predem: 200, naMiste: 250 },
  });
  rocnik4.kategorie.push({
    typ: 'půlmaraton',
    kategorie: [kategorie4.id, kategorie5.id, kategorie6.id],
    startCisla: { rozsahy: ['100-199'] },
    startovne: { predem: 200, naMiste: 250 },
  });
  rocnik4.kategorie.push({
    typ: 'pěší',
    kategorie: [kategorie7.id],
    startovne: { predem: 25, naMiste: 25 },
  });
  rocnik4.ubytovani.pátek = { poplatek: 60 };
  await rocnik4.save();

  const rocnik5 = new Rocnik({ rok: 2019, datum: '2019-06-09' });
  rocnik5.kategorie.push({
    typ: 'maraton',
    kategorie: [kategorie1.id, kategorie2.id, kategorie3.id],
    startCisla: { rozsahy: ['5-95'] },
    startovne: { predem: 200, naMiste: 250 },
  });
  rocnik5.kategorie.push({
    typ: 'půlmaraton',
    kategorie: [kategorie4.id, kategorie5.id, kategorie6.id],
    startCisla: { rozsahy: ['100-199'] },
    startovne: { predem: 200, naMiste: 250 },
  });
  rocnik5.kategorie.push({
    typ: 'pěší',
    kategorie: [kategorie7.id],
    startovne: { predem: 25, naMiste: 25 },
  });
  rocnik5.ubytovani.pátek = { poplatek: 60 };
  await rocnik5.save();
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
    obec: 'Ostrava 1',
  };
  const prihlaska = {
    datum: new Date('2018-02-07Z'),
    kategorie: kategorie6.id, // půlmaraton
    kod: '===kod===',
    startovnePoSleve: 0,
  };

  const response1 = await wsClient.sendRequest(
    apiCall({ endpoint: API_SAVE_UDAJE, request: { rok: 2018, udaje }, token })
  );
  const { id } = response1.response;
  expect(id).toBeTruthy();

  const { requestId, ...response } = await wsClient.sendRequest(
    apiCall({ endpoint: API_SAVE_PRIHLASKA, request: { id, rok: 2018, prihlaska }, token })
  );
  expect(response).toMatchSnapshot();

  const ucastnici = await Ucastnik.find({}, { _id: 0 })
    .populate('ucasti.prihlaska.kategorie')
    .lean();
  ucastnici[0].ucasti[0].prihlaska.kategorie._id = '===k1===';
  expect(ucastnici).toMatchSnapshot();
});

it('vytvoř dvě účasti s přihláškami', async () => {
  const udaje1 = {
    prijmeni: 'Sukdoláková',
    jmeno: 'Božena',
    narozeni: { rok: 1967 },
    pohlavi: 'žena',
    obec: 'Kladno Rozdělov',
  };
  const udaje2 = { ...udaje1, obec: 'Kamenický Přívoz' };
  const prihlaska1 = {
    datum: new Date('2017-05-03Z'),
    kategorie: kategorie2.id, // maraton
    startCislo: 7,
    kod: '===kod1===',
    startovnePoSleve: 200,
  };
  const prihlaska2 = {
    datum: new Date('2018-02-07Z'),
    kategorie: kategorie5.id, // půlmaraton
    startCislo: 15,
    kod: '===kod2===',
  };

  let requestId;
  let response;
  ({ requestId, ...response } = await wsClient.sendRequest(
    apiCall({ endpoint: API_SAVE_UDAJE, request: { rok: 2017, udaje: udaje1 }, token })
  ));
  const { id } = response.response;
  expect(id).toBeTruthy();
  expect(requestId).not.toBeNull();
  response.response.id = '===id===';
  expect(response).toMatchSnapshot();

  ({ requestId, ...response } = await wsClient.sendRequest(
    apiCall({ endpoint: API_SAVE_UDAJE, request: { id, rok: 2018, udaje: udaje2 }, token })
  ));
  response.response.id = '===id===';
  expect(response).toMatchSnapshot();

  ({ requestId, ...response } = await wsClient.sendRequest(
    apiCall({
      endpoint: API_SAVE_PRIHLASKA,
      request: { id, rok: 2017, prihlaska: prihlaska1 },
      token,
    })
  ));
  expect(response).toMatchSnapshot();
  ({ requestId, ...response } = await wsClient.sendRequest(
    apiCall({
      endpoint: API_SAVE_PRIHLASKA,
      request: { id, rok: 2018, prihlaska: prihlaska2 },
      token,
    })
  ));
  expect(response).toMatchSnapshot();

  const ucastnici = await Ucastnik.find({}, { _id: 0 })
    .populate('ucasti.prihlaska.kategorie')
    .lean();
  ucastnici[0].ucasti[0].prihlaska.kategorie._id = '===k1===';
  ucastnici[0].ucasti[1].prihlaska.kategorie._id = '===k2===';
  expect(ucastnici).toMatchSnapshot();
});

it('přepiš existující přihlášku', async () => {
  const udaje = {
    prijmeni: 'Sukdoláková',
    jmeno: 'Božena',
    narozeni: { rok: 1967 },
    pohlavi: 'žena',
    obec: 'Kladno 1',
  };
  const prihlaska1 = { datum: new Date('2018-05-03Z'), kategorie: kategorie2.id };
  const prihlaska2 = { datum: new Date('2017-05-03Z'), kategorie: kategorie2.id };
  const prihlaska3 = { datum: new Date('2016-05-03Z'), kategorie: kategorie1.id };
  const prihlaska4 = { datum: new Date('2015-05-03Z'), kategorie: kategorie1.id };
  const prihlaska5 = { datum: new Date('2017-04-01Z'), kategorie: kategorie2.id };

  const response1 = await wsClient.sendRequest(
    apiCall({ endpoint: API_SAVE_UDAJE, request: { rok: 2018, udaje }, token })
  );
  const { id } = response1.response;
  expect(id).toBeTruthy();

  await wsClient.sendRequest(
    apiCall({ endpoint: API_SAVE_UDAJE, request: { id, rok: 2017, udaje }, token })
  );
  await wsClient.sendRequest(
    apiCall({ endpoint: API_SAVE_UDAJE, request: { id, rok: 2016, udaje }, token })
  );
  await wsClient.sendRequest(
    apiCall({ endpoint: API_SAVE_UDAJE, request: { id, rok: 2015, udaje }, token })
  );

  await wsClient.sendRequest(
    apiCall({
      endpoint: API_SAVE_PRIHLASKA,
      request: { id, rok: 2018, prihlaska: prihlaska1 },
      token,
    })
  );
  await wsClient.sendRequest(
    apiCall({
      endpoint: API_SAVE_PRIHLASKA,
      request: { id, rok: 2017, prihlaska: prihlaska2 },
      token,
    })
  );
  await wsClient.sendRequest(
    apiCall({
      endpoint: API_SAVE_PRIHLASKA,
      request: { id, rok: 2016, prihlaska: prihlaska3 },
      token,
    })
  );
  await wsClient.sendRequest(
    apiCall({
      endpoint: API_SAVE_PRIHLASKA,
      request: { id, rok: 2015, prihlaska: prihlaska4 },
      token,
    })
  );
  const { requestId, ...response } = await wsClient.sendRequest(
    apiCall({
      endpoint: API_SAVE_PRIHLASKA,
      request: { id, rok: 2017, prihlaska: prihlaska5 },
      token,
    })
  );
  expect(response).toMatchSnapshot();

  const ucastnici = await Ucastnik.find({}, { _id: 0 })
    .populate('ucasti.prihlaska.kategorie')
    .lean();
  ucastnici[0].ucasti[0].prihlaska.kategorie._id = '===k1===';
  ucastnici[0].ucasti[1].prihlaska.kategorie._id = '===k2===';
  ucastnici[0].ucasti[2].prihlaska.kategorie._id = '===k3===';
  ucastnici[0].ucasti[3].prihlaska.kategorie._id = '===k4===';
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
      obec: 'Kladno Rozdělov',
    },
    prihlaska: {
      datum: new Date('2018-05-03Z'),
      kategorie: kategorie5.id, // půlmaraton
      startCislo: 7,
      kod: '===kod1===',
    },
  });
  await ucastnik1.save();

  const ucastnik2 = new Ucastnik();
  const udaje2 = {
    prijmeni: 'Balabák',
    jmeno: 'František',
    narozeni: { rok: 1953 },
    pohlavi: 'muž',
    obec: 'Ostrava 1',
  };
  const prihlaska2 = {
    datum: new Date('2018-02-07Z'),
    kategorie: kategorie6.id, // půlmaraton
    startCislo: 15,
    kod: '===kod2===',
  };
  ucastnik2.ucasti.push({ rok: 2018, udaje: udaje2, prihlaska: prihlaska2 });
  ucastnik2.ucasti.push({
    rok: 2017,
    udaje: udaje2,
    prihlaska: { ...prihlaska2, datum: new Date('2017-04-02') },
  });
  await ucastnik2.save();

  const ucastnik3 = new Ucastnik();
  ucastnik3.ucasti.push({
    rok: 2017,
    udaje: {
      prijmeni: 'Moulová',
      jmeno: 'Milena',
      narozeni: { den: 6, mesic: 5, rok: 1973 },
      pohlavi: 'žena',
      obec: 'Nusle',
    },
    prihlaska: {
      datum: new Date('2017-05-07Z'),
      kategorie: kategorie4.id, // půlmaraton
      startCislo: 6,
      kod: '===kod3===',
    },
  });
  ucastnik3.ucasti.push({
    rok: 2018,
    udaje: {
      prijmeni: 'Moulová',
      jmeno: 'Milena',
      narozeni: { den: 6, mesic: 5, rok: 1973 },
      pohlavi: 'žena',
      obec: 'Nusle',
    },
    prihlaska: {
      datum: new Date('2018-02-07Z'),
      kategorie: kategorie1.id, // maraton
      startCislo: 8,
      kod: '===kod3===',
    },
  });
  ucastnik3.ucasti.push({
    rok: 2019,
    udaje: {
      prijmeni: 'Moulová',
      jmeno: 'Milena',
      narozeni: { den: 6, mesic: 5, rok: 1973 },
      pohlavi: 'žena',
      obec: 'Nusle',
    },
    prihlaska: {
      datum: new Date('2019-01-15Z'),
      kategorie: kategorie1.id, // maraton
      startCislo: 23,
      kod: '===kod4===',
    },
  });
  await ucastnik3.save();

  return [ucastnik2.id, prihlaska2, udaje2];
};

it('ulož startovní číslo - sám sebe', async () => {
  const [id2, prihlaska2] = await setup();
  const { requestId, ...response } = await wsClient.sendRequest(
    apiCall({
      endpoint: API_SAVE_PRIHLASKA,
      request: { id: id2, rok: 2018, prihlaska: prihlaska2 },
      token,
    })
  );

  expect(response.code).toEqual('ok'); // sám sebe musí projít
  expect(response).toMatchSnapshot();

  const ucastnici = await Ucastnik.find({}, { _id: 0 })
    .populate('ucasti.prihlaska.kategorie')
    .lean();
  ucastnici[0].ucasti[0].prihlaska.kategorie._id = '===k1===';
  ucastnici[1].ucasti[0].prihlaska.kategorie._id = '===k2===';
  ucastnici[2].ucasti[0].prihlaska.kategorie._id = '===k3===';
  ucastnici[2].ucasti[1].prihlaska.kategorie._id = '===k4===';
  expect(ucastnici).toMatchSnapshot();
});

it('ulož startovní číslo - startovní číslo obsazené v jiné kategorii', async () => {
  const [id2, prihlaska2] = await setup();
  const { requestId, ...response } = await wsClient.sendRequest(
    apiCall({
      endpoint: API_SAVE_PRIHLASKA,
      request: { id: id2, rok: 2018, prihlaska: { ...prihlaska2, startCislo: 8 } },
      token,
    })
  );
  expect(response.code).toEqual('ok'); // 8 je obsazeno v jiném typu kategorie, musí projít
  expect(response).toMatchSnapshot();

  const ucastnici = await Ucastnik.find({}, { _id: 0 })
    .populate('ucasti.prihlaska.kategorie')
    .lean();
  ucastnici[0].ucasti[0].prihlaska.kategorie._id = '===k1===';
  ucastnici[1].ucasti[0].prihlaska.kategorie._id = '===k2===';
  ucastnici[2].ucasti[0].prihlaska.kategorie._id = '===k3===';
  ucastnici[2].ucasti[1].prihlaska.kategorie._id = '===k4===';
  expect(ucastnici).toMatchSnapshot();
});

it('ulož startovní číslo - startovní číslo obsazené v jiném roce', async () => {
  const [id2, , udaje2] = await setup();

  let requestId;
  let response;
  ({ requestId, ...response } = await wsClient.sendRequest(
    apiCall({ endpoint: API_SAVE_UDAJE, request: { id: id2, rok: 2019, udaje: udaje2 }, token })
  ));
  const { id } = response.response;
  expect(id).toBeTruthy();
  expect(requestId).not.toBeNull();

  ({ requestId, ...response } = await wsClient.sendRequest(
    apiCall({
      endpoint: API_SAVE_PRIHLASKA,
      request: {
        id: id2,
        rok: 2019,
        prihlaska: {
          rok: 2019,
          datum: new Date('2018-12-25'),
          kategorie: kategorie3.id, // maraton
          startCislo: 8,
        },
      },
      token,
    })
  ));
  expect(response.code).toEqual('ok'); // 8 je obsazeno v roce 2018, musí projít
  expect(response).toMatchSnapshot();

  const ucastnici = await Ucastnik.find({}, { _id: 0 })
    .populate('ucasti.prihlaska.kategorie')
    .lean();
  ucastnici[0].ucasti[0].prihlaska.kategorie._id = '===k1===';
  ucastnici[1].ucasti[0].prihlaska.kategorie._id = '===k2===';
  ucastnici[1].ucasti[1].prihlaska.kategorie._id = '===k3===';
  ucastnici[1].ucasti[2].prihlaska.kategorie._id = '===k4===';
  ucastnici[2].ucasti[0].prihlaska.kategorie._id = '===k5===';
  ucastnici[2].ucasti[1].prihlaska.kategorie._id = '===k4===';
  expect(ucastnici).toMatchSnapshot();
});

it('ulož startovní číslo - duplicitní v kategorii', async () => {
  const [id2, prihlaska2] = await setup();
  const { requestId, ...response } = await wsClient.sendRequest(
    apiCall({
      endpoint: API_SAVE_PRIHLASKA,
      request: { id: id2, rok: 2018, prihlaska: { ...prihlaska2, startCislo: 7 } },
      token,
    })
  );
  expect(response.code).not.toEqual('ok'); // nesmí projít
  expect(response).toMatchSnapshot();

  const ucastnici = await Ucastnik.find({}, { _id: 0 })
    .populate('ucasti.prihlaska.kategorie')
    .lean();
  ucastnici[0].ucasti[0].prihlaska.kategorie._id = '===k1===';
  ucastnici[1].ucasti[0].prihlaska.kategorie._id = '===k2===';
  ucastnici[2].ucasti[0].prihlaska.kategorie._id = '===k3===';
  ucastnici[2].ucasti[1].prihlaska.kategorie._id = '===k4===';
  expect(ucastnici).toMatchSnapshot();
});

it('ulož přihlášku - kód obsazen v jiném roce', async () => {
  const [id2, prihlaska2] = await setup();

  const { requestId, ...response } = await wsClient.sendRequest(
    apiCall({
      endpoint: API_SAVE_PRIHLASKA,
      request: {
        id: id2,
        rok: 2018,
        prihlaska: { ...prihlaska2, rok: 2018, kod: '===kod4===' },
      },
      token,
    })
  );
  expect(response.code).toEqual('ok'); // kod4 je obsazeno v roce 2019, musí projít
  expect(response).toMatchSnapshot();

  const ucastnici = await Ucastnik.find({}, { _id: 0 })
    .populate('ucasti.prihlaska.kategorie')
    .lean();
  ucastnici[0].ucasti[0].prihlaska.kategorie._id = '===k1===';
  ucastnici[1].ucasti[0].prihlaska.kategorie._id = '===k2===';
  ucastnici[2].ucasti[0].prihlaska.kategorie._id = '===k3===';
  ucastnici[2].ucasti[1].prihlaska.kategorie._id = '===k4===';
  expect(ucastnici).toMatchSnapshot();
});

it('ulož přihlášku - duplicitní kód', async () => {
  const [id2, prihlaska2, udaje2] = await setup();

  let requestId;
  let response;
  ({ requestId, ...response } = await wsClient.sendRequest(
    apiCall({ endpoint: API_SAVE_UDAJE, request: { id: id2, rok: 2019, udaje: udaje2 }, token })
  ));
  const { id } = response.response;
  expect(id).toBeTruthy();
  expect(requestId).not.toBeNull();

  ({ requestId, ...response } = await wsClient.sendRequest(
    apiCall({
      endpoint: API_SAVE_PRIHLASKA,
      request: { id: id2, rok: 2019, prihlaska: { ...prihlaska2, kod: '===kod4===' } },
      token,
    })
  ));
  expect(response.code).not.toEqual('ok'); // nesmí projít
  expect(response).toMatchSnapshot();

  const ucastnici = await Ucastnik.find({}, { _id: 0 })
    .populate('ucasti.prihlaska.kategorie')
    .lean();
  ucastnici[0].ucasti[0].prihlaska.kategorie._id = '===k1===';
  ucastnici[1].ucasti[0].prihlaska.kategorie._id = '===k2===';
  ucastnici[2].ucasti[0].prihlaska.kategorie._id = '===k3===';
  ucastnici[2].ucasti[1].prihlaska.kategorie._id = '===k4===';
  expect(ucastnici).toMatchSnapshot();
});

it('přihláška na pěší', async () => {
  const udaje = {
    prijmeni: 'Malá',
    jmeno: 'Bára',
    narozeni: { den: 4, mesic: 11, rok: 1998 },
    pohlavi: 'žena',
    obec: 'Horákov',
  };
  const prihlaska = {
    datum: new Date('2018-02-07Z'),
    kategorie: kategorie7.id, // pěší
    startCislo: 14, // navíc
    kod: '===kod===',
  };

  const response1 = await wsClient.sendRequest(
    apiCall({ endpoint: API_SAVE_UDAJE, request: { rok: 2018, udaje }, token })
  );
  const { id } = response1.response;
  expect(id).toBeTruthy();

  const { requestId, ...response } = await wsClient.sendRequest(
    apiCall({ endpoint: API_SAVE_PRIHLASKA, request: { id, rok: 2018, prihlaska }, token })
  );
  expect(response).toMatchSnapshot();

  const ucastnici = await Ucastnik.find({}, { _id: 0 })
    .populate('ucasti.prihlaska.kategorie')
    .lean();
  ucastnici[0].ucasti[0].prihlaska.kategorie._id = '===k1===';
  expect(ucastnici).toMatchSnapshot();
});

it('účastník neexistuje', async () => {
  const prihlaska = {
    datum: new Date('2018-02-07Z'),
    kategorie: kategorie1.id,
    kod: '===kod===',
  };

  const { requestId, ...response } = await wsClient.sendRequest(
    apiCall({
      endpoint: API_SAVE_PRIHLASKA,
      request: { id: '41224d776a326fb40f000001', rok: 2018, prihlaska },
      token,
    })
  );
  expect(response).toMatchSnapshot();
});

it('kategorie neexistuje', async () => {
  const udaje = {
    prijmeni: 'Balabák',
    jmeno: 'František',
    narozeni: { rok: 1953 },
    pohlavi: 'muž',
    obec: 'Ostrava 1',
  };
  const prihlaska = {
    datum: new Date('2018-02-07Z'),
    kategorie: '===neexistující===',
    startCislo: 34,
  };

  const response1 = await wsClient.sendRequest(
    apiCall({ endpoint: API_SAVE_UDAJE, request: { rok: 2018, udaje }, token })
  );
  const { id } = response1.response;
  expect(id).toBeTruthy();

  const { requestId, ...response } = await wsClient.sendRequest(
    apiCall({ endpoint: API_SAVE_PRIHLASKA, request: { id, rok: 2018, prihlaska }, token })
  );
  expect(response).toMatchSnapshot();
});

it('chybná kategorie (věk)', async () => {
  const udaje = {
    prijmeni: 'Sukdoláková',
    jmeno: 'Božena',
    narozeni: { rok: 1967 },
    pohlavi: 'žena',
    obec: 'Kladno 1',
  };
  const prihlaska = {
    datum: new Date('2015-02-07Z'),
    kategorie: kategorie2.id,
    startCislo: 34,
  };

  const response1 = await wsClient.sendRequest(
    apiCall({ endpoint: API_SAVE_UDAJE, request: { rok: 2015, udaje }, token })
  );
  const { id } = response1.response;
  expect(id).toBeTruthy();

  const { requestId, ...response } = await wsClient.sendRequest(
    apiCall({ endpoint: API_SAVE_PRIHLASKA, request: { id, rok: 2015, prihlaska }, token })
  );
  response.status = response.status.replace(/[a-f\d]{24}/g, '==id==');
  expect(response).toMatchSnapshot();
});

it('přihláška chybí', async () => {
  const udaje = {
    prijmeni: 'Sukdoláková',
    jmeno: 'Božena',
    narozeni: { rok: 1967 },
    pohlavi: 'žena',
    obec: 'Kladno 1',
  };

  const response1 = await wsClient.sendRequest(
    apiCall({ endpoint: API_SAVE_UDAJE, request: { rok: 2018, udaje }, token })
  );
  const { id } = response1.response;
  expect(id).toBeTruthy();

  const { requestId, ...response } = await wsClient.sendRequest(
    apiCall({ endpoint: API_SAVE_PRIHLASKA, request: { id, rok: 2018 }, token })
  );
  expect(response).toMatchSnapshot();
});

it('savePrihlaska [not authenticated]', async () => {
  const { requestId, ...response } = await wsClient.sendRequest(
    apiCall({ endpoint: API_SAVE_PRIHLASKA })
  );
  expect(response).toMatchSnapshot();
});
