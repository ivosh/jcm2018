import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import WsClient from '../../WsClient';
import { fetchUcastnici } from './ucastniciActions';

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
          pohlavi: 'zena',
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
          pohlavi: 'muz',
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
          pohlavi: 'muz',
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

const middlewares = [thunk.withExtraArgument(mockWsClient)];
const mockStore = configureStore(middlewares);

it('fetchRocniky() should dispatch two successful actions [ročníky cached]', async () => {
  mockWsClient.sendRequest = async () => successfulResponse;
  const store = mockStore({ entities: { rocniky: { roky: [2011] } } });

  await store.dispatch(fetchUcastnici());
  const actions = store.getActions();
  expect(actions[0]).toEqual({ type: 'FETCH_UCASTNICI_REQUEST' });
  expect(actions[1]).toEqual(
    expect.objectContaining({
      data: {
        byIds: successfulResponse.response,
        allIds: ['6f09b1fd371dec1e99b7e1c9', '5a09b1fd371dec1e99b7e1c9']
      },
      type: 'FETCH_UCASTNICI_SUCCESS'
    })
  );
});

it('fetchUcastnici() should dispatch two unsuccessful actions', async () => {
  mockWsClient.sendRequest = async () => unsuccessfulResponse;
  const store = mockStore({ entities: { rocniky: { roky: [2011] } } });

  await store.dispatch(fetchUcastnici());
  const actions = store.getActions();
  expect(actions[0]).toEqual({ type: 'FETCH_UCASTNICI_REQUEST' });
  expect(actions[1]).toEqual(
    expect.objectContaining({
      type: 'FETCH_UCASTNICI_ERROR',
      code: 'unfulfilled request',
      status: 'A strange error occurred.'
    })
  );
});

it('fetchUcastnici() should dispatch two unsuccessful actions on error', async () => {
  mockWsClient.sendRequest = async () => Promise.reject(new Error('Parse error!'));
  const store = mockStore({ entities: { rocniky: { roky: [2011] } } });

  await store.dispatch(fetchUcastnici());
  const actions = store.getActions();
  expect(actions[0]).toEqual({ type: 'FETCH_UCASTNICI_REQUEST' });
  expect(actions[1]).toEqual(
    expect.objectContaining({
      type: 'FETCH_UCASTNICI_ERROR',
      code: 'internal error',
      err: new Error('Parse error!')
    })
  );
});
