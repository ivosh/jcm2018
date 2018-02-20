import deepFreeze from 'deep-freeze';
import {
  fetchUcastniciRequest,
  fetchUcastniciSuccess
} from '../entities/ucastnici/ucastniciActions';
import appReducer from './appReducer';
import { websocketConnected, websocketDisconnected } from './AppActions';

it('na začátku', () => {
  const stateBefore = undefined;

  const stateAfter = appReducer(stateBefore, {});
  expect(stateAfter).toMatchSnapshot();
});

it('websocket connected', () => {
  const stateBefore = { connected: false };
  deepFreeze(stateBefore);

  const stateAfter = appReducer(stateBefore, websocketConnected());
  expect(stateAfter.connected).toEqual(true);
  expect(stateAfter).toMatchSnapshot();
});

it('websocket disconnected', () => {
  const stateBefore = { connected: true };
  deepFreeze(stateBefore);

  const stateAfter = appReducer(stateBefore, websocketDisconnected());
  expect(stateAfter.connected).toEqual(false);
  expect(stateAfter).toMatchSnapshot();
});

it('fetchUcastniciRequest()', () => {
  const stateBefore = { fetching: undefined };
  deepFreeze(stateBefore);

  const stateAfter = appReducer(stateBefore, fetchUcastniciRequest());
  expect(stateAfter.fetching).toEqual('fetching');
});

it('fetchUcastniciSuccess()', () => {
  const stateBefore = { fetching: 'fetching' };
  deepFreeze(stateBefore);

  const stateAfter = appReducer(stateBefore, fetchUcastniciSuccess({ response: {} }));
  expect(stateAfter.fetching).toEqual('done');
});
