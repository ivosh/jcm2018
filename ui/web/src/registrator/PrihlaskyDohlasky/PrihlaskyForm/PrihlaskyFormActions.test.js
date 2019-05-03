import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { CODE_OK } from 'ui-common/common';
import WsClient from 'ui-common/WsClient';
import wsAPI from 'ui-common/store/wsAPI';
import { AKTUALNI_ROK } from '../../../constants';
import { CREATE_PRIHLASKY_SAVE, createSaveUcast } from './PrihlaskyFormActions';

const actionPrefix = 'PRIHLASKY_YYY';
const reduxName = 'prihlasky_yyy';
const PRIHLASKY_YYY_SAVE = CREATE_PRIHLASKY_SAVE(actionPrefix);
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

const mockWsClient = new WsClient();
let response;
mockWsClient.sendRequest = async () => response;

const middlewares = [thunk.withExtraArgument(mockWsClient), wsAPI.withExtraArgument(mockWsClient)];
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
  const request = { rok: AKTUALNI_ROK, udaje: { narozeni: {} }, prihlaska: {} };

  await store.dispatch(saveUcast());
  const actions = store.getActions();
  expect(actions[0]).toEqual({ type: `${actionPrefix}_VALIDATE_FORM` });
  expect(actions[1]).toEqual({
    type: `${PRIHLASKY_YYY_SAVE}_REQUEST`,
    request,
    receivedAt: expect.any(Number)
  });
  expect(actions[2]).toEqual({
    type: `${PRIHLASKY_YYY_SAVE}_SUCCESS`,
    request,
    response: { code: CODE_OK, id: '===id===' },
    title: 'ukládání formuláře',
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
            roky: [AKTUALNI_ROK],
            [AKTUALNI_ROK]: {
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
  const request = {
    id: '===id===',
    rok: AKTUALNI_ROK,
    udaje: { narozeni: {} },
    prihlaska: {},
    vykon: { kategorie: '===kat1===' }
  };

  await store.dispatch(saveUcast());
  const actions = store.getActions();
  expect(actions[0]).toEqual({ type: `${actionPrefix}_VALIDATE_FORM` });
  expect(actions[1]).toEqual({
    type: `${PRIHLASKY_YYY_SAVE}_REQUEST`,
    request,
    receivedAt: expect.any(Number)
  });
  expect(actions[2]).toEqual({
    type: `${PRIHLASKY_YYY_SAVE}_SUCCESS`,
    request,
    response: { code: CODE_OK, id: '===id===' },
    title: 'ukládání formuláře',
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
  const request = { id: '===id===', rok: AKTUALNI_ROK, udaje: { narozeni: {} }, prihlaska: {} };

  await store.dispatch(saveUcast());
  const actions = store.getActions();
  expect(actions[0]).toEqual({ type: `${actionPrefix}_VALIDATE_FORM` });
  expect(actions[1]).toEqual({
    type: `${PRIHLASKY_YYY_SAVE}_REQUEST`,
    request,
    receivedAt: expect.any(Number)
  });
  expect(actions[2]).toEqual({
    type: `${PRIHLASKY_YYY_SAVE}_SUCCESS`,
    request,
    response: { code: CODE_OK, id: '===id===' },
    title: 'ukládání formuláře',
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
  const request = { rok: AKTUALNI_ROK, udaje: { narozeni: {} }, prihlaska: {} };

  await store.dispatch(saveUcast());
  const actions = store.getActions();
  expect(actions[0]).toEqual({ type: `${actionPrefix}_VALIDATE_FORM` });
  expect(actions[1]).toEqual({
    type: `${PRIHLASKY_YYY_SAVE}_REQUEST`,
    request,
    receivedAt: expect.any(Number)
  });
  expect(actions[2]).toEqual({
    type: `${PRIHLASKY_YYY_SAVE}_ERROR`,
    request,
    response: {
      code: 'unfulfilled request',
      status: 'A strange error occurred.'
    },
    title: 'ukládání formuláře',
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
  const request = { rok: AKTUALNI_ROK, udaje: { narozeni: {} }, prihlaska: {} };

  await store.dispatch(saveUcast());
  const actions = store.getActions();
  expect(actions[0]).toEqual({ type: `${actionPrefix}_VALIDATE_FORM` });
  expect(actions[1]).toEqual({
    type: `${PRIHLASKY_YYY_SAVE}_REQUEST`,
    request,
    receivedAt: expect.any(Number)
  });
  expect(actions[2]).toEqual({
    type: `${PRIHLASKY_YYY_SAVE}_ERROR`,
    error: 'Error: Parse error!',
    request,
    response: {
      code: 'internal error'
    },
    title: 'ukládání formuláře',
    receivedAt: expect.any(Number)
  });
});
