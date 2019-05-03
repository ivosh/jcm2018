import { API_FIND_ALL_STOPKY } from 'ui-common/common';
import { WS_API } from 'ui-common/store/wsAPI';

const normalize = ({ request, response: { response: byTypy } }) => ({
  request,
  response: { byTypy, typy: Object.keys(byTypy).sort() }
});

// Use cached value if: not connected or not invalidated.
const takeFromCache = ({ connected, entities: { stopky } }) =>
  stopky && stopky.typy && stopky.typy.length > 0 && (!connected || !stopky.invalidated);

export const FETCH_STOPKY = 'FETCH_STOPKY';
export const fetchStopky = () => ({
  [WS_API]: {
    type: FETCH_STOPKY,
    endpoint: API_FIND_ALL_STOPKY,
    normalize,
    takeFromCache,
    title: 'načítání stopek'
  }
});

export const broadcastStopky = json => ({
  type: 'BROADCAST_STOPKY',
  data: json,
  receivedAt: Date.now()
});
