import { API_TIMESYNC } from 'ui-common/common';
import {
  TIMESYNC_LAST_SAMPLES,
  TIMESYNC_INITIAL_BURST_DELAY,
  TIMESYNC_OPERATIONAL_DELAY
} from '../constants';
import { WS_API } from '../store/wsAPI';

export const timesyncStart = () => ({ type: 'TIMESYNC_START' });
export const timesyncStop = () => ({ type: 'TIMESYNC_STOP' });

const normalize = ({
  request,
  response: {
    response: { now, serverTime } // 'now' from response used only for testing
  }
}) => ({ request, response: { now: now || new Date().toJSON(), serverTime } });

export const TIMESYNC = 'TIMESYNC';
export const timesync = () => ({
  [WS_API]: {
    type: TIMESYNC,
    dontUseToken: true,
    endpoint: API_TIMESYNC,
    normalize,
    request: { clientTime: new Date().toJSON() },
    title: 'synchronizace času'
  }
});

export const timesyncOperation = () => async (dispatch, getState) => {
  const {
    connected,
    timesync: { running, samples }
  } = getState();
  if (connected && running) {
    await dispatch(timesync());
    setTimeout(
      () => dispatch(timesyncOperation()),
      samples.length < TIMESYNC_LAST_SAMPLES
        ? TIMESYNC_INITIAL_BURST_DELAY
        : TIMESYNC_OPERATIONAL_DELAY
    );
  }
};
