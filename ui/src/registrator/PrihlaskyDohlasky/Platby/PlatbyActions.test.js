import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { addValidatedPlatba as genericAddValidatedPlatba } from './PlatbyActions';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);
const addValidatedPlatba = genericAddValidatedPlatba('PRIHLASKY', 'prihlasky');

it('addValidatedPlatba() should dispatch two successful actions', async () => {
  const store = mockStore({
    registrator: {
      prihlasky: {
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
  expect(actions[0]).toEqual({ type: 'PRIHLASKY_NOVA_PLATBA_VALIDATE' });
  expect(actions[1]).toEqual({
    type: 'PRIHLASKY_ADD_PLATBA',
    platba: {
      castka: 200,
      datum: '2018-05-12T00:00:00Z',
      typ: 'převodem'
    }
  });
});

it('addValidatedPlatba() should dispatch only one action on error', async () => {
  const store = mockStore({
    registrator: {
      prihlasky: {
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
  expect(actions[0]).toEqual({ type: 'PRIHLASKY_NOVA_PLATBA_VALIDATE' });
});
