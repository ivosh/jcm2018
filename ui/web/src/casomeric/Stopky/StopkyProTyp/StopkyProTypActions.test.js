import configureStore from 'redux-mock-store';
import { API_MODIFY_STOPKY, STOPKY_START } from '../../../common';
import { WS_API } from '../../../store/wsAPI';
import { MODIFY_STOPKY, stopkyStart } from './StopkyProTypActions';

const state = {
  timesync: {
    offset: -42
  }
};
const mockStore = configureStore();

let store;
beforeEach(() => {
  store = mockStore(state);
  store.dispatch = jest.fn();
});

it('adds correctly time offset to "now"', () => {
  store.dispatch(stopkyStart({ now: new Date('2019-01-01T15:32:24.456Z'), typ: 'maraton' }));
  expect(store.dispatch).toHaveBeenCalledWith({
    [WS_API]: {
      type: MODIFY_STOPKY,
      endpoint: API_MODIFY_STOPKY,
      normalize: expect.any(Function),
      request: expect.any(Function),
      title: 'ukládání stopek'
    }
  });
  const { request } = store.dispatch.mock.calls[0][0][WS_API];
  expect(request(state)).toEqual({
    modifikace: STOPKY_START,
    now: '2019-01-01T15:32:24.414Z',
    typ: 'maraton'
  });
});
