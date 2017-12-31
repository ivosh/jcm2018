import { CODE_OK, findAllRocniky } from '../../common';
import { fetchKategorieSuccess, fetchKategorieError } from '../kategorie/kategorieActions';

const fetchRocnikyRequest = () => ({
  type: 'FETCH_ROCNIKY_REQUEST'
});

const normalizeRocniky = json => {
  const byRoky = json.response.rocniky;
  const roky = Object.keys(byRoky).map(value => parseInt(value, 10));

  return { byRoky, roky };
};

export const fetchRocnikySuccess = json => ({
  type: 'FETCH_ROCNIKY_SUCCESS',
  data: normalizeRocniky(json),
  receivedAt: Date.now()
});

// TODO: no component is subscribed to this action.
const fetchRocnikyError = ({ code, status, err }) => ({
  type: 'FETCH_ROCNIKY_ERROR',
  code,
  status,
  err,
  receivedAt: Date.now()
});

export const fetchRocniky = () => async (dispatch, getState, wsClient) => {
  const state = getState();
  if (state.rocniky && state.rocniky.roky && state.rocniky.roky.length > 0) {
    return; // Use cached value.
  }

  dispatch(fetchRocnikyRequest());

  try {
    const response = await wsClient.sendRequest(findAllRocniky());
    if (response.code === CODE_OK) {
      dispatch(fetchKategorieSuccess(response));
      dispatch(fetchRocnikySuccess(response));
    } else {
      dispatch(fetchKategorieError(response));
      dispatch(fetchRocnikyError(response));
    }
  } catch (err) {
    dispatch(fetchKategorieError({ code: 'internal error', err }));
    dispatch(fetchRocnikyError({ code: 'internal error', err }));
  }
};
