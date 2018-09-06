import { CODE_OK, CODE_TOKEN_INVALID, findAllRocniky } from '../../common';
import { AKTUALNI_ROK } from '../../constants';
import { errorToStr } from '../../Util';
import { authTokenExpired } from '../../auth/SignIn/SignInActions';

const fetchRocnikyRequest = () => ({
  type: 'FETCH_ROCNIKY_REQUEST'
});

const normalize = json => {
  const { kategorie, rocniky: byRoky } = json.response;
  const roky = Object.keys(byRoky).map(value => parseInt(value, 10));

  return { kategorie, rocniky: { byRoky, roky } };
};

export const fetchRocnikySuccess = json => ({
  type: 'FETCH_ROCNIKY_SUCCESS',
  data: normalize(json),
  receivedAt: Date.now(),
  getDatumKonani: (rok = AKTUALNI_ROK) => json.response.rocniky[rok].datum
});

// TODO: no component is subscribed to this action.
const fetchRocnikyError = ({ code, status, err }) => ({
  type: 'FETCH_ROCNIKY_ERROR',
  code,
  status,
  err: errorToStr(err),
  receivedAt: Date.now()
});

export const fetchRocniky = () => async (dispatch, getState, wsClient) => {
  const {
    auth,
    entities: { rocniky }
  } = getState();
  if (rocniky && rocniky.roky && rocniky.roky.length > 0) {
    return; // Use cached value.
  }

  dispatch(fetchRocnikyRequest());

  try {
    const response = await wsClient.sendRequest(findAllRocniky((auth && auth.token) || null));
    if (response.code === CODE_OK) {
      dispatch(fetchRocnikySuccess(response));
    } else if (response.code === CODE_TOKEN_INVALID) {
      dispatch(authTokenExpired({ response }));
    } else {
      dispatch(fetchRocnikyError(response));
    }
  } catch (err) {
    dispatch(fetchRocnikyError({ code: 'internal error', err }));
  }
};
