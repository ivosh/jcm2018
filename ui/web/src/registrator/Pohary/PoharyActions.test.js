import configureStore from 'redux-mock-store';
import WsClient from 'ui-common/WsClient';
import wsAPI from 'ui-common/store/wsAPI';
import ucastniciTestData from '../../entities/ucastnici/ucastniciTestData';
import { POHAR_PREDAN, poharPredan } from './PoharyActions';

const successfulResponse = {
  code: 'ok',
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

it('poharPredan() should dispatch two successful actions', async () => {
  const store = mockStore({ ...ucastniciTestData, auth: { token: '===token===' } });

  await store.dispatch(poharPredan({ id: 'f5c88400190a4bed88c76736' }));
  const request = { id: 'f5c88400190a4bed88c76736' };

  const actions = store.getActions();
  expect(actions[0]).toEqual({
    type: `${POHAR_PREDAN}_REQUEST`,
    request,
    receivedAt: expect.any(Number)
  });
  expect(actions[1]).toEqual({
    type: `${POHAR_PREDAN}_SUCCESS`,
    request,
    response: {
      code: 'ok',
      status: 'uloženo v pořádku'
    },
    title: 'předávání poháru',
    receivedAt: expect.any(Number)
  });
});

/* Beware: overrides mockWsClient.sendRequest! */
it('modifyUbytovani() should dispatch two unsuccessful actions', async () => {
  mockWsClient.sendRequest = async () => unsuccessfulResponse;
  const store = mockStore({ ...ucastniciTestData, auth: { token: '===token===' } });

  await store.dispatch(poharPredan({ id: 'f5c88400190a4bed88c76736' }));
  const request = { id: 'f5c88400190a4bed88c76736' };

  const actions = store.getActions();
  expect(actions[0]).toEqual({
    type: `${POHAR_PREDAN}_REQUEST`,
    request,
    receivedAt: expect.any(Number)
  });
  expect(actions[1]).toEqual({
    type: `${POHAR_PREDAN}_ERROR`,
    request,
    response: {
      code: 'unfulfilled request',
      status: 'A strange error occurred.'
    },
    title: 'předávání poháru',
    receivedAt: expect.any(Number)
  });
});
