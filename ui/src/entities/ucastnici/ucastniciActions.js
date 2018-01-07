import { CODE_OK, findAllUcastnici } from '../../common';
import { fetchRocniky } from '../rocniky/rocnikyActions';

const fetchUcastniciRequest = () => ({
  type: 'FETCH_UCASTNICI_REQUEST'
});

const normalizeUcastnici = json => {
  const byIds = json.response;
  const allIds = Object.keys(byIds);

  return { allIds, byIds };
};

export const fetchUcastniciSuccess = json => ({
  type: 'FETCH_UCASTNICI_SUCCESS',
  data: normalizeUcastnici(json),
  receivedAt: Date.now()
});

// TODO: no component is subscribed to this action.
const fetchUcastniciError = ({ code, status, err }) => ({
  type: 'FETCH_UCASTNICI_ERROR',
  code,
  status,
  err,
  receivedAt: Date.now()
});

export const fetchUcastnici = () => async (dispatch, getState, wsClient) => {
  const { auth } = getState();

  dispatch(fetchUcastniciRequest());

  await dispatch(fetchRocniky());

  try {
    const response = await wsClient.sendRequest(findAllUcastnici((auth && auth.token) || null));
    if (response.code === CODE_OK) {
      dispatch(fetchUcastniciSuccess(response));
    } else {
      dispatch(fetchUcastniciError(response));
    }
  } catch (err) {
    dispatch(fetchUcastniciError({ code: 'internal error', err }));
  }
};
