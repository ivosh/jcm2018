import { CODE_OK, CODE_TOKEN_INVALID, findAllStopky } from '../../common';
import { authTokenExpired } from '../../auth/SignIn/SignInActions';

export const fetchStopkyRequest = () => ({ type: 'FETCH_STOPKY_REQUEST' });

const normalizeStopky = json => {
  const byTypy = json.response;
  const typy = Object.keys(byTypy).sort();

  return { byTypy, typy };
};

export const fetchStopkySuccess = json => ({
  type: 'FETCH_STOPKY_SUCCESS',
  data: normalizeStopky(json),
  receivedAt: Date.now()
});

// TODO: no component is subscribed to this action.
const fetchStopkyError = ({ code, status, err }) => ({
  type: 'FETCH_STOPKY_ERROR',
  code,
  status,
  err,
  receivedAt: Date.now()
});

export const fetchStopky = () => async (dispatch, getState, wsClient) => {
  const {
    auth,
    connected,
    entities: { stopky }
  } = getState();
  if (stopky && stopky.typy && stopky.typy.length > 0) {
    if (!connected || !stopky.invalidated) {
      return; // Use cached value if: not connected or not invalidated.
    }
  }

  dispatch(fetchStopkyRequest());

  try {
    const response = await wsClient.sendRequest(findAllStopky((auth && auth.token) || null));
    if (response.code === CODE_OK) {
      dispatch(fetchStopkySuccess(response));
    } else if (response.code === CODE_TOKEN_INVALID) {
      dispatch(authTokenExpired(response));
    } else {
      dispatch(fetchStopkyError(response));
    }
  } catch (err) {
    dispatch(fetchStopkyError({ code: 'internal error', err }));
  }
};

export const broadcastStopky = json => ({
  type: 'BROADCAST_STOPKY',
  data: json,
  receivedAt: Date.now()
});
