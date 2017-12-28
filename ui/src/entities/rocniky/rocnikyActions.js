import { CODE_OK, findAllRocniky } from '../../common';
import { receiveKategorie, receiveKategorieError } from '../kategorie/kategorieActions';

const requestRocniky = () => ({
  type: 'REQUEST_ROCNIKY'
});

const normalizeRocniky = json => {
  const byRoky = json.response.rocniky;
  const roky = Object.keys(byRoky).map(value => parseInt(value, 10));

  return { byRoky, roky };
};

export const receiveRocniky = json => ({
  type: 'RECEIVE_ROCNIKY',
  data: normalizeRocniky(json),
  receivedAt: Date.now()
});

// TODO: no component is subscribed to this action.
const receiveRocnikyError = ({ code, status, err }) => ({
  type: 'RECEIVE_ROCNIKY_ERROR',
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

  dispatch(requestRocniky());

  try {
    const response = await wsClient.sendRequest(findAllRocniky());
    if (response.code === CODE_OK) {
      dispatch(receiveKategorie(response));
      dispatch(receiveRocniky(response));
    } else {
      dispatch(receiveKategorieError(response));
      dispatch(receiveRocnikyError(response));
    }
  } catch (err) {
    dispatch(receiveKategorieError({ code: 'internal error', err }));
    dispatch(receiveRocnikyError({ code: 'internal error', err }));
  }
};
