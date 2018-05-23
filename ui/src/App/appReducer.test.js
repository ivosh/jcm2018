import deepFreeze from 'deep-freeze';
import { fetchStopkyRequest, fetchStopkySuccess } from '../entities/stopky/stopkyActions';
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
  const stateBefore = { fetchingUcastnici: undefined };
  deepFreeze(stateBefore);

  const stateAfter = appReducer(stateBefore, fetchUcastniciRequest());
  expect(stateAfter.fetchingUcastnici).toEqual('fetching');
});

it('fetchUcastniciSuccess()', () => {
  const stateBefore = { fetchingUcastnici: 'fetching' };
  deepFreeze(stateBefore);

  const stateAfter = appReducer(stateBefore, fetchUcastniciSuccess({ response: {} }));
  expect(stateAfter.fetchingUcastnici).toEqual('done');
});

it('fetchStopkyRequest()', () => {
  const stateBefore = { fetchingStopky: undefined };
  deepFreeze(stateBefore);

  const stateAfter = appReducer(stateBefore, fetchStopkyRequest());
  expect(stateAfter.fetchingStopky).toEqual('fetching');
});

it('fetchStopkySuccess()', () => {
  const stateBefore = { fetchingStopky: 'fetching' };
  deepFreeze(stateBefore);

  const stateAfter = appReducer(stateBefore, fetchStopkySuccess({ response: {} }));
  expect(stateAfter.fetchingStopky).toEqual('done');
});
