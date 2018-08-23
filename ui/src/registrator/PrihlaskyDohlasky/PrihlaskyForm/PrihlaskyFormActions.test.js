import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import WsClient from '../../../WsClient';
import { createSaveUcast } from './PrihlaskyFormActions';

const actionPrefix = 'PRIHLASKY_YYY';
const reduxName = 'prihlasky_yyy';
const saveUcast = createSaveUcast(actionPrefix, reduxName);

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

const authTokenInvalidResponse = {
  code: 'authentication token invalid',
  status: 'Neplatný ověřovací token.'
};

const mockWsClient = new WsClient();
let response;
mockWsClient.sendRequest = async () => response;

const middlewares = [thunk.withExtraArgument(mockWsClient)];
const mockStore = configureStore(middlewares);

it('saveUcast() should dispatch four successful actions (new účastník)', async () => {
  response = successfulResponse;
  const store = mockStore({
    auth: { token: '===token===' },
    entities: { rocniky: { byRoky: {} } },
    registrator: {
      [reduxName]: { form: { validate: false, udaje: { narozeni: {} }, prihlaska: {} } }
    }
  });

  await store.dispatch(saveUcast());
  const actions = store.getActions();
  expect(actions[0]).toEqual({ type: `${actionPrefix}_VALIDATE_FORM` });
  expect(actions[1]).toEqual({ type: `${actionPrefix}_SAVE_REQUEST` });
  expect(actions[2]).toEqual({
    type: `${actionPrefix}_SAVE_SUCCESS`,
    id: '===id===',
    rok: 2018,
    udaje: { narozeni: {} },
    prihlaska: {},
    platby: [],
    ubytovani: {},
    receivedAt: expect.any(Number)
  });
  expect(actions[3]).toEqual({ type: `${actionPrefix}_SAVE_SHOW_MODAL` });
});

it('saveUcast() should dispatch four successful actions (existing účastník, existing rok)', async () => {
  response = successfulResponse;
  const store = mockStore({
    auth: { token: '===token===' },
    entities: {
      rocniky: { byRoky: {} },
      ucastnici: {
        byIds: {
          '===id===': {
            roky: [2018],
            2018: {
              vykon: { kategorie: '===kat1===' }
            }
          }
        }
      }
    },
    registrator: {
      [reduxName]: {
        form: { ucastnikId: '===id===', validate: false, udaje: { narozeni: {} }, prihlaska: {} }
      }
    }
  });

  await store.dispatch(saveUcast());
  const actions = store.getActions();
  expect(actions[0]).toEqual({ type: `${actionPrefix}_VALIDATE_FORM` });
  expect(actions[1]).toEqual({ type: `${actionPrefix}_SAVE_REQUEST` });
  expect(actions[2]).toEqual({
    type: `${actionPrefix}_SAVE_SUCCESS`,
    id: '===id===',
    rok: 2018,
    udaje: { narozeni: {} },
    prihlaska: {},
    vykon: { kategorie: '===kat1===' },
    platby: [],
    ubytovani: {},
    receivedAt: expect.any(Number)
  });
  expect(actions[3]).toEqual({ type: `${actionPrefix}_SAVE_SHOW_MODAL` });
});

it('saveUcast() should dispatch four successful actions (existing účastník, different rok)', async () => {
  response = successfulResponse;
  const store = mockStore({
    auth: { token: '===token===' },
    entities: {
      rocniky: { byRoky: {} },
      ucastnici: {
        byIds: {
          '===id===': {
            roky: [2017],
            2017: {
              vykon: { kategorie: '===kat1===' }
            }
          }
        }
      }
    },
    registrator: {
      [reduxName]: {
        form: { ucastnikId: '===id===', validate: false, udaje: { narozeni: {} }, prihlaska: {} }
      }
    }
  });

  await store.dispatch(saveUcast());
  const actions = store.getActions();
  expect(actions[0]).toEqual({ type: `${actionPrefix}_VALIDATE_FORM` });
  expect(actions[1]).toEqual({ type: `${actionPrefix}_SAVE_REQUEST` });
  expect(actions[2]).toEqual({
    type: `${actionPrefix}_SAVE_SUCCESS`,
    id: '===id===',
    rok: 2018,
    udaje: { narozeni: {} },
    prihlaska: {},
    platby: [],
    ubytovani: {},
    receivedAt: expect.any(Number)
  });
  expect(actions[3]).toEqual({ type: `${actionPrefix}_SAVE_SHOW_MODAL` });
});

it('saveUcast() should dispatch two unsuccessful actions 1/2', async () => {
  response = unsuccessfulResponse;
  const store = mockStore({
    auth: { token: '===token===' },
    entities: { rocniky: { byRoky: {} } },
    registrator: { [reduxName]: { form: { udaje: { narozeni: {} }, prihlaska: {} } } }
  });

  await store.dispatch(saveUcast());
  const actions = store.getActions();
  expect(actions[0]).toEqual({ type: `${actionPrefix}_VALIDATE_FORM` });
  expect(actions[1]).toEqual({ type: `${actionPrefix}_SAVE_REQUEST` });
  expect(actions[2]).toEqual(
    expect.objectContaining({
      type: `${actionPrefix}_SAVE_ERROR`,
      code: 'unfulfilled request',
      status: 'A strange error occurred.'
    })
  );
});

global.crypto = { getRandomValues: arr => arr.fill(86) };

it('saveUcast() should dispatch two unsuccessful actions on an invalid token', async () => {
  response = authTokenInvalidResponse;
  const store = mockStore({
    auth: { token: '===token===' },
    entities: { rocniky: { byRoky: {} } },
    registrator: { [reduxName]: { form: { udaje: { narozeni: {} }, prihlaska: {} } } }
  });

  await store.dispatch(saveUcast());
  const actions = store.getActions();
  expect(actions[0]).toEqual({ type: `${actionPrefix}_VALIDATE_FORM` });
  expect(actions[1]).toEqual({ type: `${actionPrefix}_SAVE_REQUEST` });
  expect(actions[2]).toEqual({
    type: 'SIGN_IN_ERROR',
    request: {
      nonce: expect.any(String)
    },
    response: {
      code: 'authentication token invalid',
      status: 'Platnost ověřovacího tokenu pravděpodobně vypršela. Neplatný ověřovací token.'
    },
    title: 'přihlašování',
    receivedAt: expect.any(Number)
  });
});

it('saveUcast() should dispatch validation error', async () => {
  response = successfulResponse;
  const store = mockStore({
    auth: { token: '===token===' },
    entities: { rocniky: { byRoky: {} } },
    registrator: {
      [reduxName]: { form: { validate: true, udaje: { narozeni: {} }, prihlaska: {} } }
    }
  });

  await store.dispatch(saveUcast());
  const actions = store.getActions();
  expect(actions[0]).toEqual({ type: `${actionPrefix}_VALIDATE_FORM` });
  expect(actions[1]).toEqual({
    type: `${actionPrefix}_FORM_INVALID`,
    code: 'nejde uložit',
    errors: [
      { name: 'udaje.prijmeni', value: undefined },
      { name: 'udaje.jmeno', value: undefined },
      { name: 'udaje.narozeni', value: {} },
      { name: 'udaje.pohlavi', value: undefined },
      { name: 'udaje.obec', value: undefined },
      { name: 'udaje.stat', value: undefined },
      { name: 'prihlaska.datum', value: undefined },
      { name: 'prihlaska.kategorie', value: undefined },
      { name: 'prihlaska.typ', value: undefined }
    ],
    status: 'Přihláška nejde uložit. Povinná pole nejsou vyplněna.',
    title: 'vyplňování formuláře'
  });
});

/* Beware: overrides mockWsClient.sendRequest! */
it('saveUcast() should dispatch two unsuccessful actions on error', async () => {
  mockWsClient.sendRequest = async () => Promise.reject(new Error('Parse error!'));
  const store = mockStore({
    auth: { token: '===token===' },
    entities: { rocniky: { byRoky: {} } },
    registrator: { [reduxName]: { form: { udaje: { narozeni: {} }, prihlaska: {} } } }
  });

  await store.dispatch(saveUcast());
  const actions = store.getActions();
  expect(actions[0]).toEqual({ type: `${actionPrefix}_VALIDATE_FORM` });
  expect(actions[1]).toEqual({ type: `${actionPrefix}_SAVE_REQUEST` });
  expect(actions[2]).toEqual({
    type: `${actionPrefix}_SAVE_ERROR`,
    code: 'internal error',
    err: 'Error: Parse error!',
    receivedAt: expect.any(Number)
  });
});
