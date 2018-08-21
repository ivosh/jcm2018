import { CODE_OK, CODE_TOKEN_INVALID, findAllUcastnici } from '../../common';
import { errorToStr } from '../../Util';
import { fetchRocniky } from '../rocniky/rocnikyActions';
import { authTokenExpired } from '../../auth/SignIn/SignInActions';

export const fetchUcastniciRequest = () => ({
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
export const fetchUcastniciError = ({ code, status, err }) => ({
  type: 'FETCH_UCASTNICI_ERROR',
  code,
  status,
  err: errorToStr(err),
  receivedAt: Date.now()
});

export const fetchUcastnici = () => async (dispatch, getState, wsClient) => {
  const {
    auth,
    connected,
    entities: { ucastnici }
  } = getState();
  if (ucastnici && ucastnici.allIds && ucastnici.allIds.length > 0) {
    if (!connected || !ucastnici.invalidated) {
      return; // Use cached value if: not connected or not invalidated.
    }
  }

  dispatch(fetchUcastniciRequest());

  await dispatch(fetchRocniky());

  try {
    const response = await wsClient.sendRequest(findAllUcastnici((auth && auth.token) || null));
    if (response.code === CODE_OK) {
      dispatch(fetchUcastniciSuccess(response));
    } else if (response.code === CODE_TOKEN_INVALID) {
      dispatch(authTokenExpired({ response }));
    } else {
      dispatch(fetchUcastniciError(response));
    }
  } catch (err) {
    dispatch(fetchUcastniciError({ code: 'internal error', err }));
  }
};

export const broadcastUcastnik = json => ({
  type: 'BROADCAST_UCASTNIK',
  data: json,
  receivedAt: Date.now()
});
