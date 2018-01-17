import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import WsClient from '../../WsClient';
import { saveUcast } from './PrihlaseniActions';

const mockWsClient = new WsClient();
mockWsClient.sendRequest = null;

const successfulResponse = {
  code: 'ok',
  response: {
    id: '===id===',
    startCislo: 23
  },
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

const middlewares = [thunk.withExtraArgument(mockWsClient)];
const mockStore = configureStore(middlewares);

it('saveUcast() should dispatch three successful actions', async () => {
  mockWsClient.sendRequest = async () => successfulResponse;
  const store = mockStore({
    auth: { token: '===token===' },
    registrator: { prihlaseni: { validateEmpty: false, udaje: {}, prihlaska: {} } }
  });

  await store.dispatch(saveUcast());
  const actions = store.getActions();
  expect(actions[0]).toEqual({ type: 'PRIHLASENI_VALIDATE_EMPTY' });
  expect(actions[1]).toEqual({ type: 'PRIHLASENI_SAVE_REQUEST' });
  expect(actions[2]).toEqual(
    expect.objectContaining({
      id: '===id===',
      startCislo: 23,
      type: 'PRIHLASENI_SAVE_SUCCESS'
    })
  );
});

it('saveUcast() should use auth token if available', async () => {
  const tokenSent = { tokenSent: false };
  mockWsClient.sendRequest = async token => {
    if (token) {
      tokenSent.tokenSent = true;
    }
  };
  const store = mockStore({
    auth: { token: '===token===' },
    registrator: { prihlaseni: { udaje: {}, prihlaska: {} } }
  });

  await store.dispatch(saveUcast());
  expect(tokenSent.tokenSent).toBe(true);
});

it('saveUcast() should dispatch two unsuccessful actions', async () => {
  mockWsClient.sendRequest = async () => unsuccessfulResponse;
  const store = mockStore({
    auth: { token: '===token===' },
    registrator: { prihlaseni: { udaje: {}, prihlaska: {} } }
  });

  await store.dispatch(saveUcast());
  const actions = store.getActions();
  expect(actions[0]).toEqual({ type: 'PRIHLASENI_VALIDATE_EMPTY' });
  expect(actions[1]).toEqual({ type: 'PRIHLASENI_SAVE_REQUEST' });
  expect(actions[2]).toEqual(
    expect.objectContaining({
      type: 'PRIHLASENI_SAVE_ERROR',
      code: 'unfulfilled request',
      status: 'A strange error occurred.'
    })
  );
});

it('saveUcast() should dispatch two unsuccessful actions on error', async () => {
  mockWsClient.sendRequest = async () => Promise.reject(new Error('Parse error!'));
  const store = mockStore({
    auth: { token: '===token===' },
    registrator: { prihlaseni: { udaje: {}, prihlaska: {} } }
  });

  await store.dispatch(saveUcast());
  const actions = store.getActions();
  expect(actions[0]).toEqual({ type: 'PRIHLASENI_VALIDATE_EMPTY' });
  expect(actions[1]).toEqual({ type: 'PRIHLASENI_SAVE_REQUEST' });
  expect(actions[2]).toEqual(
    expect.objectContaining({
      type: 'PRIHLASENI_SAVE_ERROR',
      code: 'internal error',
      err: new Error('Parse error!')
    })
  );
});

it('saveUcast() should dispatch two unsuccessful actions on invalid token', async () => {
  mockWsClient.sendRequest = async () => authTokenInvalidResponse;
  const store = mockStore({
    auth: { token: '===token===' },
    registrator: { prihlaseni: { udaje: {}, prihlaska: {} } }
  });

  await store.dispatch(saveUcast());
  const actions = store.getActions();
  expect(actions[0]).toEqual({ type: 'PRIHLASENI_VALIDATE_EMPTY' });
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
  mockWsClient.sendRequest = async () => successfulResponse;
  const store = mockStore({
    auth: { token: '===token===' },
    registrator: { prihlaseni: { validateEmpty: true, udaje: {}, prihlaska: {} } }
  });

  await store.dispatch(saveUcast());
  const actions = store.getActions();
  expect(actions[0]).toEqual({ type: 'PRIHLASENI_VALIDATE_EMPTY' });
  expect(actions[1]).toEqual({
    type: 'PRIHLASENI_FORM_INVALID',
    code: 'nejde uložit',
    status: 'Přihláška nejde uložit. Povinná pole nejsou vyplněna.'
  });
});
