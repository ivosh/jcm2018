import { CODE_OK, findAllUcastnici } from '../../common';
import { fetchRocniky } from '../rocniky/rocnikyActions';

const requestUcastnici = () => ({
  type: 'REQUEST_UCASTNICI'
});

const normalizeUcastnici = json => {
  const byIds = json.response;
  const allIds = Object.keys(byIds);

  return { allIds, byIds };
};

export const receiveUcastnici = json => ({
  type: 'RECEIVE_UCASTNICI',
  data: normalizeUcastnici(json),
  receivedAt: Date.now()
});

// TODO: no component is subscribed to this action.
const receiveUcastniciError = ({ code, status, err }) => ({
  type: 'RECEIVE_UCASTNICI_ERROR',
  code,
  status,
  err,
  receivedAt: Date.now()
});

export const fetchUcastnici = () => async (dispatch, getState, wsClient) => {
  dispatch(requestUcastnici());

  await dispatch(fetchRocniky());

  try {
    const response = await wsClient.sendRequest(findAllUcastnici());
    if (response.code === CODE_OK) {
      dispatch(receiveUcastnici(response));
    } else {
      dispatch(receiveUcastniciError(response));
    }
  } catch (err) {
    dispatch(receiveUcastniciError({ code: 'internal error', err }));
  }
};
