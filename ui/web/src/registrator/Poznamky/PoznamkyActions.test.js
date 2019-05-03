import configureStore from 'redux-mock-store';
import WsClient from 'ui-common/WsClient';
import wsAPI from 'ui-common/store/wsAPI';
import { AKTUALNI_ROK } from '../../constants';
import ucastniciTestData from '../../entities/ucastnici/ucastniciTestData';
import {
  POZNAMKA_ADD,
  POZNAMKA_DELETE,
  POZNAMKA_MODIFY,
  addPoznamka,
  deletePoznamka,
  modifyPoznamka
} from './PoznamkyActions';

const unsuccessfulResponse = {
  code: 'unfulfilled request',
  status: 'A strange error occurred.'
};

const mockWsClient = new WsClient();

const middlewares = [wsAPI.withExtraArgument(mockWsClient)];
const mockStore = configureStore(middlewares);

it('addPoznamka() should dispatch two successful actions', async () => {
  const poznamka = { datum: '2019-04-06T08:12:45.455Z', text: "it's a kind of magic" };
  const response = {
    code: 'ok',
    response: {
      poznamky: [poznamka]
    },
    status: 'uloženo v pořádku',
    requestId: '0.9310306652587377'
  };

  mockWsClient.sendRequest = async () => response;
  const store = mockStore({ ...ucastniciTestData, auth: { token: '===token===' } });
  await store.dispatch(addPoznamka({ id: '7a09b1fd371dec1e99b7e142', poznamka }));

  const request = { id: '7a09b1fd371dec1e99b7e142', poznamka, rok: AKTUALNI_ROK };
  const actions = store.getActions();
  expect(actions[0]).toEqual({
    type: `${POZNAMKA_ADD}_REQUEST`,
    request,
    receivedAt: expect.any(Number)
  });
  expect(actions[1]).toEqual({
    type: `${POZNAMKA_ADD}_SUCCESS`,
    request,
    response: {
      code: 'ok',
      status: 'uloženo v pořádku',
      poznamky: [poznamka]
    },
    title: 'přidávání poznámky',
    receivedAt: expect.any(Number)
  });
});

it('addPoznamka() should dispatch two unsuccessful actions', async () => {
  mockWsClient.sendRequest = async () => unsuccessfulResponse;
  const store = mockStore({ ...ucastniciTestData, auth: { token: '===token===' } });

  const poznamka = { datum: '2019-04-06T08:12:45.455Z', text: "it's a kind of magic" };
  await store.dispatch(
    addPoznamka({
      id: '7a09b1fd371dec1e99b7e142',
      poznamka: { ...poznamka, datum: new Date(poznamka.datum) }
    })
  );

  const request = { id: '7a09b1fd371dec1e99b7e142', poznamka, rok: AKTUALNI_ROK };
  const actions = store.getActions();
  expect(actions[0]).toEqual({
    type: `${POZNAMKA_ADD}_REQUEST`,
    request,
    receivedAt: expect.any(Number)
  });
  expect(actions[1]).toEqual({
    type: `${POZNAMKA_ADD}_ERROR`,
    request,
    response: {
      code: 'unfulfilled request',
      status: 'A strange error occurred.'
    },
    title: 'přidávání poznámky',
    receivedAt: expect.any(Number)
  });
});

it('deletePoznamka() should dispatch two successful actions', async () => {
  const response = {
    code: 'ok',
    response: {
      poznamky: []
    },
    status: 'uloženo v pořádku',
    requestId: '0.9310306652587377'
  };

  mockWsClient.sendRequest = async () => response;
  const store = mockStore({ ...ucastniciTestData, auth: { token: '===token===' } });
  await store.dispatch(deletePoznamka({ id: '7a09b1fd371dec1e99b7e142', index: 0 }));

  const request = { id: '7a09b1fd371dec1e99b7e142', index: 0, rok: AKTUALNI_ROK };
  const actions = store.getActions();
  expect(actions[0]).toEqual({
    type: `${POZNAMKA_DELETE}_REQUEST`,
    request,
    receivedAt: expect.any(Number)
  });
  expect(actions[1]).toEqual({
    type: `${POZNAMKA_DELETE}_SUCCESS`,
    request,
    response: {
      code: 'ok',
      status: 'uloženo v pořádku',
      poznamky: []
    },
    title: 'mazání poznámky',
    receivedAt: expect.any(Number)
  });
});

it('deletePoznamka() should dispatch two unsuccessful actions', async () => {
  mockWsClient.sendRequest = async () => unsuccessfulResponse;
  const store = mockStore({ ...ucastniciTestData, auth: { token: '===token===' } });

  await store.dispatch(deletePoznamka({ id: '7a09b1fd371dec1e99b7e142', index: 0 }));

  const request = { id: '7a09b1fd371dec1e99b7e142', index: 0, rok: AKTUALNI_ROK };
  const actions = store.getActions();
  expect(actions[0]).toEqual({
    type: `${POZNAMKA_DELETE}_REQUEST`,
    request,
    receivedAt: expect.any(Number)
  });
  expect(actions[1]).toEqual({
    type: `${POZNAMKA_DELETE}_ERROR`,
    request,
    response: {
      code: 'unfulfilled request',
      status: 'A strange error occurred.'
    },
    title: 'mazání poznámky',
    receivedAt: expect.any(Number)
  });
});

it('modifyPoznamka() should dispatch two successful actions', async () => {
  const poznamka = { datum: '2019-04-06T08:12:45.455Z', text: "it's a kind of magic" };
  const response = {
    code: 'ok',
    response: {
      poznamky: [poznamka]
    },
    status: 'uloženo v pořádku',
    requestId: '0.9310306652587377'
  };

  mockWsClient.sendRequest = async () => response;
  const store = mockStore({ ...ucastniciTestData, auth: { token: '===token===' } });
  await store.dispatch(modifyPoznamka({ id: '7a09b1fd371dec1e99b7e142', index: 0, poznamka }));

  const request = { id: '7a09b1fd371dec1e99b7e142', index: 0, poznamka, rok: AKTUALNI_ROK };
  const actions = store.getActions();
  expect(actions[0]).toEqual({
    type: `${POZNAMKA_MODIFY}_REQUEST`,
    request,
    receivedAt: expect.any(Number)
  });
  expect(actions[1]).toEqual({
    type: `${POZNAMKA_MODIFY}_SUCCESS`,
    request,
    response: {
      code: 'ok',
      status: 'uloženo v pořádku',
      poznamky: [poznamka]
    },
    title: 'ukládání poznámky',
    receivedAt: expect.any(Number)
  });
});

it('modifyPoznamka() should dispatch two unsuccessful actions', async () => {
  mockWsClient.sendRequest = async () => unsuccessfulResponse;
  const store = mockStore({ ...ucastniciTestData, auth: { token: '===token===' } });

  const poznamka = { datum: '2019-04-06T08:12:45.455Z', text: "it's a kind of magic" };
  await store.dispatch(
    modifyPoznamka({
      id: '7a09b1fd371dec1e99b7e142',
      index: 0,
      poznamka: { ...poznamka, datum: new Date(poznamka.datum) }
    })
  );

  const request = { id: '7a09b1fd371dec1e99b7e142', index: 0, poznamka, rok: AKTUALNI_ROK };
  const actions = store.getActions();
  expect(actions[0]).toEqual({
    type: `${POZNAMKA_MODIFY}_REQUEST`,
    request,
    receivedAt: expect.any(Number)
  });
  expect(actions[1]).toEqual({
    type: `${POZNAMKA_MODIFY}_ERROR`,
    request,
    response: {
      code: 'unfulfilled request',
      status: 'A strange error occurred.'
    },
    title: 'ukládání poznámky',
    receivedAt: expect.any(Number)
  });
});
