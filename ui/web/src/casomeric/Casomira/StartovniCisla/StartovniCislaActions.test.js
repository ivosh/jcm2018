import configureStore from 'redux-mock-store';
import WsClient from 'ui-common/WsClient';
import { AKTUALNI_ROK } from '../../../constants';
import wsAPI from '../../../store/wsAPI';
import ucastniciTestData from '../../../entities/ucastnici/ucastniciTestData';
import {
  CASOMIRA_SAVE_VYKON,
  createDropAction,
  saveVykon,
  startCisloNaTrase
} from './StartovniCislaActions';

const successfulResponse = {
  code: 'ok',
  response: {
    id: '===id==='
  },
  requestId: '0.9310306652587377'
};

const unsuccessfulResponse = {
  code: 'unfulfilled request',
  status: 'A strange error occurred.'
};

const mockWsClient = new WsClient();
mockWsClient.sendRequest = async () => successfulResponse;

const middlewares = [wsAPI.withExtraArgument(mockWsClient)];
const mockStore = configureStore(middlewares);

it('createDropAction() - nedokonceno should dispatch two successful actions', async () => {
  const store = mockStore({ ...ucastniciTestData, auth: { token: '===token===' } });

  await store.dispatch(
    createDropAction({
      source: { id: '7a09b1fd371dec1e99b7e142', startCislo: 11 },
      destination: { name: 'nedokonceno', typ: 'půlmaraton' }
    })
  );
  const request = {
    id: '7a09b1fd371dec1e99b7e142',
    rok: AKTUALNI_ROK,
    startCislo: 11,
    typ: 'půlmaraton',
    vykon: { dokonceno: false, kategorie: expect.any(String), startCislo: 11 }
  };

  const actions = store.getActions();
  expect(actions[0]).toEqual({
    type: `${CASOMIRA_SAVE_VYKON}_REQUEST`,
    request,
    receivedAt: expect.any(Number)
  });
  expect(actions[1]).toEqual({
    type: `${CASOMIRA_SAVE_VYKON}_SUCCESS`,
    request,
    response: { code: 'ok', requestId: expect.any(String), response: { id: '===id===' } },
    title: 'ukládání registrace na start',
    receivedAt: expect.any(Number)
  });
});

it('createDropAction() - na-trase should dispatch two successful actions', async () => {
  const store = mockStore({ ...ucastniciTestData, auth: { token: '===token===' } });

  await store.dispatch(
    createDropAction({
      source: { id: '7a09b1fd371dec1e99b7e142', startCislo: 11 },
      destination: { name: 'na-trase', typ: 'půlmaraton' }
    })
  );
  const request = {
    id: '7a09b1fd371dec1e99b7e142',
    rok: AKTUALNI_ROK,
    startCislo: 11,
    typ: 'půlmaraton',
    vykon: { dokonceno: null, kategorie: expect.any(String), startCislo: 11 }
  };

  const actions = store.getActions();
  expect(actions[0]).toEqual({
    type: `${CASOMIRA_SAVE_VYKON}_REQUEST`,
    request,
    receivedAt: expect.any(Number)
  });
  expect(actions[1]).toEqual({
    type: `${CASOMIRA_SAVE_VYKON}_SUCCESS`,
    request,
    response: { code: 'ok', requestId: expect.any(String), response: { id: '===id===' } },
    title: 'ukládání registrace na start',
    receivedAt: expect.any(Number)
  });
});

it('createDropAction() - dokonceno should dispatch two successful actions', async () => {
  const store = mockStore({ ...ucastniciTestData, auth: { token: '===token===' } });

  await store.dispatch(
    createDropAction({
      source: { id: '7a09b1fd371dec1e99b7e142', startCislo: 11 },
      destination: { cas: 'PT1H23M32.56S', name: 'dokonceno', typ: 'půlmaraton' }
    })
  );
  const request = {
    id: '7a09b1fd371dec1e99b7e142',
    rok: AKTUALNI_ROK,
    startCislo: 11,
    typ: 'půlmaraton',
    vykon: { cas: 'PT1H23M32.56S', dokonceno: true, kategorie: expect.any(String), startCislo: 11 }
  };

  const actions = store.getActions();
  expect(actions[0]).toEqual({
    type: `${CASOMIRA_SAVE_VYKON}_REQUEST`,
    request,
    receivedAt: expect.any(Number)
  });
  expect(actions[1]).toEqual({
    type: `${CASOMIRA_SAVE_VYKON}_SUCCESS`,
    request,
    response: { code: 'ok', requestId: expect.any(String), response: { id: '===id===' } },
    title: 'ukládání registrace na start',
    receivedAt: expect.any(Number)
  });
});

/* Beware: overrides mockWsClient.sendRequest! */
it('saveVykon() should dispatch two unsuccessful actions', async () => {
  mockWsClient.sendRequest = async () => unsuccessfulResponse;
  const store = mockStore({ ...ucastniciTestData, auth: { token: '===token===' } });

  const id = '7a09b1fd371dec1e99b7e142';
  await store.dispatch(
    saveVykon({ action: startCisloNaTrase({ id }), id, startCislo: 11, typ: 'půlmaraton' })
  );
  const request = {
    id: '7a09b1fd371dec1e99b7e142',
    rok: AKTUALNI_ROK,
    startCislo: 11,
    typ: 'půlmaraton',
    vykon: expect.any(Object)
  };

  const actions = store.getActions();
  expect(actions[0]).toEqual({
    type: `${CASOMIRA_SAVE_VYKON}_REQUEST`,
    request,
    receivedAt: expect.any(Number)
  });
  expect(actions[1]).toEqual({
    type: `${CASOMIRA_SAVE_VYKON}_ERROR`,
    request,
    response: {
      code: 'unfulfilled request',
      status: 'A strange error occurred.'
    },
    title: 'ukládání registrace na start',
    receivedAt: expect.any(Number)
  });
});
