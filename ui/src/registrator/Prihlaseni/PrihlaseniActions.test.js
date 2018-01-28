import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import WsClient from '../../WsClient';
import { saveUcast } from './PrihlaseniActions';

const successfulResponseSaveUdaje = {
  code: 'ok',
  response: {
    id: '===id==='
  },
  requestId: '0.9310306652587377'
};

const successfulResponseSavePrihlaska = {
  code: 'ok',
  requestId: '0.9310306652587377'
};

const unsuccessfulResponse = {
  code: 'unfulfilled request',
  status: 'A strange error occurred.'
};

const authTokenInvalidResponse = {
  code: 'authentication token invalid',
  status: 'Neplatný ověřovací token.'
};

let responseNumber;
beforeEach(() => {
  responseNumber = 0;
});

const mockWsClient = new WsClient();
let responses = [];
// eslint-disable-next-line no-plusplus
mockWsClient.sendRequest = async () => responses[responseNumber++];

const middlewares = [thunk.withExtraArgument(mockWsClient)];
const mockStore = configureStore(middlewares);

it('saveUcast() should dispatch four successful actions', async () => {
  responses = [successfulResponseSaveUdaje, successfulResponseSavePrihlaska];
  const store = mockStore({
    auth: { token: '===token===' },
    registrator: { prihlaseni: { validateForm: false, udaje: { narozeni: {} }, prihlaska: {} } }
  });

  await store.dispatch(saveUcast());
  const actions = store.getActions();
  expect(actions[0]).toEqual({ type: 'PRIHLASENI_VALIDATE_FORM' });
  expect(actions[1]).toEqual({ type: 'PRIHLASENI_SAVE_REQUEST' });
  expect(actions[2]).toEqual(
    expect.objectContaining({
      id: '===id===',
      type: 'PRIHLASENI_SAVE_SUCCESS'
    })
  );
  expect(actions[3]).toEqual({ type: 'PRIHLASENI_SAVE_SHOW_MODAL' });
});

it('saveUcast() should dispatch two unsuccessful actions 1/2', async () => {
  responses = [unsuccessfulResponse, unsuccessfulResponse];
  const store = mockStore({
    auth: { token: '===token===' },
    registrator: { prihlaseni: { udaje: { narozeni: {} }, prihlaska: {} } }
  });

  await store.dispatch(saveUcast());
  const actions = store.getActions();
  expect(actions[0]).toEqual({ type: 'PRIHLASENI_VALIDATE_FORM' });
  expect(actions[1]).toEqual({ type: 'PRIHLASENI_SAVE_REQUEST' });
  expect(actions[2]).toEqual(
    expect.objectContaining({
      type: 'PRIHLASENI_SAVE_ERROR',
      code: 'unfulfilled request',
      status: 'A strange error occurred.'
    })
  );
});

it('saveUcast() should dispatch two unsuccessful actions 2/2', async () => {
  responses = [successfulResponseSaveUdaje, unsuccessfulResponse];
  const store = mockStore({
    auth: { token: '===token===' },
    registrator: { prihlaseni: { udaje: { narozeni: {} }, prihlaska: {} } }
  });

  await store.dispatch(saveUcast());
  const actions = store.getActions();
  expect(actions[0]).toEqual({ type: 'PRIHLASENI_VALIDATE_FORM' });
  expect(actions[1]).toEqual({ type: 'PRIHLASENI_SAVE_REQUEST' });
  expect(actions[2]).toEqual(
    expect.objectContaining({
      type: 'PRIHLASENI_SAVE_ERROR',
      code: 'unfulfilled request',
      status: 'A strange error occurred.'
    })
  );
});

it('saveUcast() should dispatch two unsuccessful actions on an invalid token', async () => {
  responses = [authTokenInvalidResponse, unsuccessfulResponse];
  const store = mockStore({
    auth: { token: '===token===' },
    registrator: { prihlaseni: { udaje: { narozeni: {} }, prihlaska: {} } }
  });

  await store.dispatch(saveUcast());
  const actions = store.getActions();
  expect(actions[0]).toEqual({ type: 'PRIHLASENI_VALIDATE_FORM' });
  expect(actions[1]).toEqual({ type: 'PRIHLASENI_SAVE_REQUEST' });
  expect(actions[2]).toEqual(
    expect.objectContaining({
      type: 'SIGN_IN_ERROR',
      code: 'authentication token invalid',
      status: 'Platnost ověřovacího tokenu pravděpodobně vypršela. Neplatný ověřovací token.'
    })
  );
});

it('saveUcast() should dispatch validation error', async () => {
  responses = [successfulResponseSaveUdaje, successfulResponseSavePrihlaska];
  const store = mockStore({
    auth: { token: '===token===' },
    registrator: { prihlaseni: { validateForm: true, udaje: { narozeni: {} }, prihlaska: {} } }
  });

  await store.dispatch(saveUcast());
  const actions = store.getActions();
  expect(actions[0]).toEqual({ type: 'PRIHLASENI_VALIDATE_FORM' });
  expect(actions[1]).toEqual({
    type: 'PRIHLASENI_FORM_INVALID',
    code: 'nejde uložit',
    status: 'Přihláška nejde uložit. Povinná pole nejsou vyplněna.'
  });
});

/* Beware: overrides mockWsClient.sendRequest! */
it('saveUcast() should dispatch two unsuccessful actions on error', async () => {
  mockWsClient.sendRequest = async () => Promise.reject(new Error('Parse error!'));
  const store = mockStore({
    auth: { token: '===token===' },
    registrator: { prihlaseni: { udaje: { narozeni: {} }, prihlaska: {} } }
  });

  await store.dispatch(saveUcast());
  const actions = store.getActions();
  expect(actions[0]).toEqual({ type: 'PRIHLASENI_VALIDATE_FORM' });
  expect(actions[1]).toEqual({ type: 'PRIHLASENI_SAVE_REQUEST' });
  expect(actions[2]).toEqual(
    expect.objectContaining({
      type: 'PRIHLASENI_SAVE_ERROR',
      code: 'internal error',
      err: new Error('Parse error!')
    })
  );
});

/* Beware: overrides mockWsClient.sendRequest! */
it('saveUcast() should use auth token if available', async () => {
  const tokenSent = { tokenSent: false };
  mockWsClient.sendRequest = async token => {
    if (token) {
      tokenSent.tokenSent = true;
    }
  };
  const store = mockStore({
    auth: { token: '===token===' },
    registrator: { prihlaseni: { udaje: { narozeni: {} }, prihlaska: {} } }
  });

  await store.dispatch(saveUcast());
  expect(tokenSent.tokenSent).toBe(true);
});
