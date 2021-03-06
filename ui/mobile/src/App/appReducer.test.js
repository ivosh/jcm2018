import deepFreeze from 'deep-freeze';
import { websocketConnected, websocketDisconnected } from '../ui-common/App/connectedActions';
import appReducer from './appReducer';

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

/* :TODO:
it('FETCH_UCASTNICI_REQUEST', () => {
  const stateBefore = { fetchingUcastnici: undefined };
  deepFreeze(stateBefore);

  const stateAfter = appReducer(stateBefore, createRequestFromAction({ action: fetchUcastnici() }));
  expect(stateAfter.fetchingUcastnici).toEqual('fetching');
});

it('FETCH_UCASTNICI_SUCCESS', () => {
  const stateBefore = { fetchingUcastnici: 'fetching' };
  deepFreeze(stateBefore);

  const stateAfter = appReducer(
    stateBefore,
    createSuccessFromAction({ action: fetchUcastnici(), response: { response: {} } })
  );
  expect(stateAfter.fetchingUcastnici).toEqual('done');
});

it('FETCH_STOPKY_REQUEST', () => {
  const stateBefore = { fetchingStopky: undefined };
  deepFreeze(stateBefore);

  const stateAfter = appReducer(stateBefore, createRequestFromAction({ action: fetchStopky() }));
  expect(stateAfter.fetchingStopky).toEqual('fetching');
});

it('FETCH_STOPKY_SUCCESS', () => {
  const stateBefore = { fetchingStopky: 'fetching' };
  deepFreeze(stateBefore);

  const stateAfter = appReducer(
    stateBefore,
    createSuccessFromAction({ action: fetchStopky(), response: { response: {} } })
  );
  expect(stateAfter.fetchingStopky).toEqual('done');
});
*/
