import configureStore from 'redux-mock-store';
import WsClient from 'ui-common/WsClient';
import wsAPI from '../../store/wsAPI';
import { FETCH_UCASTNICI, fetchUcastnici } from './ucastniciActions';

const mockWsClient = new WsClient();
mockWsClient.sendRequest = null;

const successfulResponse = {
  code: 'ok',
  response: {
    '6f09b1fd371dec1e99b7e1c9': {
      roky: [2016],
      2016: {
        udaje: {
          prijmeni: 'Sukdoláková',
          jmeno: 'Martina',
          narozeni: { rok: 1963 },
          pohlavi: 'žena',
          obec: 'Zlín',
          stat: 'Česká republika'
        },
        vykon: {
          kategorie: '5a71b1fd45754c1e99b7e1bc',
          startCislo: 11,
          dokonceno: true,
          cas: 'PT3H42M32.6S'
        }
      }
    },
    '5a09b1fd371dec1e99b7e1c9': {
      roky: [2018, 2017],
      2017: {
        udaje: {
          prijmeni: 'Balabák',
          jmeno: 'Roman',
          narozeni: { rok: 1956 },
          pohlavi: 'muž',
          obec: 'Ostrava 1',
          stat: 'Česká republika'
        },
        vykon: {
          kategorie: '5a71b1fd371dec1e99b7e1bc',
          startCislo: 34,
          dokonceno: true,
          cas: 'PT1H25M32.6S'
        }
      },
      2018: {
        udaje: {
          prijmeni: 'Balabák',
          jmeno: 'Roman',
          narozeni: { rok: 1956 },
          pohlavi: 'muž',
          obec: 'Ostrava 2',
          stat: 'Česká republika'
        },
        vykon: {
          kategorie: '5a71b1fd371dec1e99b7e1bc',
          startCislo: 15,
          dokonceno: false
        }
      }
    }
  },
  requestId: '0.9310306652587377'
};

const unsuccessfulResponse = {
  code: 'unfulfilled request',
  status: 'A strange error occurred.'
};

const middlewares = [wsAPI.withExtraArgument(mockWsClient)];
const mockStore = configureStore(middlewares);

it('fetchUcastnici() should not dispatch anything if účastníci cached', async () => {
  const store = mockStore({
    entities: { rocniky: { roky: [2011] }, ucastnici: { allIds: ['id1'], byIds: { id1: {} } } }
  });
  await store.dispatch(fetchUcastnici());
  expect(store.getActions()).toHaveLength(0);
});

it('fetchUcastnici() should dispatch two successful actions [ročníky cached]', async () => {
  mockWsClient.sendRequest = async () => successfulResponse;
  const store = mockStore({
    auth: { token: '===token===' },
    entities: { rocniky: { roky: [2011] } }
  });

  await store.dispatch(fetchUcastnici());
  const actions = store.getActions();
  expect(actions[0]).toEqual({
    type: `${FETCH_UCASTNICI}_REQUEST`,
    receivedAt: expect.any(Number)
  });
  expect(actions[1]).toEqual({
    type: `${FETCH_UCASTNICI}_SUCCESS`,
    response: {
      allIds: ['6f09b1fd371dec1e99b7e1c9', '5a09b1fd371dec1e99b7e1c9'],
      byIds: successfulResponse.response,
      code: 'ok'
    },
    title: 'načítání účastníků',
    receivedAt: expect.any(Number)
  });
});

it('fetchUcastnici() should dispatch two unsuccessful actions', async () => {
  mockWsClient.sendRequest = async () => unsuccessfulResponse;
  const store = mockStore({
    auth: { token: '===token===' },
    entities: { rocniky: { roky: [2011] } }
  });

  await store.dispatch(fetchUcastnici());
  const actions = store.getActions();
  expect(actions[0]).toEqual({
    type: `${FETCH_UCASTNICI}_REQUEST`,
    receivedAt: expect.any(Number)
  });
  expect(actions[1]).toEqual({
    type: `${FETCH_UCASTNICI}_ERROR`,
    response: {
      code: 'unfulfilled request',
      status: 'A strange error occurred.'
    },
    title: 'načítání účastníků',
    receivedAt: expect.any(Number)
  });
});

it('fetchUcastnici() should dispatch two unsuccessful actions on error', async () => {
  mockWsClient.sendRequest = async () => Promise.reject(new Error('Parse error!'));
  const store = mockStore({
    auth: { token: '===token===' },
    entities: { rocniky: { roky: [2011] } }
  });

  await store.dispatch(fetchUcastnici());
  const actions = store.getActions();
  expect(actions[0]).toEqual({
    type: `${FETCH_UCASTNICI}_REQUEST`,
    receivedAt: expect.any(Number)
  });
  expect(actions[1]).toEqual({
    type: `${FETCH_UCASTNICI}_ERROR`,
    error: 'Error: Parse error!',
    response: {
      code: 'internal error'
    },
    title: 'načítání účastníků',
    receivedAt: expect.any(Number)
  });
});
