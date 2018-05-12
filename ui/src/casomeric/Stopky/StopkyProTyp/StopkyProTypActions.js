import { saveStopky as saveStopkyAPI, CODE_OK, CODE_TOKEN_INVALID } from '../../../common';
import { authTokenExpired } from '../../../auth/SignIn/SignInActions';
import stopkyProTypReducer, { getStopkyByTyp } from './stopkyProTypReducer';

export const stopkyMezicas = ({ now = new Date() } = {}) => ({ type: 'STOPKY_MEZICAS', now });
export const stopkyStart = ({ now = new Date() } = {}) => ({ type: 'STOPKY_START', now });
export const stopkyStop = ({ now = new Date() } = {}) => ({ type: 'STOPKY_STOP', now });
// step is in milliseconds
export const stopkyChange = ({ step }) => ({ type: 'STOPKY_CHANGE', step });

export const saveStopkyRequest = ({ stopky, typ }) => ({
  type: 'SAVE_STOPKY_REQUEST',
  stopky,
  typ
});

export const saveStopkySuccess = ({ stopky, typ }) => ({
  type: 'SAVE_STOPKY_SUCCESS',
  stopky,
  typ,
  receivedAt: Date.now()
});

// TODO: no component is subscribed to this action.
const saveStopkyError = ({ code, status, err }, typ) => ({
  type: 'SAVE_STOPKY_ERROR',
  code,
  status,
  err,
  typ,
  receivedAt: Date.now()
});

export const saveStopky = ({ action, typ }) => async (dispatch, getState, wsClient) => {
  const state = getState();
  const stopky = stopkyProTypReducer(getStopkyByTyp({ state, typ }), action);
  dispatch(saveStopkyRequest({ stopky, typ }));

  try {
    const response = await wsClient.sendRequest(saveStopkyAPI(stopky, state.auth.token));
    if (response.code === CODE_OK) {
      dispatch(saveStopkySuccess({ stopky, typ }));
    } else if (response.code === CODE_TOKEN_INVALID) {
      dispatch(authTokenExpired(response));
    } else {
      dispatch(saveStopkyError(response, typ));
    }
  } catch (err) {
    dispatch(saveStopkyError({ code: 'internal error', err }, typ));
  }
};
