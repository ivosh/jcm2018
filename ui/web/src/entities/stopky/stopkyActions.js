import { API_FIND_ALL_STOPKY } from '../../common';
import { WS_API } from '../../store/wsAPI';

const normalize = ({ request, response: { response: byTypy } }) => ({
  request,
  response: { byTypy, typy: Object.keys(byTypy).sort() }
});

// Use cached value if: not connected or not invalidated.
const useCached = ({ connected, entities: { stopky } }) =>
  stopky && stopky.typy && stopky.typy.length > 0 && (!connected || !stopky.invalidated);

export const FETCH_STOPKY = 'FETCH_STOPKY';
export const fetchStopky = () => ({
  [WS_API]: {
    type: FETCH_STOPKY,
    endpoint: API_FIND_ALL_STOPKY,
    normalize,
    title: 'načítání stopek',
    useCached
  }
});

export const broadcastStopky = json => ({
  type: 'BROADCAST_STOPKY',
  data: json,
  receivedAt: Date.now()
});
