import configureStore from 'redux-mock-store';
import WsClient from '../../WsClient';
import { UBYTOVANI_PRIHLASIT, UBYTOVANI_ODHLASIT } from '../../common';
import ucastniciTestData from '../../entities/ucastnici/ucastniciTestData';
import wsAPI from '../../store/wsAPI';
import { SAVE_UBYTOVANI, saveUbytovani } from './UbytovaniActions';

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

it('saveUbytovani() should dispatch two successful actions', async () => {
  const store = mockStore({
    ...ucastniciTestData,
    auth: { token: '===token===' },
    registrator: { ubytovani: {} }
  });

  await store.dispatch(
    saveUbytovani({ akce: UBYTOVANI_PRIHLASIT, id: '7a09b1fd371dec1e99b7e142' })
  );
  const request = {
    id: '7a09b1fd371dec1e99b7e142',
    rok: 2018,
    ubytovani: { pátek: { prihlaseno: true } }
  };

  const actions = store.getActions();
  expect(actions[0]).toEqual({
    type: `${SAVE_UBYTOVANI}_REQUEST`,
    request,
    receivedAt: expect.any(Number)
  });
  expect(actions[1]).toEqual({
    type: `${SAVE_UBYTOVANI}_SUCCESS`,
    request,
    response: { code: 'ok' },
    title: 'ukládání ubytování',
    receivedAt: expect.any(Number)
  });
});

/* Beware: overrides mockWsClient.sendRequest! */
it('saveUbytovani() should dispatch two unsuccessful actions', async () => {
  mockWsClient.sendRequest = async () => unsuccessfulResponse;
  const store = mockStore({
    ...ucastniciTestData,
    auth: { token: '===token===' },
    registrator: { ubytovani: {} }
  });

  await store.dispatch(saveUbytovani({ akce: UBYTOVANI_ODHLASIT, id: '7a09b1fd371dec1e99b7e142' }));
  const request = {
    id: '7a09b1fd371dec1e99b7e142',
    rok: 2018,
    ubytovani: {}
  };

  const actions = store.getActions();
  expect(actions[0]).toEqual({
    type: `${SAVE_UBYTOVANI}_REQUEST`,
    request,
    receivedAt: expect.any(Number)
  });
  expect(actions[1]).toEqual({
    type: `${SAVE_UBYTOVANI}_ERROR`,
    request,
    response: {
      code: 'unfulfilled request',
      status: 'A strange error occurred.'
    },
    title: 'ukládání ubytování',
    receivedAt: expect.any(Number)
  });
});
