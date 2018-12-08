import { API_TIMESYNC } from '../common';
import { WS_API } from '../store/wsAPI';

export const timesyncStart = () => ({ type: 'TIMESYNC_START' });
export const timesyncStop = () => ({ type: 'TIMESYNC_STOP' });

export const timesyncResponse = ({ clientTime, serverTime, now = new Date() }) => ({
  type: 'TIMESYNC_RESPONSE',
  clientTime: clientTime.toJSON ? clientTime.toJSON() : clientTime,
  now: now.toJSON ? now.toJSON() : now,
  serverTime: serverTime.toJSON ? serverTime.toJSON() : serverTime
});

const normalize = ({
  request,
  response: {
    response: { serverTime }
  }
}) => ({ request, response: { serverTime } });

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
