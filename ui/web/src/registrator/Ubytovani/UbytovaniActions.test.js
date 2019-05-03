import configureStore from 'redux-mock-store';
import { UBYTOVANI_PRIHLASIT, UBYTOVANI_ODHLASIT } from 'ui-common/common';
import WsClient from 'ui-common/WsClient';
import { AKTUALNI_ROK } from '../../constants';
import ucastniciTestData from '../../entities/ucastnici/ucastniciTestData';
import wsAPI from '../../store/wsAPI';
import { MODIFY_UBYTOVANI, modifyUbytovani } from './UbytovaniActions';

const successfulResponse = {
  code: 'ok',
  response: {
    ubytovani: {
      pátek: {
        prihlaseno: true
      }
    }
  },
  status: 'uloženo v pořádku',
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

it('modifyUbytovani() should dispatch two successful actions', async () => {
  const store = mockStore({ ...ucastniciTestData, auth: { token: '===token===' } });

  await store.dispatch(
    modifyUbytovani({
      den: 'pátek',
      id: '7a09b1fd371dec1e99b7e142',
      modifikace: UBYTOVANI_PRIHLASIT
    })
  );
  const request = {
    den: 'pátek',
    id: '7a09b1fd371dec1e99b7e142',
    modifikace: 'přihlásit',
    rok: AKTUALNI_ROK
  };

  const actions = store.getActions();
  expect(actions[0]).toEqual({
    type: `${MODIFY_UBYTOVANI}_REQUEST`,
    request,
    receivedAt: expect.any(Number)
  });
  expect(actions[1]).toEqual({
    type: `${MODIFY_UBYTOVANI}_SUCCESS`,
    request,
    response: {
      code: 'ok',
      status: 'uloženo v pořádku',
      ubytovani: { pátek: { prihlaseno: true } }
    },
    title: 'ukládání ubytování',
    receivedAt: expect.any(Number)
  });
});

/* Beware: overrides mockWsClient.sendRequest! */
it('modifyUbytovani() should dispatch two unsuccessful actions', async () => {
  mockWsClient.sendRequest = async () => unsuccessfulResponse;
  const store = mockStore({ ...ucastniciTestData, auth: { token: '===token===' } });

  await store.dispatch(
    modifyUbytovani({
      den: 'sobota',
      id: '7a09b1fd371dec1e99b7e142',
      modifikace: UBYTOVANI_ODHLASIT
    })
  );
  const request = {
    den: 'sobota',
    id: '7a09b1fd371dec1e99b7e142',
    modifikace: 'odhlásit',
    rok: AKTUALNI_ROK
  };

  const actions = store.getActions();
  expect(actions[0]).toEqual({
    type: `${MODIFY_UBYTOVANI}_REQUEST`,
    request,
    receivedAt: expect.any(Number)
  });
  expect(actions[1]).toEqual({
    type: `${MODIFY_UBYTOVANI}_ERROR`,
    request,
    response: {
      code: 'unfulfilled request',
      status: 'A strange error occurred.'
    },
    title: 'ukládání ubytování',
    receivedAt: expect.any(Number)
  });
});
