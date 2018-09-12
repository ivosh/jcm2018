import { API_FIND_ALL_UCASTNICI } from '../../common';
import { WS_API } from '../../store/wsAPI';
import { fetchRocniky } from '../rocniky/rocnikyActions';

const normalize = ({ request, response: { response: byIds } }) => ({
  request,
  response: { allIds: Object.keys(byIds), byIds }
});

// Use cached value if: not connected or not invalidated.
const useCached = ({ connected, entities: { ucastnici } }) =>
  ucastnici &&
  ucastnici.allIds &&
  ucastnici.allIds.length > 0 &&
  (!connected || !ucastnici.invalidated);

export const FETCH_UCASTNICI = 'FETCH_UCASTNICI';
export const fetchUcastnici = () => ({
  [WS_API]: [
    fetchRocniky()[WS_API],
    {
      type: FETCH_UCASTNICI,
      endpoint: API_FIND_ALL_UCASTNICI,
      normalize,
      title: 'načítání účastníků',
      useCached
    }
  ]
});

export const broadcastUcastnik = json => ({
  type: 'BROADCAST_UCASTNIK',
  data: json,
  receivedAt: Date.now()
});
