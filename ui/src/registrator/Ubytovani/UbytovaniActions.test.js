import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import WsClient from '../../WsClient';
import ucastniciTestData from '../../entities/ucastnici/ucastniciTestData';
import { saveUbytovani } from './UbytovaniActions';

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

const middlewares = [thunk.withExtraArgument(mockWsClient)];
const mockStore = configureStore(middlewares);

it('saveUbytovani() should dispatch three successful actions', async () => {
  const store = mockStore({
    ...ucastniciTestData,
    auth: { token: '===token===' },
    registrator: { ubytovani: {} }
  });

  await store.dispatch(saveUbytovani({ akce: 'Přihlásit', id: '7a09b1fd371dec1e99b7e142' }));

  const actions = store.getActions();
  expect(actions[0]).toEqual(
    expect.objectContaining({
      id: '7a09b1fd371dec1e99b7e142',
      rok: 2018,
      type: 'UBYTOVANI_SAVE_REQUEST'
    })
  );
  expect(actions[1]).toEqual(
    expect.objectContaining({
      id: '7a09b1fd371dec1e99b7e142',
      rok: 2018,
      type: 'UBYTOVANI_SAVE_SUCCESS'
    })
  );
});

/* Beware: overrides mockWsClient.sendRequest! */
it('saveUbytovani() should dispatch two unsuccessful actions', async () => {
  mockWsClient.sendRequest = async () => unsuccessfulResponse;
  const store = mockStore({
    ...ucastniciTestData,
    auth: { token: '===token===' },
    registrator: { ubytovani: {} }
  });

  await store.dispatch(saveUbytovani({ akce: 'Odhlásit', id: '7a09b1fd371dec1e99b7e142' }));
  const actions = store.getActions();
  expect(actions[0]).toEqual(
    expect.objectContaining({
      id: '7a09b1fd371dec1e99b7e142',
      rok: 2018,
      type: 'UBYTOVANI_SAVE_REQUEST'
    })
  );
  expect(actions[1]).toEqual(
    expect.objectContaining({
      type: 'UBYTOVANI_SAVE_ERROR',
      code: 'unfulfilled request',
      status: 'A strange error occurred.'
    })
  );
});

/* Beware: overrides mockWsClient.sendRequest! */
it('saveUbytovani() should dispatch two unsuccessful actions on error', async () => {
  mockWsClient.sendRequest = async () => Promise.reject(new Error('Parse error!'));
  const store = mockStore({
    ...ucastniciTestData,
    auth: { token: '===token===' },
    registrator: { ubytovani: {} }
  });

  await store.dispatch(saveUbytovani({ akce: 'Přespáno', id: '5a09b1fd371dec1e99b7e1c9' }));
  const actions = store.getActions();
  expect(actions[0]).toEqual(
    expect.objectContaining({
      id: '5a09b1fd371dec1e99b7e1c9',
      rok: 2018,
      type: 'UBYTOVANI_SAVE_REQUEST'
    })
  );
  expect(actions[1]).toEqual(
    expect.objectContaining({
      type: 'UBYTOVANI_SAVE_ERROR',
      code: 'internal error',
      err: new Error('Parse error!')
    })
  );
});

/* Beware: overrides mockWsClient.sendRequest! */
it('saveUbytovani() should use auth token if available', async () => {
  const tokenSent = { tokenSent: false };
  mockWsClient.sendRequest = async token => {
    if (token) {
      tokenSent.tokenSent = true;
    }
  };
  const store = mockStore({
    ...ucastniciTestData,
    auth: { token: '===token===' },
    registrator: { ubytovani: {} }
  });

  await store.dispatch(saveUbytovani({ akce: 'Nepřespáno', id: '5a09b1fd371dec1e99b7e1c9' }));
  expect(tokenSent.tokenSent).toBe(true);
});
