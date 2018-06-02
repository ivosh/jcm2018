import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import ucastniciTestData from '../../../entities/ucastnici/ucastniciTestData';
import { createAddValidatedPlatba } from './PlatbyActions';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);
const actionPrefix = 'PRIHLASKY_YYY';
const reduxName = 'prihlasky_yyy';
const addValidatedPlatba = createAddValidatedPlatba(actionPrefix, reduxName);

it('addValidatedPlatba() should dispatch two successful actions', async () => {
  const store = mockStore({
    ...ucastniciTestData,
    registrator: {
      [reduxName]: {
        platby: {
          castka: '200',
          datum: '2018-05-12T00:00:00Z',
          typ: 'převodem',
          validate: false
        }
      }
    }
  });

  await store.dispatch(addValidatedPlatba());
  const actions = store.getActions();
  expect(actions[0]).toEqual({ type: `${actionPrefix}_NOVA_PLATBA_VALIDATE` });
  expect(actions[1]).toEqual({
    type: `${actionPrefix}_ADD_PLATBA`,
    platba: {
      castka: 200,
      datum: '2018-05-12T00:00:00Z',
      typ: 'převodem'
    }
  });
});

it('addValidatedPlatba() should dispatch only one action on error', async () => {
  const store = mockStore({
    ...ucastniciTestData,
    registrator: {
      [reduxName]: {
        platby: {
          castka: 'rozepsáno',
          datum: '2018-05-12T00:00:00Z',
          typ: 'převodem',
          validate: false
        }
      }
    }
  });

  await store.dispatch(addValidatedPlatba());
  const actions = store.getActions();
  expect(actions).toHaveLength(1);
  expect(actions[0]).toEqual({ type: `${actionPrefix}_NOVA_PLATBA_VALIDATE` });
});
